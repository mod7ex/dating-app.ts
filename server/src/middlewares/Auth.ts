import { Request, Response, NextFunction } from "express";
import Controller from "./Controller";
import { JWT_SECRET_ACCESS } from "../config/config";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { UnauthorizedError, ForbiddenError } from "../errors";

class Auth extends Controller {
      constructor() {
            super();
      }

      _$ = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void | never> => {
            let authHeader = req.headers.authorization;

            let token =
                  authHeader &&
                  authHeader.startsWith("Bearer ") &&
                  authHeader.split(" ")[1];

            if (!token) throw new UnauthorizedError("Unauthenticated");

            jwt.verify(token, JWT_SECRET_ACCESS, (err, payload) => {
                  if (err) throw new ForbiddenError();

                  // @ts-ignore
                  req.user = payload;
                  next();
            });
      };
}

export default new Auth();
