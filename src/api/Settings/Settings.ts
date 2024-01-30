import { COMMERCE_API } from "../../constants/constants";
import { User } from "../User/type";

export type ParamsUpdateFetchUser = () => {
  userId: number;
  fields: Omit<User, "id | role">;
};

export type UpdateFetchUser = (
  userId: number,
  fields: Partial<Omit<User, "id" | "role">>
) => Promise<User>;

export const updateFetchUser: UpdateFetchUser = async (userId, fields) => {
  const { avatar, email, name, password } = fields;
  const url = `${COMMERCE_API}/users/${userId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
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
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (err: any) {
    throw err.message;
  }
};
