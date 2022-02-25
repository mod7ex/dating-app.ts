import { Types, Document } from "mongoose";
import { CreateUserInput } from "../schema/user";

export interface IUser extends CreateUserInput, Document {
      _id: Types.ObjectId;

      verificationCode: string;
      passwordResetCode?: string | undefined;
      verified: boolean;

      lastOnline: Date;
      createdAt: Date;
      updatedAt: Date;

      comparePassword(password_condidat: string): Promise<boolean>;
      getJWTAccessToken(expIn?: number): string;
      getJWTRefreshToken(expIn?: number): Promise<string>;
}
