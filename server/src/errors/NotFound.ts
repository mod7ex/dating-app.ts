import CustomError from "./Custom";
import { StatusCodes } from "http-status-codes";

export default class NotFoundError extends CustomError {
      constructor(
            public message: string = "Not found",
            public status_code: number = StatusCodes.NOT_FOUND,
            public name: string = "notfound_error",
            public render?: boolean,
            public stack?: string | undefined
      ) {
            super(message, status_code, name, render, stack);
      }
}
