import "express-async-errors";
import express from "express";
import { SERVER } from "./config/config";
import { req, errorHandler, notFound, cors } from "./middlewares";
import router from "./routes";
import { app, httpServer, initSocket } from "./server";

/******************   security   ******************/

app.disable("x-powered-by");

/**************************************************/

/*****************   middlewares   *****************/

app.use(cors._$);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(req._$);

app.use("/api", router);

app.use(notFound._$, errorHandler._$);

/***************************************************/

import { db, trackRedis } from "./db";

let start = async (port: number): Promise<void> => {
      try {
            await db.track();

            await trackRedis();

            // httpServer.listen(port, (): void => {
            //       console.log(
            //             `Server listening on port; ${port}. visit http://${SERVER.hostname}:${port}`
            //       );
            // });

            initSocket(port, (): void => {
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
