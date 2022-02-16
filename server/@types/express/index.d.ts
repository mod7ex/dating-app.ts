import { IUser } from "../../src/interfaces/IUser";

declare global {
      namespace Request {
            interface Request {
                  user: IUser;
            }
      }
}
