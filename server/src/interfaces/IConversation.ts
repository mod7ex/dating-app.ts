import { Types, Document } from "mongoose";

export default interface IMessage extends Document {
      _id: Types.ObjectId;

      peers: Types.ObjectId[];

      deleted: boolean;

      createdAt: Date;
}
