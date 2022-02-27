import { Schema, model } from "mongoose";
import { CreateUserInput } from "../schema/user";
import IUser from "../interfaces/IUser";
import { emailRegex, passwordRegex } from "../helpers";
import { signAccessToken, signRefreshToken } from "../services/auth";
import { generateCode } from "../helpers";
import logger from "../utils/logger";
import argon2 from "argon2";

const userSchema = new Schema<IUser>({
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
            select: false,
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

      createdAt: Date,

      updatedAt: {
            type: Date,
            default: new Date(),
      },
});

userSchema.index({ email: 1, username: 1 });

/* Virtual fields */
userSchema.virtual("full_name").get(function (this: IUser) {
      return `${this.first_name} ${this.last_name}`;
});

/* Hooks */
userSchema.pre<IUser>("save", async function (next) {
      if (!this.isModified("password")) return next();

      let hash = await argon2.hash(this.password);

      this.password = hash;
      return next();
});

userSchema.post<CreateUserInput>("validate", function (next) {
      if (!this.password.match(passwordRegex))
            return next(new Error("Invalid password"));

      return next();
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

      signAccessToken: function (this: IUser): string {
            return signAccessToken({
                  _id: this._id,
                  username: this.username,
            });
      },

      signRefreshToken: function (this: IUser): Promise<string> {
            return signRefreshToken({
                  _id: this._id,
                  username: this.username,
            });
      },
};

export default model<IUser>("User", userSchema);
