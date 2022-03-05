import { Request, Response, NextFunction } from "express";
import {
      findUserById,
      findUserByEmail,
      deleteUser,
      updateUser,
} from "../services/user";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, BadRequestError } from "../errors";
import {
      VerifyUserInput,
      ForgotPasswordInput,
      ResetPasswordInput,
      UpdateUserInput,
} from "../schema/user";
import { MetaInput } from "../schema/meta";
import { sendEmail } from "../utils/mailer";
import { CustomError } from "../errors";
import logger from "../utils/logger";
import { generateCode } from "../helpers";
import { omit } from "lodash";
import { userPrivateFields } from "../models/User";
import { metaPrivateFields } from "../models/Meta";

class User {
      me = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            let { _id } = req.user;

            // let user = await findUserById(_id, {lean: true});
            let user = await findUserById(_id);

            if (!user) throw new NotFoundError("User not found");

            let meta = await user.getMeta();

            console.log(meta);

            res.status(StatusCodes.OK).json({
                  ...omit(user.toObject(), userPrivateFields),
                  ...omit(meta.toObject(), metaPrivateFields),
            });
      };

      verify = async (
            req: Request<VerifyUserInput>,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            let { id, verificationCode } = req.params;

            // find user by id
            let user = await findUserById(id);

            if (!user) throw new CustomError("Could not verify user");

            // check if they're already verified
            if (user.verified) {
                  res.status(StatusCodes.OK).json({
                        message: "User is already verified",
                  });

                  return;
            }

            // check to see if verification code is valide
            if (user.verificationCode !== verificationCode)
                  throw new CustomError("Could not verify user");

            user.verified = true;
            let meta = await user.initMeta();
            user.meta_id = meta._id;
            await user.save();
            res.status(StatusCodes.OK).json({
                  message: "Account successfuly verified",
            });
      };

      forgot_password = async (
            req: Request<{}, {}, ForgotPasswordInput>,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            let { email } = req.body;

            let message = `if ${email} is registered, check your email to reset your password`;

            let user = await findUserByEmail(email);

            if (!user) {
                  logger.errorTxt(`User with email; ${email} doesn't exist`);
                  res.status(StatusCodes.OK).json({ message });
                  return;
            }

            if (!user.verified) {
                  res.status(StatusCodes.OK).json({
                        message: "Account is not verified yet",
                  });
                  return;
            }

            user.passwordResetCode = generateCode();
            user.save();

            await sendEmail({
                  from: "siteadmin@example.com",
                  to: user.email,
                  subject: "Password reset email",
                  text: `password reset code ${user.passwordResetCode}. Id: ${user._id}`,
            });

            res.status(StatusCodes.CREATED).json({ message });
      };

      reset_password = async (
            req: Request<
                  ResetPasswordInput["params"],
                  {},
                  ResetPasswordInput["body"]
            >,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            let { id, passwordResetCode } = req.params;

            let { password } = req.body;

            let user = await findUserById(id);

            if (!user) throw new NotFoundError("User not found");

            if (!user.passwordResetCode)
                  throw new BadRequestError("Could not reset password");

            if (user.passwordResetCode !== passwordResetCode)
                  throw new BadRequestError("Could not reset password");

            delete user.passwordResetCode;

            user.password = password;

            user.save();

            res.status(StatusCodes.OK).json({
                  message: "Successfully updated user password",
            });
      };

      updateMeta = async (
            req: Request<{}, {}, MetaInput>,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            let { _id } = req.user;

            let user = await findUserById(_id);

            if (!user) throw new NotFoundError("User not found");

            await user.updateMeta(req.body);

            res.status(StatusCodes.OK).json({ message: "User updated" });
      };

      updateUser = async (
            req: Request<{}, {}, UpdateUserInput>,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            let { _id } = req.user;

            let user = await updateUser(_id, req.body);

            if (!user) throw new NotFoundError("User not found");

            res.status(StatusCodes.OK).json({ message: "User updated" });
      };

      delete = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            let { _id } = req.user;

            await deleteUser(_id.toString());

            res.status(StatusCodes.OK).json({ message: "User deleted" });
      };

      uploadPhotos = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            let media = req.files;

            // res.status(StatusCodes.OK).json({ message: "User deleted" });
      };
}

export default new User();
