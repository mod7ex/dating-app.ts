import jwtApp from "../utils/jwt";
import IUser from "../interfaces/IUser";
import { RedisClient } from "../db";

type JWTSubject = {
      _id: IUser["_id"];
      username: IUser["username"];
};

export const signAccessToken = (
      payload: JWTSubject,
      expIn: number = 60 * 60
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

export const dropRefreshToken = async (_id: string) => {
      return RedisClient.del(_id);
};

export const getUserRefreshToken = (_id: string): Promise<string | null> => {
      return RedisClient.get(_id);
};

// export const VerifyJWT = (
//       subject: string
// ): { payload: Jwt | JwtPayload | string | null; expired: boolean } => {
//       try {
//             let payload = jwt.verify(subject, JWT_SECRET.refresh);
//             return { payload, expired: false };
//       } catch (err) {
//             return {
//                   payload: null,
//                   expired: (err as JsonWebTokenError).message.includes(
//                         "jwt expired"
//                   ),
//             };
//       }
// };
