import { Types, Document } from "mongoose";

export default interface User extends Document {
      _id: Types.ObjectId;
      first_name: string;
      last_name: string;
      username: string;
      avatar?: string;
      email: string;
      phone_number?: string;
      dob?: Date;
      password: string;
      password_confirmation: null;

      // lastOnline: Date;
      // createdAt: Date;
      // updatedAt: Date;
}
