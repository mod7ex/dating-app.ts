import { Request, Response, NextFunction } from "express";
import Controller from "./Controller";

export default class Req extends Controller {
      constructor() {
            super();
      }

      face = async (
            req: Request,
            res: Response,
            next: NextFunction
      ): Promise<void> => {
            let data = `[${Date.now()}] ---> ${req.method}: ${
                  req.originalUrl
            } from ${req.ip}`;

            console.log(data);

            if (req.method == "POST") {
                  // req.body = cleanObj(req.body);
                  console.log("body ==> ", req.body);
            }

            await this.log(data, "request");

            next();
      };
}
