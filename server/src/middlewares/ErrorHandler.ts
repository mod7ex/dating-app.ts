import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import { StatusCodes } from "http-status-codes";
import {
      CustomError,
      ForbiddenError,
      BadRequestError,
      NotFoundError,
} from "../errors";

export default class ErrorHandler extends Controller {
      constructor() {
            super();
      }

      face = async (
            err: Error,
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            await this.log(err.toString(), "error");

            console.log({
                  name: err.name,
                  type: typeof err,
                  // code: err.code,
                  err,
            });

            let error = new CustomError();

            if (super.isVerifyErrors(err)) {
                  error = new ForbiddenError();
            }

            if (err instanceof CustomError) {
                  error = err;
            }

            if (err instanceof Error.ValidationError) {
                  error = new BadRequestError(
                        Object.values(err.errors)
                              .map((item) => item.message)
                              .join(", ")
                  );
            }

            if (err instanceof Error.CastError) {
                  error = new NotFoundError(
                        `No item found with id; ${err.value}`
                  );
            }

            // if (err.code == 11000) {
            //       customErr.message = `Duplicate value for ${Object.keys(
            //             err.keyValue
            //       )} field`;
            //       customErr.statusCode = StatusCodes.BAD_REQUEST;
            // }

            res.status(error.status_code).json({ error: error.toObject() });
            return next();
      };
}
