import Meta from "../models/Meta";
import { Types } from "mongoose";
import { MetaInput } from "../schema/meta";
import { SearchUsersInput } from "../schema/user";

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

export const getMetaByUserId = async (user_id: Types.ObjectId) => {
      return await Meta.findOne({ user_id });
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

export const updateMedia = async (
      meta_id: Types.ObjectId,
      update: string[]
) => {
      return await Meta.findByIdAndUpdate(
            meta_id,
            {
                  $push: { media: { $each: update } },
            },
            { new: true }
      );
};

export const dropPhoto = async (meta_id: Types.ObjectId, photo: string) => {
      return await Meta.findByIdAndUpdate(
            meta_id,
            { $pull: { media: photo } },
            { new: true }
      );
};

export const setMedia = async (meta_id: Types.ObjectId, media: string[]) => {
      return await Meta.findByIdAndUpdate(meta_id, { media }, { new: true });
};

export const setMainPhoto = async (meta_id: Types.ObjectId, photo: string) => {
      await Meta.bulkWrite(
            [
                  {
                        updateOne: {
                              filter: { _id: meta_id },
                              update: {
                                    $pull: { media: photo },
                              },
                        },
                  },
                  {
                        updateOne: {
                              filter: { _id: meta_id },
                              update: {
                                    $push: {
                                          media: {
                                                $each: [photo],
                                                $position: 0,
                                          },
                                    },
                              },
                        },
                  },
            ],
            {
                  ordered: true,
            }
      );
};

export const searchUsers = async (cretarias: SearchUsersInput) => {
      let {
            gender,
            location,
            username,
            name,
            online,
            phone_number,
            with_photo,
            partner_age,
            height,
            weight,
            without_children,
            languages,
            marital_status,
            smoking,
            drinking,
            relegion,
            eye_color,
            hair_color,
            income,
            education,
            ocupation,
      } = cretarias;

      let queryObject = {};

      return [];
};
