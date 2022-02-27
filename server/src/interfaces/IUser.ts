import { Types, Document } from "mongoose";
import { CreateUserInput } from "../schema/user";

export default interface IUser extends CreateUserInput, Document {
      _id: Types.ObjectId;

      verificationCode: string;
      passwordResetCode?: string | undefined;
      verified: boolean;

      lastOnline: Date;
      createdAt: Date;
      updatedAt: Date;

      comparePassword(password_condidat: string): Promise<boolean>;
      signAccessToken(expIn?: number): string;
      signRefreshToken(expIn?: number): Promise<string>;
}
