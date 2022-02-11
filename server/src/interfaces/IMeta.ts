import { Types } from "mongoose";

export default interface IMeta {
      _id: Types.ObjectId;
      gender: boolean | unknown;
      media: string[];
      location: {
            country: number;
            region: number;
            city: number;
            timezone: number;
      };
      marital_status: number;
      height: number;
      weight: number;
      hair_color: number;
      eye_color: number;
      children: number;
      relegion: number;
      smoking: number;
      drinking: number;
      income: number;
      education: string;
      ocupation: string;
      languages: number[];
      partner_age: { from: number; to: number };
      about_me: string;
      about_partner: string;
}
