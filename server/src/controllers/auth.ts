import { Request, Response, NextFunction } from "express";
import { createUser, findUserByLogin, findUserById } from "../services/user";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError, ForbiddenError, NotFoundError } from "../errors";
import { CreateUserInput, LoginUserInput } from "../schema/user";
import { sendEmail } from "../utils/mailer";
import { get } from "lodash";
import {
      verifyRefreshToken,
      getUserRefreshToken,
      dropRefreshToken,
      signAccessToken,
} from "../services/auth";

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

            res.status(StatusCodes.CREATED).json({
                  message: "check email for account validation",
            });
      };

      async login(
            req: Request<{}, {}, LoginUserInput>,
            res: Response,
            _: NextFunction
      ): Promise<void> {
            let { login, password } = req.body;

            let user = await findUserByLogin(login);

            if (!user) throw new NotFoundError("invalide credentials");

            if (!user.verified)
                  throw new NotFoundError("check email for account validation");

            let isValidPassword = await user.comparePassword(password);

            if (!isValidPassword)
                  throw new UnauthorizedError("invalide credentials");

            let accessToken = user.signAccessToken(60 * 60 * 12);
            let refreshToken = await user.signRefreshToken();

            res.status(StatusCodes.OK).json({
                  accessToken,
                  refreshToken,
            });
      }

      logout = async (
            req: Request,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            await dropRefreshToken(res.locals.user._id);

            res.status(StatusCodes.OK).json({ message: "Logged out" });
      };

      refreshAccessToken = async (
            req: Request,
            res: Response,
            _: NextFunction
      ): Promise<void> => {
            let providedRefreshToken = get(req.headers, "x-refresh");

            if (!providedRefreshToken) throw new UnauthorizedError();

            let { decoded, expired } = verifyRefreshToken(
                  providedRefreshToken as string
            );

            if (expired) throw new UnauthorizedError("session expired"); // the token has been also deleted from redis

            if (!decoded) throw new ForbiddenError();

            let userRefreshToken = await getUserRefreshToken(
                  decoded._id.toString()
            );

            if (providedRefreshToken !== userRefreshToken)
                  throw new ForbiddenError(); // comparing the stored token with the provided token

            let user = await findUserById(decoded._id.toString());

            if (!user) throw new UnauthorizedError("Could not refresh token"); // make sure if user exists

            let accessToken = signAccessToken({
                  _id: user._id,
                  username: user.username,
            });

            res.status(StatusCodes.OK).json(accessToken);
      };
}

export default new Auth();
