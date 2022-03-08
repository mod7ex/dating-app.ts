import { Types, Document } from "mongoose";
import { MetaInput } from "../schema/meta";

export default interface IMeta extends MetaInput, Document {
      _id: Types.ObjectId;

      user_id: Types.ObjectId;

      avatar?: number;
      media: string[];

      createdAt: Date;
      updatedAt: Date;

      updateMedia(update: string[]): Promise<IMeta | null>;
      dropPhoto(photo: string): Promise<IMeta | null>;
      setMedia(this: IMeta, media: string[]): Promise<IMeta | null>;
}
