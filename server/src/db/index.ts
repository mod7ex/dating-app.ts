import { connect, connection, Error } from "mongoose";
import { createClient, defineScript } from "redis";
import { REDIS } from "../config/config";

class DB {
      public constructor(private _uri?: string) {}

      public set uri(uri: string) {
            this._uri = uri;
      }

      public async connect(): Promise<void> {
            if (!this._uri) return;
            connect(this._uri);
      }

      public async track(): Promise<void> {
            connection.on("connected", (): void => {
                  console.log("\nConnected to mongoDB ...");
            });

            connection.on("error", (err: Error): void => {
                  console.log("mongo error ==> ", err.message);
            });

            connection.on("disconnected", (): void => {
                  console.log("\nDisconnected from mongoDB ...");
            });

            process.on("SIGINT", async (): Promise<void> => {
                  await connection.close(true);
                  process.exit(0);
            });
      }
}

export const db = new DB();

export const redisClient = createClient({
      socket: {
            host: REDIS.host,
            port: REDIS.port,
      },
      username: REDIS.username,
      password: REDIS.password,
});

export const trackRedis = async () => {
      console.log("tracking redis now ....................");

      redisClient.on("connect", () => {
            console.error("\nClient connected to redis ...");
      });

      redisClient.on("ready", () => {
            console.error("\nClient connected to redis and ready to use ...");
      });

      redisClient.on("error", (err) => {
            console.error(err.message);
            redisClient.quit();
      });

      redisClient.on("end", () => {
            console.error("\nClient disconnected from redis ...");
      });

      process.on("SIGINT", () => {
            redisClient.quit();
            process.exit(0);
      });

      await redisClient.connect();
};
