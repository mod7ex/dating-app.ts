import { Request, Response, NextFunction } from "express";
import Controller from "./Controller";
import { CLIENT } from "../config/config";

// https://github.com/expressjs/cors/issues/130

class Cors extends Controller {
      constructor() {
            super();
      }

      _$ = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void | never> => {
            res.header("Access-Control-Allow-Origin", [
                  `http://${CLIENT.hostname}:${CLIENT.port}`,
            ]);

            if ("OPTIONS" == req.method) {
                  res.header("Access-Control-Allow-Methods", [
                        "GET",
                        "PATCH",
                        "POST",
                        "DELETE",
                  ]);
                  res.header("Access-Control-Allow-Headers", [
                        "Content-Type",
                        "Authorization",
                  ]);
                  res.header("Access-Control-Expose-Headers", ["X-REFRESH"]);
                  res.header("Access-Control-Allow-Credentials", "false");
                  res.header("Access-Control-Max-Age", "60000");

                  res.status(204).send();
            } else {
                  next();
            }
      };
}

export default new Cors();
