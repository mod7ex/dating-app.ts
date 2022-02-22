import "express-async-errors";
import express from "express";
import { createServer } from "http";
import { SERVER } from "./config/config";
import { req, errorHandler, notFound } from "./middlewares";
import router from "./routes";

const app = express();
const server = createServer(app);

/******************   security   ******************/

app.disable("x-powered-by");

/**************************************************/

/*****************   middlewares   *****************/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(req._$);

app.use(router);

app.use(notFound._$, errorHandler._$);

/***************************************************/

import { db, trackRedis } from "./db";

let start = async (port: number): Promise<void> => {
      try {
            await db.track();

            await trackRedis();

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
