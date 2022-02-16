import { Types, Document } from "mongoose";

export interface IUserInput {
      first_name: string;
      last_name?: string | undefined;
      username: string;
      email: string;
      password: string;
      password_confirmation: string | undefined;
}

export interface IUser extends IUserInput, Document {
      _id: Types.ObjectId;
      lastOnline: Date;
      createdAt: Date;
      updatedAt: Date;
      comparePassword(password_condidat: string): Promise<boolean>;
      generateJWTToken(expIn?: number): Promise<string>;
}
