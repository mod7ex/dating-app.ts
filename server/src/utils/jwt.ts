import jwt, { JwtPayload, JsonWebTokenError } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

class JWT {
      sign(
            payload: string | object,
            expIn: number = 60 * 60,
            key: "refresh" | "access" = "access"
      ): string {
            let token = jwt.sign(payload, JWT_SECRET[key], {
                  expiresIn: expIn,
            });

            return token;
      }

      verify<T extends JwtPayload | string | null>(
            subject: string,
            key: "refresh" | "access" = "access"
      ): {
            decoded: T;
            expired: boolean;
      } {
            try {
                  let decoded = jwt.verify(subject, JWT_SECRET[key]) as T;
                  return { decoded, expired: false };
            } catch (err) {
                  return {
                        decoded: null as T,
                        expired: (err as JsonWebTokenError).message.includes(
                              "jwt expired"
                        ),
                  };
            }
      }
}

export default new JWT();
