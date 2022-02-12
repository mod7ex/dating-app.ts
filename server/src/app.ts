import express from "express";
import { createServer } from "http";
import { MONGO, SERVER } from "./config/config";

const app = express();
const server = createServer(app);

/******************   security   ******************/

app.disable("x-powered-by");

/**************************************************/

/*****************   middlewares   *****************/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/***************************************************/

import { db } from "./db";

let start = async (port: number): Promise<void> => {
      try {
            db.uri = MONGO.uri;
            await db.track();
            await db.connect();

            server.listen(port, (): void => {
                  console.log(
                        `Server listening on port; ${port}. visit http://${SERVER.hostname}:${port}`
                  );
            });
      } catch (error) {
            console.log("error at starting server ==> ", error);
            process.exit(1);
      }
};

start(SERVER.port);
