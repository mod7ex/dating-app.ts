import Controller from "./Controller";
import { NotFoundError } from "../errors";
import { Request, Response, NextFunction } from "express";

class NotFound extends Controller {
      constructor() {
            super();
      }

      _$ = (req: Request, res: Response, next: NextFunction): never => {
            throw new NotFoundError("Resource not found", "page_not_found");
      };
}

export default new NotFound();
