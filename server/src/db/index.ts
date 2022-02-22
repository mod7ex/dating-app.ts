import { connect, connection, Error } from "mongoose";
import { createClient } from "redis";
import { REDIS, MONGO, SERVER } from "../config/config";

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

            await this.connect();
      }
}

export const db = new DB(MONGO.uri);

export const RedisClient = createClient({
      socket: {
            host: REDIS.host,
            port: REDIS.port,
      },
      username: REDIS.username,
      password: REDIS.password,
});

export const trackRedis = async () => {
      console.log("tracking redis now ....................");

      RedisClient.on("connect", () => {
            console.log("\nClient connected to redis ...");
      });

      RedisClient.on("ready", () => {
            console.log("\nClient connected to redis and ready to use ...");
      });

      RedisClient.on("error", (err: Error) => {
            console.error(err.message);
            RedisClient.quit();
      });

      RedisClient.on("end", () => {
            console.log("\nClient disconnected from redis ...");
      });

      RedisClient.on("reconnecting", () => {
            console.log("\nClient is conecting wait ...");
      });

      process.on("SIGINT", () => {
            RedisClient.quit();
            // process.exit(0);
      });

      await RedisClient.connect();
};
