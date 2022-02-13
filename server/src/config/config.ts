import dotenv from "dotenv";
dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST || "cluster0.jp8ac.mongodb.net";
const MONGO_USERNAME = process.env.MONGO_USERNAME || "modex987";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "mongo1998";
const MONGO_DB_NAME = process.env.MONGO_PASSWORD || "dating-app";

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;

export const MONGO = {
      host: MONGO_HOST,
      username: MONGO_USERNAME,
      password: MONGO_PASSWORD,
      db_name: MONGO_DB_NAME,
      uri: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
};

export const SERVER = {
      hostname: SERVER_HOSTNAME,
      port: SERVER_PORT,
};
