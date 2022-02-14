import { Request, Response, NextFunction } from "express";
import { createUser, loginUser } from "../services/user";
import { IUserInput } from "../interfaces/IUser";
import { StatusCodes } from "http-status-codes";
import { wrap } from "../helpers";

class AuthController {
      register = wrap(
            async (
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

                  let user = await createUser({
                        first_name,
                        last_name,
                        username,
                        email,
                        password,
                        password_confirmation,
                  });

                  let token = await user.generateJWTToken();

                  res.status(StatusCodes.CREATED).json({ token, user });
            }
      );

      login = wrap(
            async (
                  req: Request,
                  res: Response,
                  next: NextFunction
            ): Promise<void> => {
                  let { email, password }: IUserInput = req.body;

                  let user = await loginUser({ email, password });

                  let token = await user.generateJWTToken();

                  res.status(StatusCodes.OK).json({ token, user });
            }
      );

      logout = wrap(
            async (
                  req: Request,
                  res: Response,
                  next: NextFunction
            ): Promise<void> => {
                  res.status(StatusCodes.OK).json({ message: "Logged out" });
            }
      );
}
