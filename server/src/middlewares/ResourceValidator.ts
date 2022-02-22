import { Request, Response, NextFunction } from "express";
import Controller from "./Controller";
import { AnyZodObject } from "zod";

class ResourceValidator extends Controller {
      constructor() {
            super();
      }

      _$ = (schema: AnyZodObject) => {
            return (req: Request, _: Response, next: NextFunction) => {
                  schema.parse({
                        body: req.body,
                        query: req.query,
                        params: req.params,
                  });

                  next();
            };
      };
}

export default new ResourceValidator();
