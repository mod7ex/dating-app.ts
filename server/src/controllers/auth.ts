import { Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "../services/user";
import {
      generateJWTAccessToken,
      getUserRefreshToken,
      VerifyJWT,
      deleteJWTRefreshToken,
} from "../services/token";
import { IUserInput } from "../interfaces/IUser";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError, ForbiddenError } from "../errors";

class Auth {
      refreshToken = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            let providedRefreshToken = req.body.token;
            if (!providedRefreshToken) throw new UnauthorizedError();

            // @ts-ignore
            let userRefreshToken = await getUserRefreshToken(req.user._id);
            if (!userRefreshToken || providedRefreshToken != userRefreshToken)
                  throw new ForbiddenError();

            let { payload, expired } = VerifyJWT(userRefreshToken);

            let accessToken = generateJWTAccessToken({
                  // @ts-ignore
                  _id: req.user._id,
                  // @ts-ignore
                  username: req.user.username,
            });

            res.status(StatusCodes.OK).json(accessToken);
      };

      register = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            let {
                  first_name,
                  last_name,
                  username,
                  email,
                  password,
                  password_confirmation,
            }: IUserInput = req.body;

            await createUser({
                  first_name,
                  last_name,
                  username,
                  email,
                  password,
                  password_confirmation,
            });

            let tokens = await loginUser({ email, password });

            res.status(StatusCodes.CREATED).json(tokens);
      };

      async login(
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> {
            let { email, password }: IUserInput = req.body;

            let tokens = await loginUser({ email, password });

            res.status(StatusCodes.OK).json(tokens);
      }

      logout = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            // @ts-ignore
            await deleteJWTRefreshToken(req.user._id);

            res.status(StatusCodes.NO_CONTENT).json({ message: "Logged out" });
      };
}
