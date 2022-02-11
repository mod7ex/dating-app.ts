import { Schema, Model } from "mongoose";
import User from "../interfaces/IUser";
import { emailRegex } from "../helpers";

const userSchema = new Schema<User, Model<User>>({
      first_name: { type: String, required: [true, "First name is required"] },

      last_name: { type: String, required: [true, "Last name is required"] },

      username: { type: String, required: [true, "Username is required"] },

      avatar: String,

      email: {
            type: String,
            required: [true, "Email is required"],
            match: [emailRegex, "Please enter a valid email"],
            maxlength: 320,
      },

      phone_number: String,

      dob: Date,

      password: { type: String, required: [true, "Password is required"] },

      password_confirmation: String,
});
