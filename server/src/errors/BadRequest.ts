import CustomError from "./Custom";
import { StatusCodes } from "http-status-codes";

export default class BadRequestError extends CustomError {
      constructor(
            protected _message: string = "Bad request",
            protected _name: string = "badrequest_error"
      ) {
            super(_message, StatusCodes.BAD_REQUEST, _name);
      }
}
