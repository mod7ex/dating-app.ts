import fs from "fs/promises";
import { APP_PATH } from "../config/config";
import path from "path";
import { Mode } from "fs";

type LogNatureType = "error" | "request" | "info";

export class Logger {
      now() {
            return new Date().toISOString();
      }

      info(data: string): string {
            return `[${this.now()}] INFO: ${data}; \n`;
      }

      console(data: string): void {
            console.log(this.info(data));
      }

      async write(data: string, logNature: LogNatureType, mode: Mode = "a") {
            let filePath = path.resolve(APP_PATH, "logs", `${logNature}s.log`);

            let file_descriptor = await fs.open(filePath, mode);

            await fs.appendFile(filePath, this.info(data), "utf8");

            await file_descriptor.close();
      }

      async errorTxt(data: string) {
            await this.write(data, "error");
      }

      async error(err: Error) {
            let data = err.toString();
            await this.errorTxt(data);
      }

      async request({
            method,
            originalUrl,
            ip,
      }: {
            method: string;
            originalUrl: string;
            ip: string;
      }) {
            let data = `${method}: ${originalUrl} from ${ip}`;
            await this.write(data, "request");
            this.console(data);
      }

      async log(data: string) {
            await this.write(data, "info");
      }
}
export default new Logger();
