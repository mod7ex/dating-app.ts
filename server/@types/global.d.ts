import IUser from "../src/interfaces/IUser";

// declare global {
//       export type JWTSubject = {
//             _id: IUser["_id"];
//             username: IUser["username"];
//       };
//       export type FnType = (...args: any[]) => any;
// }

export type JWTSubject = {
      _id: IUser["_id"];
      username: IUser["username"];
};

export type FnType = (...args: any[]) => any;
