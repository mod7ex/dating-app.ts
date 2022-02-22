import { Request, Response, NextFunction } from "express";
import Controller from "./Controller";

class Req extends Controller {
      constructor() {
            super();
      }

      _$ = async (
            req: Request,
            _: Response,
            next: NextFunction
      ): Promise<void> => {
            if (req.method == "POST") {
                  console.log("body ==> ", req.body);
            }

            await this.request(req);

            next();
      };
}

export default new Req();
