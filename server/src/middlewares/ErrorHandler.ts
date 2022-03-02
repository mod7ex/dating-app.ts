import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import logger from "../utils/logger";
import {
      CustomError,
      ForbiddenError,
      BadRequestError,
      NotFoundError,
} from "../errors";

class ErrorHandler extends Controller {
      constructor() {
            super();
      }

      _$ = async (
            err: Error,
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            await logger.error(err);

            console.log({
                  name: err.name,
                  type: typeof err,
                  // code: err.code,
                  err,
            });

            let error = new CustomError();

            if (this.isVerifyErrors(err)) {
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

            if (err instanceof ZodError) {
                  res.status(StatusCodes.BAD_REQUEST).json(err.flatten());
                  return;
            }

            if (err instanceof Error.CastError) {
                  error = new NotFoundError(
                        `No item found with id; ${err.value}`
                  );
            }

            // @ts-ignore
            if (err.code && err.code == 11000) {
                  error = new CustomError(
                        `Duplicate value for ${Object.keys(
                              // @ts-ignore
                              err.keyValue
                        )} field`,
                        StatusCodes.CONFLICT
                  );
            }

            res.status(error.status_code).json(error.toObject());
            return;
      };
}

export default new ErrorHandler();
