import CustomError from "./Custom";
import { StatusCodes } from "http-status-codes";

export default class UnauthorizedError extends CustomError {
      constructor(
            public message: string = "Unauthorized",
            public status_code: number = StatusCodes.UNAUTHORIZED,
            public name: string = "unauthorized_error",
            public render?: boolean,
            public stack?: string | undefined
      ) {
            super(message, status_code, name, render, stack);
      }
}
