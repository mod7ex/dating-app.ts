import "express-async-errors";
import express from "express";
import { SERVER, CLIENT } from "./config/config";
import { req, errorHandler, notFound } from "./middlewares";
import router from "./routes";
import cors from "cors";
import { app, httpServer } from "./server";

/******************   security   ******************/

app.disable("x-powered-by");

/**************************************************/

/*****************   middlewares   *****************/
app.use(
      cors({
            origin: [`http://${CLIENT.hostname}:${CLIENT.port}`],
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            allowedHeaders: ["Content-Type", "Authorization"],
            exposedHeaders: ["X-REFRESH"],
            credentials: true,
            maxAge: 3000,
            preflightContinue: false,
            optionsSuccessStatus: 204,
      })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(req._$);

app.use(router);

app.use(notFound._$, errorHandler._$);

/***************************************************/

import { db, trackRedis } from "./db";

let start = async (port: number): Promise<void> => {
      try {
            await db.track();

            await trackRedis();

            httpServer.listen(port, (): void => {
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
