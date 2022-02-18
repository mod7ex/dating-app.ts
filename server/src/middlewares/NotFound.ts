import Controller from "./Controller";
import { Err } from "../errors/index";
import { Request, Response, NextFunction } from "express";

export default class ErrorHandler extends Controller {
      constructor() {
            super();
      }

      face = (req: Request, res: Response, next: NextFunction): never => {
            this.throwErr("NotFoundError", "Resource not found");
      };
}
