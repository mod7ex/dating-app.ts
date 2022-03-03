import { Types, Document } from "mongoose";
import { MetaInput } from "../schema/meta";
import IUser from "./IUser";

/* 

export interface MetaInput {
      phone_number?: string;
      dob?: Date;
      gender?: boolean | unknown;
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

*/

export default interface IMeta extends MetaInput, Document {
      _id: Types.ObjectId;

      user_id: Types.ObjectId;
      user: IUser;

      avatar?: string;
      media?: string[];

      createdAt: Date;
      updatedAt: Date;
}
