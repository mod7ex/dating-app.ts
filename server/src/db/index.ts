import "dotenv/config";
import { connect, connection, Error as MongooseError } from "mongoose";

class DB {
      constructor(private uri: string) {}

      connect(): void {
            connect(this.uri);
      }

      track(): void {
            connection.on("connected", (): void => {
                  console.log("\nConnected to mongoDB ...");
            });

            connection.on("error", (err: MongooseError): void => {
                  console.log("mongo error ==> ", err.message);
            });

            connection.on("disconnected", (): void => {
                  console.log("\nDisconnected from mongoDB ...");
            });

            process.on("SIGINT", async (): Promise<void> => {
                  await connection.close();
                  process.exit(0);
            });
      }
}

export const db = new DB(process.env.MONGO_URI!);
