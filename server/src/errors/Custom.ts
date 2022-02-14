import IError from "../interfaces/IError";
import { StatusCodes } from "http-status-codes";

export default class CustomError implements IError {
      constructor(
            public message: string = "Something went wrong",
            public status_code: number = StatusCodes.INTERNAL_SERVER_ERROR,
            public name: string = "internal_error",
            public render?: boolean,
            public stack?: string | undefined
      ) {}

      toObject() {
            return {
                  message: this.message,
                  status_code: this.status_code,
                  name: this.name,
                  render: this.render,
                  stack: this.stack,
            };
      }
}
