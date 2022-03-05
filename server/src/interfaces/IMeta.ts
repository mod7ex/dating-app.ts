import { Types, Document } from "mongoose";
import { MetaInput } from "../schema/meta";
import IUser from "./IUser";

export default interface IMeta extends MetaInput, Document {
      _id: Types.ObjectId;

      user_id: Types.ObjectId;
      user: IUser;

      avatar?: string;
      media?: string[];

      createdAt: Date;
      updatedAt: Date;
}
