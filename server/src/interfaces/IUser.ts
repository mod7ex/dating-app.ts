import { Types, Document } from "mongoose";

export interface UserInput {
      first_name: string;
      last_name?: string;
      username: string;
      avatar?: string;
      email: string;
      phone_number?: string;
      dob?: Date;
      password: string;
      password_confirmation: string | undefined;
}

export interface UserDocument extends UserInput, Document {
      _id: Types.ObjectId;
      lastOnline: Date;
      createdAt: Date;
      updatedAt: Date;
      comparePassword(password_condidat: string): Promise<boolean>;
}
