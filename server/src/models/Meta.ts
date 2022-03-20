import IMeta from "../interfaces/IMeta";
import { Schema, model, SchemaTypes } from "mongoose";
import User from "./User";
import {
      updateMedia,
      dropPhoto,
      setMedia,
      setMainPhoto,
} from "../services/meta";

const metaSchema = new Schema<IMeta>({
      user_id: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            unique: true,
      },

      phone_number: String,
      dob: Date,
      gender: Boolean,
      media: [String],
      location: {
            country: { type: Number, default: null },
            region: { type: Number, default: null },
            city: { type: Number, default: null },
            timezone: { type: Number, default: null },
      },
      marital_status: Number,
      height: Number,
      weight: Number,
      hair_color: Number,
      eye_color: Number,
      children: Number,
      relegion: Number,
      smoking: Number,
      drinking: Number,
      income: Number,
      education: String,
      ocupation: String,
      languages: [Number],
      partner_age: {
            from: {
                  type: Number,
                  default: null,
            },
            to: {
                  type: Number,
                  default: null,
            },
      },
      about_me: String,
      about_partner: String,
});

export const metaPrivateFields = ["_id", "user_id", "__v"];

metaSchema.virtual("user").get(async function (this: IMeta) {
      let user = await User.findById(this.user_id);
      return user;
});

metaSchema.virtual("avatar").get(function (this: IMeta) {
      if (this.media.length) return this.media[0];
});

metaSchema.methods = {
      updateMedia: async function (
            this: IMeta,
            update: string[]
      ): Promise<IMeta | null> {
            return await updateMedia(this._id, update);
      },

      dropPhoto: async function (
            this: IMeta,
            photo: string
      ): Promise<IMeta | null> {
            return await dropPhoto(this._id, photo);
      },

      setMedia: async function (
            this: IMeta,
            media: string[]
      ): Promise<IMeta | null> {
            return await setMedia(this._id, media);
      },

      setMainPhoto: async function (this: IMeta, photo: string): Promise<void> {
            return await setMainPhoto(this._id, photo);
      },
};

export default model<IMeta>("Meta", metaSchema);
