import User from "../models/User";
import IUser from "../interfaces/IUser";
import { FilterQuery, QueryOptions } from "mongoose";
import { NotFoundError, UnauthorizedError } from "../errors";
import { CreateUserInput } from "../schema/user";

export let createUser = async (input: Partial<CreateUserInput>) => {
      return await User.create(input);
};

export let findUserById = async (id: string) => {
      return await User.findById(id);
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

export let loginUser = async ({
      email,
      password,
}: {
      email: IUser["email"];
      password: IUser["password"];
}): Promise<
      | {
              accessToken: string;
              refreshToken: string;
        }
      | never
> => {
      let user = await findUser({ email });

      if (!user) throw new NotFoundError("User not found");

      let isValidPassword = user.comparePassword(password);

      if (!isValidPassword) throw new UnauthorizedError("Wrong password");

      let accessToken = user.signAccessToken();
      let refreshToken = await user.signRefreshToken();

      return {
            accessToken,
            refreshToken,
      };
};

export let deleteAllUsers = async () => {
      return User.deleteMany({});
};
