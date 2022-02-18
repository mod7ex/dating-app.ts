import jwt from "jsonwebtoken";
import { JWT_SECRET_ACCESS } from "../config/config";

export const generateJWTAcessToken = <T extends object | string>(
      payload: T,
      expIn: number = 60 * 60
): string => {
      return jwt.sign(payload, JWT_SECRET_ACCESS, {
            expiresIn: expIn,
      });
};
