import dotenv from "dotenv";
dotenv.config();
import path from "path";

export const APP_PATH = path.dirname(__dirname);

const MONGO_HOST = process.env.MONGO_HOST || "cluster0.jp8ac.mongodb.net";
const MONGO_USERNAME = process.env.MONGO_USERNAME || "modex987";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "mongo1998";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "dating-app";

const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_USERNAME = process.env.REDIS_USERNAME || "modex987";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "redis1998";

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;

export const REDIS = {
      port: REDIS_PORT,
      host: REDIS_HOST,
      username: REDIS_USERNAME,
      password: REDIS_PASSWORD,
};

export const JWT_TOKEN = process.env.JWT_TOKEN!;

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
