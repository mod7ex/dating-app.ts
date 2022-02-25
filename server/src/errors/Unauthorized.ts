import CustomError from "./Custom";
import { StatusCodes } from "http-status-codes";

export default class UnauthorizedError extends CustomError {
      constructor(
            protected _message: string = "forbidden",
            protected _name: string = "forbidden"
      ) {
            super(_message, StatusCodes.UNAUTHORIZED, _name);
      }
}
