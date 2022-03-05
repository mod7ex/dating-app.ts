import Meta from "../models/Meta";
import { Types } from "mongoose";
import { MetaInput } from "../schema/meta";

export const initUserMeta = async (user_id: Types.ObjectId) => {
      return await Meta.create({ user_id });
};

export const updateMeta = async (
      update: MetaInput,
      meta_id: Types.ObjectId
) => {
      return await Meta.findByIdAndUpdate(meta_id, update, {
            new: true,
      });
};

export const getMeta = async (meta_id: Types.ObjectId) => {
      return await Meta.findById(meta_id);
};

export const dropUserMeta = async (user_id: Types.ObjectId) => {
      return await Meta.findOneAndDelete({ user_id });
};

export const dropMeta = async (meta_id: Types.ObjectId) => {
      return await Meta.findByIdAndDelete(meta_id);
};
