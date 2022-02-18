import IError from "../interfaces/IError";
import { StatusCodes } from "http-status-codes";

export default class CustomError implements IError {
      constructor(
            protected _message: string = "Something went wrong",
            protected _name: string = "internal_error",
            protected _status_code: number = StatusCodes.INTERNAL_SERVER_ERROR
      ) {}

      public get message() {
            return this._message;
      }

      public get status_code() {
            return this._status_code;
      }

      public get name() {
            return this._name;
      }

      public set message(v) {
            this._message = v;
      }

      public set status_code(v) {
            this._status_code = v;
      }

      public set name(v) {
            this._name = v;
      }

      toObject() {
            return {
                  message: this._message,
                  status_code: this._status_code,
                  name: this._name,
            };
      }
}
