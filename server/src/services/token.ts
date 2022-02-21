import jwt, { Jwt, JwtPayload, JsonWebTokenError } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { IUser } from "../interfaces/IUser";
import { RedisClient } from "../db";

type JWTSubject = {
      _id: IUser["_id"];
      username: IUser["username"];
};

export const generateJWTAccessToken = (
      payload: JWTSubject,
      expIn: number = 60 * 60
): string => {
      return jwt.sign(payload, JWT_SECRET.access, {
            expiresIn: expIn,
      });
};

export const generateJWTRefreshToken = async (
      payload: JWTSubject,
      expIn: number = 60 * 60 * 12
): Promise<string> => {
      let token = jwt.sign(payload, JWT_SECRET.refresh, {
            expiresIn: expIn,
      });

      // store token
      await RedisClient.setEx(payload._id.toString(), expIn, token);

      return token;
};

export const deleteJWTRefreshToken = async (_id: string) => {
      return RedisClient.del(_id);
};

export const getUserRefreshToken = (_id: string): Promise<string | null> => {
      return RedisClient.get(_id);
};

export const VerifyJWT = (
      subject: string
): { payload: Jwt | JwtPayload | string | null; expired: boolean } => {
      try {
            let payload = jwt.verify(subject, JWT_SECRET.refresh);
            return { payload, expired: false };
      } catch (err) {
            return {
                  payload: null,
                  expired: (err as JsonWebTokenError).message.includes(
                        "jwt expired"
                  ),
            };
      }
};
