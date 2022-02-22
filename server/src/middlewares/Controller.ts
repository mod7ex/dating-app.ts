import { Error } from "mongoose";
import { Logger } from "../utils/logger";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default abstract class Middleware extends Logger {
      // public abstract _$(
      //       req: Request,
      //       res: Response,
      //       next: NextFunction
      // ): void | never | Promise<void>;

      isVerifyErrors(err: Error): err is VerifyErrors {
            return (
                  err instanceof jwt.JsonWebTokenError ||
                  err instanceof jwt.NotBeforeError ||
                  err instanceof jwt.TokenExpiredError
            );
      }
}
