import jwtApp from "../utils/jwt";
import { RedisClient } from "../db";

export const signAccessToken = (
      payload: JWTSubject,
      expIn?: number
): string => {
      // create token
      let token = jwtApp.sign(payload, expIn);

      return token;
};

export const signRefreshToken = async (
      payload: JWTSubject,
      expIn: number = 60 * 60 * 12
): Promise<string> => {
      // create token
      let token = jwtApp.sign(payload, expIn, "refresh");

      // store token
      await RedisClient.setEx(payload._id.toString(), expIn, token);

      return token;
};

export const verifyAccessToken = (subject: string) => {
      return jwtApp.verify<JWTSubject | null>(subject);
};

export const verifyRefreshToken = (subject: string) => {
      return jwtApp.verify<JWTSubject | null>(subject, "refresh");
};

export const dropRefreshToken = async (_id: string) => {
      return RedisClient.del(_id);
};

export const getUserRefreshToken = (_id: string): Promise<string | null> => {
      return RedisClient.get(_id);
};
