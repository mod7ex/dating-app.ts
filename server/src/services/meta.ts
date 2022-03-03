import Meta from "../models/Meta";
import { Types } from "mongoose";
import { MetaInput } from "../schema/meta";

export const initUserMeta = async (user_id: Types.ObjectId) => {
      return await Meta.create({ user_id });
};

export const updateUserMeta = async (
      update: MetaInput,
      user_id: Types.ObjectId
) => {
      return await Meta.findByIdAndUpdate(user_id, update, {
            new: true,
      });
};

export const getMeta = async (meta_id: Types.ObjectId) => {
      return await Meta.findById(meta_id);
};
