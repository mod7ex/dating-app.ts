import { Types, Document } from "mongoose";
import { CreateUserInput } from "../schema/user";
import IMeta from "./IMeta";
import { MetaInput } from "../schema/meta";

export default interface IUser extends CreateUserInput, Document {
      _id: Types.ObjectId;

      meta_id: Types.ObjectId;

      verificationCode?: string | undefined;
      passwordResetCode?: string | undefined;
      verified: boolean;

      lastOnline: Date;
      createdAt: Date;
      updatedAt: Date;

      comparePassword(password_condidat: string): Promise<boolean>;
      signAccessToken(expIn?: number): string;
      signRefreshToken(expIn?: number): Promise<string>;
      initMeta(): Promise<IMeta>;
      updateMeta(update: MetaInput): Promise<IMeta | null>;
      getMeta(): Promise<IMeta>;
}
