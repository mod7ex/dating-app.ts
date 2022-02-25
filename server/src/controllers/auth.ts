import { Request, Response, NextFunction } from "express";
import {
      createUser,
      loginUser,
      findUserById,
      findUserByEmail,
} from "../services/user";
import {
      // generateJWTAccessToken,
      getUserRefreshToken,
      VerifyJWT,
      deleteJWTRefreshToken,
} from "../services/token";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError, ForbiddenError } from "../errors";
import {
      CreateUserInput,
      VerifyUserInput,
      PasswordResetInput,
} from "../schema/user";
import { sendEmail } from "../utils/mailer";
import { CustomError } from "../errors";
import logger from "../utils/logger";
import { generateCode } from "../helpers";

class Auth {
      register = async (
            req: Request<{}, {}, CreateUserInput>,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            let user = await createUser(req.body);

            await sendEmail({
                  from: "siteadmin@example.com",
                  to: user.email,
                  subject: "please verify your account",
                  text: `verification code ${user.verificationCode}. Id: ${user._id}`,
            });

            // let tokens = await loginUser({
            //       email: body.email,
            //       password: body.password,
            // });

            res.status(StatusCodes.CREATED).json({ success: true });
      };

      verify = async (
            req: Request<VerifyUserInput>,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            // find user by id

            let user = await findUserById(req.params.id);

            if (!user) throw new CustomError("Could not verify user");

            // check if they're already verified
            if (user.verified) {
                  res.status(StatusCodes.OK).json({
                        message: "User is already verified",
                  });
                  return;
            }

            // check to see if verification code
            if (user.verificationCode === req.params.verificationCode) {
                  user.verified = true;
                  await user.save();
                  res.status(StatusCodes.OK).json({
                        message: "Account successfuly verified",
                  });
                  return;
            }

            throw new CustomError("Could not verify user");
      };

      password_reset = async (
            req: Request<{}, {}, PasswordResetInput>,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            let email = req.body.email;

            let message = `if ${email} is registered, check your email to reset your password`;

            let user = await findUserByEmail(email);

            if (!user) {
                  logger.errorTxt(`User with email; ${email} doesn't exists`);
                  res.status(StatusCodes.OK).json({ message });
                  return;
            }

            if (!user.verified) {
                  res.status(StatusCodes.OK).json({
                        message: "Account is not verified",
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

            logger.log(`password reset email sent to ${email}`);

            res.status(StatusCodes.CREATED).json({ success: true });
      };

      async login(
            req: Request<{}, {}, CreateUserInput>,
            res: Response,
            _: NextFunction
      ): Promise<void> {
            let { email, password } = req.body;

            let tokens = await loginUser({ email, password });

            res.status(StatusCodes.OK).json(tokens);
      }

      logout = async (
            req: Request,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            // @ts-ignore
            await deleteJWTRefreshToken(req.user._id);

            res.status(StatusCodes.NO_CONTENT).json({ message: "Logged out" });
      };

      refreshToken = async (
            req: Request,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            let providedRefreshToken = req.body.token;
            if (!providedRefreshToken) throw new UnauthorizedError();

            // @ts-ignore
            let userRefreshToken = await getUserRefreshToken(req.user._id);
            if (!userRefreshToken || providedRefreshToken != userRefreshToken)
                  throw new ForbiddenError();

            let { payload, expired } = VerifyJWT(userRefreshToken);

            // let accessToken = generateJWTAccessToken({
            //       // @ts-ignore
            //       _id: req.user._id,
            //       // @ts-ignore
            //       username: req.user.username,
            // });

            // res.status(StatusCodes.OK).json(accessToken);
      };
}

export default new Auth();
