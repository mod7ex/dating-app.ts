import { Request, Response, NextFunction } from "express";
import Controller from "./Controller";
import { verifyAccessToken, getUserRefreshToken } from "../services/auth";
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

            console.log(accessToken);

            if (!accessToken) throw new UnauthorizedError("Unauthenticated");

            let { decoded, expired } = verifyAccessToken(accessToken);

            if (!decoded) throw new ForbiddenError();

            let refreshToken = await getUserRefreshToken(
                  decoded._id.toString()
            );

            // check if refresh token is still valide
            if (!refreshToken) throw new UnauthorizedError("Unauthenticated");

            // if (expired) throw new ForbiddenError(); // refresh it
            if (expired) return res.redirect("/auth/refresh");

            req.user = {
                  _id: decoded._id,
                  username: decoded.username,
            };

            next();
      };
}

export default new Auth();
