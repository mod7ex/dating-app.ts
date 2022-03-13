import { Schema, model, SchemaTypes } from "mongoose";
import IConversation from "../interfaces/IConversation";

let conversationSchema = new Schema<IConversation>({
      peers: [
            {
                  type: SchemaTypes.ObjectId,
                  ref: "User",
            },
      ],

      deleted: {
            type: Boolean,
            default: false,
      },

      createdAt: Date,
});

export default model<IConversation>("Conversation", conversationSchema);
