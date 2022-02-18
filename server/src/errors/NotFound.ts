import CustomError from "./Custom";
import { StatusCodes } from "http-status-codes";

export default class NotFoundError extends CustomError {
      constructor(
            protected _message: string = "forbidden",
            protected _name: string = "forbidden"
      ) {
            super(_message, _name, StatusCodes.NOT_FOUND);
      }
}
