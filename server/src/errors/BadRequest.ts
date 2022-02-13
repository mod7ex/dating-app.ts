import CustomError from "./Custom";
import { StatusCodes } from "http-status-codes";

export default class BadRequestError extends CustomError {
      constructor(
            public message: string = "Bad request",
            public status_code: number = StatusCodes.BAD_REQUEST,
            public name: string = "badrequest_error",
            public render?: boolean,
            public stack?: string | undefined
      ) {
            super(message, status_code, name, render, stack);
      }
}
