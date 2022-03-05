import { Schema, model, SchemaTypes } from "mongoose";
import IUser from "../interfaces/IUser";
import { signAccessToken, signRefreshToken } from "../services/auth";
import { generateCode } from "../helpers";
import logger from "../utils/logger";
import argon2 from "argon2";
import IMeta from "../interfaces/IMeta";
import { initUserMeta, updateMeta, getMeta, dropMeta } from "../services/meta";
import { MetaInput } from "../schema/meta";
import { sendEmail } from "../utils/mailer";

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

/* Hooks */
userSchema.pre<IUser>("save", async function (next) {
      this.updatedAt = new Date();

      if (this.isModified("email")) {
            this.verified = false;

            this.verificationCode = generateCode();

            await sendEmail({
                  from: "siteadmin@example.com",
                  to: this.email,
                  subject: "please verify your account",
                  text: `verification code ${this.verificationCode}. Id: ${this._id}`,
            });
      }

      if (this.isModified("password")) {
            let hash = await argon2.hash(this.password);
            this.password = hash;
      }

      return next();
});

userSchema.pre<IUser>("deleteOne", async function (next) {
      await dropMeta(this.meta_id);
      next();
});

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
            let meta = await initUserMeta(this._id);
            this.updatedAt = new Date();
            await this.save();
            return meta;
      },

      updateMeta: async function (
            this: IUser,
            update: MetaInput
      ): Promise<IMeta | null> {
            let meta = await updateMeta(update, this.meta_id);
            this.updatedAt = new Date();
            await this.save();
            return meta;
      },

      getMeta: async function (this: IUser): Promise<IMeta | null> {
            return await getMeta(this.meta_id);
      },
};

export default model<IUser>("User", userSchema);
