import { connect, connection, Error as MongooseError } from "mongoose";

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

export const db = new DB();
