import User from "../models/User";
import { UserInput, UserDocument } from "../interfaces/IUser";
import { AnyKeys, FilterQuery, QueryOptions } from "mongoose";

export let createUser = async (input: AnyKeys<UserInput>) => {
      return User.create(input);
};

export let findUser = async (
      query: FilterQuery<UserDocument>,
      options: QueryOptions | null = { lean: false }
) => {
      return User.findOne(query, null, options);
};

export let loginUser = async ({
      email,
      password,
}: {
      email: UserDocument["email"];
      password: UserDocument["password"];
}) => {
      let user = await findUser({ email });

      if (!user) {
            throw new Error("User does not exist");
      }

      return user.comparePassword(password);
};

export let deleteAllUsers = async () => {
      return User.deleteMany({});
};
