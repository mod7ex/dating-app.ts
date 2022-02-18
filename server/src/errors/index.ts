import UnauthorizedError from "./Unauthorized";
import CustomError from "./Custom";
import NotFoundError from "./NotFound";
import BadRequestError from "./BadRequest";
import ForbiddenError from "./Forbidden";

/*

type ErrType =
      | "NotFoundError"
      | "BadRequestError"
      | "UnauthorizedError"
      | "ForbiddenError";

class Err {
      createErr(err: ErrType, message?: string, name?: string): CustomError {
            let Cls = eval(err);
            return new Cls();
      }

      throwErr(err: ErrType, message?: string, name?: string): never {
            throw this.createErr(err, message, name);
      }

      createCustomErr(
            message?: string,
            name?: string,
            status_code?: number
      ): CustomError {
            return new CustomError(message, name, status_code);
      }

      throwCustomErr(
            message?: string,
            name?: string,
            status_code?: number
      ): never {
            throw this.createCustomErr(message, name, status_code);
      }
}

export default new Err();

*/

export {
      ForbiddenError,
      UnauthorizedError,
      CustomError,
      NotFoundError,
      BadRequestError,
};
