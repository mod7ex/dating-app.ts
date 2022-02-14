import User from "../models/User";
import { IUser, IUserInput } from "../interfaces/IUser";
import { AnyKeys, FilterQuery, QueryOptions } from "mongoose";
import { Err } from "../errors";

export let createUser = async (input: AnyKeys<IUserInput>) => {
      return User.create(input);
};

export let findUser = async (
      query: FilterQuery<IUser>,
      options: QueryOptions | null = { lean: false }
) => {
      return User.findOne(query, null, options);
};

export let loginUser = async ({
      email,
      password,
}: {
      email: IUser["email"];
      password: IUser["password"];
}): Promise<IUser | never> => {
      let user = await findUser({ email });

      if (!user) {
            Err.throw("NotFoundError", "No user found with this email");
      }

      let isVlidPassword = user.comparePassword(password);

      if (!isVlidPassword) Err.throw("UnauthorizedError", "Wrong password");

      return user;
};

export let deleteAllUsers = async () => {
      return User.deleteMany({});
};
