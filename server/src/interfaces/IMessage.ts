import { Types, Document } from "mongoose";

export default interface IMessage extends Document {
      _id: Types.ObjectId;

      sender: Types.ObjectId;
      conversation: Types.ObjectId;

      content: string;
      readed: boolean;

      sentAt: Date;
      updatedAt: Date;
}
