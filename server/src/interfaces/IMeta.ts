import { Types, Document } from "mongoose";

export interface MetaInput {
      avatar?: string;
      phone_number?: string;
      dob?: Date;
      gender?: boolean | unknown;
      media?: string[];
      location?: {
            country?: number;
            region?: number;
            city?: number;
            timezone?: number;
      };
      marital_status?: number;
      height?: number;
      weight?: number;
      hair_color?: number;
      eye_color?: number;
      children?: number;
      relegion?: number;
      smoking?: number;
      drinking?: number;
      income?: number;
      education?: string;
      ocupation?: string;
      languages?: number[];
      partner_age?: { from?: number; to?: number };
      about_me?: string;
      about_partner?: string;
}

export default interface IMeta extends MetaInput, Document {
      _id: Types.ObjectId;

      createdAt: Date;
      updatedAt: Date;
}
