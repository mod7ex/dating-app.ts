import UnauthorizedError from "./Unauthorized";
import CustomError from "./Custom";
import NotFoundError from "./NotFound";
import BadRequestError from "./BadRequest";

type ErrType =
      | "CustomError"
      | "NotFoundError"
      | "BadRequestError"
      | "UnauthorizedError";

class Err {
      static create(
            name: ErrType,
            ...args: [
                  message?: string,
                  render?: boolean,
                  status_code?: number,
                  name?: string,
                  stack?: string | undefined
            ]
      ): CustomError {
            let Cls = eval(name);
            return new Cls(...args);
      }

      static throw(
            name: ErrType,
            ...args: [
                  message?: string,
                  render?: boolean,
                  status_code?: number,
                  name?: string,
                  stack?: string | undefined
            ]
      ): never {
            let Cls = eval(name);
            throw new Cls(...args);
      }
}

export { UnauthorizedError, CustomError, NotFoundError, BadRequestError, Err };
