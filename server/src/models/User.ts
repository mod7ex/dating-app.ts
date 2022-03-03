import { Schema, model, SchemaTypes } from "mongoose";
import { BadRequestError } from "../errors";
import IUser from "../interfaces/IUser";
import { emailRegex, passwordRegex } from "../helpers";
import { signAccessToken, signRefreshToken } from "../services/auth";
import { generateCode } from "../helpers";
import logger from "../utils/logger";
import argon2 from "argon2";
import IMeta from "../interfaces/IMeta";
import { initUserMeta, updateUserMeta, getMeta } from "../services/meta";
import { MetaInput } from "../schema/meta";

const userSchema = new Schema<IUser>({
      meta_id: {
            type: SchemaTypes.ObjectId,
            ref: "Meta",
      },

      first_name: { type: String, required: [true, "First name is required"] },

      last_name: { type: String, required: [true, "Last name is required"] },

      username: {
            type: String,
            unique: true,
            required: [true, "Username is required"],
      },

      email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            match: [emailRegex, "Please enter a valid email"],
            maxlength: [320, "Please enter a valid email"],
      },

      password: {
            type: String,
            // select: false,
            required: [true, "Password is required"],
      },

      verificationCode: {
            type: String,
            default: generateCode(),
      },

      passwordResetCode: String,

      verified: {
            type: Boolean,
            default: false,
      },

      lastOnline: Date,

      createdAt: {
            type: Date,
            default: new Date(),
      },

      updatedAt: {
            type: Date,
            default: new Date(),
      },
});

export const userPrivateFields = [
      "meta_id",
      "password",
      "verificationCode",
      "passwordResetCode",
      "verified",
      "__v",
];

userSchema.index({ email: 1, username: 1 });

/* Virtual fields */
userSchema.virtual("full_name").get(function (this: IUser) {
      return `${this.first_name} ${this.last_name}`;
});

/*

userSchema.virtual("meta").get(async function (this: IUser) {
      let meta = await Meta.findById(this.meta_id);
      return meta;
});

userSchema.virtual("meta").set(async function (this: IUser, value: MetaInput) {
      await updateUserMeta(value, this._id);
});

*/

/* Hooks */
userSchema.pre<IUser>("save", async function (next) {
      if (!this.isModified("password")) {
            this.updatedAt = new Date();
            return next();
      }

      if (!passwordRegex.test(this.password))
            next(new BadRequestError("Invalid password"));

      let hash = await argon2.hash(this.password);

      this.password = hash;
      this.updatedAt = new Date();
      return next();
});

userSchema.pre<IUser>("updateOne", function (next) {
      this.updatedAt = new Date();
      return next();
});

// userSchema.post<CreateUserInput>("validate", function (doc, next) {
//       if (!passwordRegex.test(this.password))
//             next(new BadRequestError("Invalid password"));
//       next();
// });

userSchema.methods = {
      comparePassword: async function (
            this: IUser,
            password_condidat: string
      ): Promise<boolean> {
            try {
                  return await argon2.verify(this.password, password_condidat);
            } catch (e: any) {
                  await logger.error(e);
                  return false;
            }
      },

      signAccessToken: function (this: IUser, expIn?: number): string {
            return signAccessToken(
                  {
                        _id: this._id,
                        username: this.username,
                  },
                  expIn
            );
      },

      signRefreshToken: function (
            this: IUser,
            expIn?: number
      ): Promise<string> {
            return signRefreshToken(
                  {
                        _id: this._id,
                        username: this.username,
                  },
                  expIn
            );
      },

      initMeta: async function (this: IUser): Promise<IMeta> {
            return await initUserMeta(this._id);
      },

      updateMeta: async function (
            this: IUser,
            update: MetaInput
      ): Promise<IMeta | null> {
            return await updateUserMeta(update, this._id);
      },

      getMeta: async function (this: IUser): Promise<IMeta | null> {
            return await getMeta(this.meta_id);
      },
};

export default model<IUser>("User", userSchema);
