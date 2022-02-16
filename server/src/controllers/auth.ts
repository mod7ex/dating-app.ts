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

                  await createUser({
                        first_name,
                        last_name,
                        username,
                        email,
                        password,
                        password_confirmation,
                  });

                  let token = await loginUser({ email, password });

                  res.status(StatusCodes.CREATED).json({ token });
            }
      );

      async login(
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> {
            let { email, password }: IUserInput = req.body;

            let token = await loginUser({ email, password });

            res.status(StatusCodes.OK).json({ token });
      }

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
