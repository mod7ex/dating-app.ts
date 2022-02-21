import { Error } from "mongoose";
import path from "path";
import fs from "fs/promises";
import { Mode } from "fs";
import { APP_PATH } from "../config/config";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type LogNatureType = "error" | "request";

export default abstract class Middleware {
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

      async log(
            data: string,
            logNature: LogNatureType,
            mode: Mode = "a"
      ): Promise<void> {
            let filePath = path.resolve(APP_PATH, "logs", `${logNature}s.log`);

            let file_descriptor = await fs.open(filePath, mode);

            await fs.appendFile(filePath, data + ";\n", "utf8");

            await file_descriptor.close();
      }
}
