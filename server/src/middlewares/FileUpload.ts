import Controller from "./Controller";
import multer from "multer";
import { CustomError } from "../errors";
import path from "path";
import { APP_PATH, MAX_USER_PHOTOS } from "../config/config";
let uploadPath = path.resolve(APP_PATH, "uploads");
import { Request } from "express";

class Upload extends Controller {
      constructor() {
            super();
      }

      _$ = multer({
            limits: {
                  files: MAX_USER_PHOTOS,
                  fileSize: 1024 * 1024, // in bytes
            },

            fileFilter: function (req: Request, file, cb) {
                  if (
                        file.mimetype !== "image/png" &&
                        file.mimetype !== "image/jpeg"
                  ) {
                        return cb(new CustomError("file type not allowed"));
                  }

                  cb(null, true);
            },

            storage: multer.diskStorage({
                  destination: function (req: Request, file, cb) {
                        // you should create the folder, multer won't do it
                        cb(null, uploadPath);
                  },
                  // destination: uploadPath,

                  filename: function (req: Request, file, cb) {
                        let filename = `${
                              req.user._id
                        }-at-${Date.now()}_photo${path.extname(
                              file.originalname
                        )}`;

                        cb(null, filename);
                  },
            }),
      });
}

export default new Upload();
