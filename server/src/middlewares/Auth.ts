import { Request, Response, NextFunction } from "express";
import Controller from "./Controller";
import { verifyAccessToken } from "../services/auth";
import { UnauthorizedError, ForbiddenError } from "../errors";

class Auth extends Controller {
      constructor() {
            super();
      }

      _$ = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void | never> => {
            let authHeader = req.headers.authorization;

            let accessToken =
                  authHeader &&
                  authHeader.startsWith("Bearer ") &&
                  authHeader.split(" ")[1];

            if (!accessToken) throw new UnauthorizedError("Unauthenticated");

            let { decoded, expired } = verifyAccessToken(accessToken);

            // if (expired) throw new ForbiddenError(); // refresh it
            if (expired) return res.redirect("/auth/refresh");

            if (!decoded) throw new ForbiddenError();

            // it would be better to put decoded in req, work on request
            res.locals.user = { _id: decoded._id, username: decoded.username };
            next();
      };
}

export default new Auth();
