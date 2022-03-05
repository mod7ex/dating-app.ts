declare namespace Express {
      export interface Request {
            user: JWTSubject;
      }
}

// declare namespace Express {
//       export interface Request {

//             files: Multer.File[];
//       }
// }
