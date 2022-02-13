import UnauthorizedError from "./Unauthorized";
import CustomError from "./Custom";
import NotFoundError from "./NotFound";
import BadRequestError from "./BadRequest";

export const Err = {
      errs: {
            default: CustomError,
            notFound: NotFoundError,
            badRequest: BadRequestError,
            unauthorized: UnauthorizedError,
      },

      throw(name, ...args: any[]): never {
            let Cls = this.errs[name] || this.errs.default;
            throw new Cls(...args);
      },
};

// const throwError = (err: Err, ...args: any[]): never => {
//       let Cls = eval(err);
//       throw new Cls(...args);
// };

export default {
      UnauthorizedError,
      CustomError,
      NotFoundError,
      BadRequestError,
};
