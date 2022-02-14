import IMeta from "../interfaces/IMeta";
import { Schema, model } from "mongoose";

const metaSchema = new Schema<IMeta>({
      avatar: String,
      phone_number: String,
      dob: Date,

      gender: Boolean,
      media: [String],
      location: {
            country: Number,
            region: Number,
            city: Number,
            timezone: Number,
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
      partner_age: { from: Number, to: Number },
      about_me: String,
      about_partner: String,
});

export default model<IMeta>("Meta", metaSchema);
