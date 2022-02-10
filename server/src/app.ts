import "dotenv/config";
import express from "express";
import { createServer } from "http";

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

let start = (port: number): void => {
      try {
            db.track();

            db.connect();

            server.listen(port, (): void => {
                  console.log(
                        `Server listening on port; ${port}. visit http://localhost:${port}`
                  );
            });
      } catch (error) {
            console.log("error at starting server ==> ", error);
            process.exit(1);
      }
};

start(Number(process.env.PORT) || 3000);
