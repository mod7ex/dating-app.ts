import { Schema, model, SchemaTypes } from "mongoose";
import IMessage from "../interfaces/IMessage";

let messageSchema = new Schema<IMessage>({
      conversation: {
            type: SchemaTypes.ObjectId,
            ref: "Conversation",
      },

      sender: {
            type: SchemaTypes.ObjectId,
            ref: "User",
      },

      content: {
            type: String,
            required: true,
      },

      readed: {
            type: Boolean,
            default: false,
      },

      sentAt: Date,
      updatedAt: Date,
});

export default model<IMessage>("Message", messageSchema);
