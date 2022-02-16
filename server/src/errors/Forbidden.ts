import CustomError from "./Custom";
import { StatusCodes } from "http-status-codes";

export default class ForbiddenError extends CustomError {
      constructor(
            public message: string = "forbidden",
            public status_code: number = StatusCodes.FORBIDDEN,
            public name: string = "forbidden",
            public render?: boolean,
            public stack?: string | undefined
      ) {
            super(message, status_code, name, render, stack);
      }
}
