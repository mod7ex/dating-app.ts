import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUser, IUserInput } from "../interfaces/IUser";
import { emailRegex, passwordRegex } from "../helpers";
import { JWT_TOKEN } from "../config/config";
import { redisClient } from "../db";

import jwt from "jsonwebtoken";

const userSchema = new Schema<IUser>({
      first_name: { type: String, required: [true, "First name is required"] },
      last_name: { type: String, required: [true, "Last name is required"] },
      username: { type: String, required: [true, "Username is required"] },
      email: {
            type: String,
            required: [true, "Email is required"],
            match: [emailRegex, "Please enter a valid email"],
            maxlength: [320, "Please enter a valid email"],
      },
      password: {
            type: String,
            select: false,
            required: [true, "Password is required"],
      },
      password_confirmation: String,
      lastOnline: Date,
      createdAt: Date,
      updatedAt: Date,
});

userSchema.index({ email: 1, username: 1 });

/* Virtual fields */
userSchema.virtual("full_name").get(function (this: IUser) {
      return `${this.first_name} ${this.last_name}`;
});

/* Hooks */
userSchema.pre<IUser>("save", async function (next) {
      if (!this.isModified("password")) return next();

      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(this.password, salt);

      this.password = hash;
      return next();
});

userSchema.post<IUserInput>("validate", function (next) {
      if (!this.password.match(passwordRegex))
            return next(new Error("Invalid password"));

      if (this.password != this.password_confirmation)
            return next(new Error("Please confirm your password"));

      this.password_confirmation = undefined;

      return next();
});

userSchema.methods = {
      comparePassword: async function (
            password_condidat: string
      ): Promise<boolean> {
            const user = this as IUser;

            return bcrypt
                  .compare(password_condidat, user.password)
                  .catch((e) => false);
      },

      generateJWTToken: async function (this: IUser, expIn: number = 60 * 60) {
            let token = jwt.sign(
                  { username: this.username, _id: this._id },
                  JWT_TOKEN,
                  {
                        expiresIn: expIn,
                  }
            );

            await redisClient.setEx(this._id.toString(), expIn, token);

            return token;
      },

      killJWTToken: async function (this: IUser) {
            await redisClient.del(this._id.toString());
      },
};

export default model<IUser>("User", userSchema);
