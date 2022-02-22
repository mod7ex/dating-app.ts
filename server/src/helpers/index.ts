import jwt, { Jwt, JwtPayload, JsonWebTokenError } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { IUser } from "../interfaces/IUser";

type FnType = (...args: any[]) => any;

type JWTSubject = {
      _id: IUser["_id"];
      username: IUser["username"];
};

export const wrap = (fn: FnType): FnType => {
      return (...args: any[]) => {
            try {
                  fn(...args);
            } catch (error) {
                  console.log("error in wrap function; ", error);
            }
      };
};

export const emailRegex = new RegExp(
      `^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`
);

export const passwordRegex = new RegExp(
      `^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$`
);

export const signJWT = <T extends JWTSubject>(
      payload: T,
      expiresIn: number = 60 * 60
): string => {
      return jwt.sign(payload, JWT_SECRET.access, {
            expiresIn,
      });
};

export const generateCode = () => {
      let code = Math.floor(Math.random() * 10000);
      return code.toString();
};
