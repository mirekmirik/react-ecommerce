import { COMMERCE_API } from "../../constants/constants";
import { getFetchTokenLogin } from "../Auth/Auth";
import { User } from "./type";

type ParamsGetFetchProfile = { email: string; password: string };

type GetFetchProfile = ({
  email,
  password,
}: ParamsGetFetchProfile) => Promise<User>;

export const getFetchProfile: GetFetchProfile = async ({ email, password }) => {
  try {
    const access_token = await getFetchTokenLogin({ email, password });

    const response = await fetch(`${COMMERCE_API}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const user = await response.json();
    return user;
  } catch (err: any) {
    throw err.message;
  }
};

type ParamsPostCreateUser = Omit<User, "id" | "role">;

type PostFetchCreateUser = ({
  email,
  password,
  avatar,
  name,
}: ParamsPostCreateUser) => Promise<User>;

export const postFetchCreateUser: PostFetchCreateUser = async ({
  avatar,
  email,
  name,
  password,
}) => {
  try {
    const response = await fetch(`${COMMERCE_API}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
        email,
        name,
        password,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    throw err.message
    // throw new Error(err.message);
  }
};
