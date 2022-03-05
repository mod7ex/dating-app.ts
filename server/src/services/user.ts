import User from "../models/User";
import IUser from "../interfaces/IUser";
import { FilterQuery, QueryOptions } from "mongoose";
import { CreateUserInput } from "../schema/user";
import { emailRegex } from "../helpers";
import { UpdateUserInput } from "../schema/user";

export let createUser = async (input: Partial<CreateUserInput>) => {
      return await User.create(input);
};

export let findUserById = async (id: string, options?: QueryOptions | null) => {
      return await User.findById(id, null, options);
};

export let findUser = async (
      query: FilterQuery<IUser>,
      options: QueryOptions | null = { lean: false }
) => {
      return User.findOne<IUser>(query, null, options);
};

export let findUserByEmail = async (
      email: string,
      options: QueryOptions | null = { lean: false }
) => {
      return await findUser({ email }, options);
};

export let findUserByLogin = async (
      login: IUser["email"] | IUser["username"]
): Promise<IUser | null> => {
      let isEmail = emailRegex.test(login),
            user: IUser | null = null;

      if (isEmail) user = await findUser({ email: login });
      else user = await findUser({ username: login });

      return user;
};

export const deleteUser = async (_id: string) => {
      return User.deleteOne({ _id });
};

export let deleteAllUsers = async () => {
      return User.deleteMany({});
};

export const updateUser = async (_id: string, update: UpdateUserInput) => {
      return await User.findByIdAndUpdate(_id, update, {
            new: true,
      });
};
