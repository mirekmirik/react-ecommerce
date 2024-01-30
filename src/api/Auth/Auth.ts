import { COMMERCE_API } from "../../constants/constants";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

type ParamsGetFetchTokenLogin = { email: string; password: string };

type GetFetchTokenLogin = ({
  email,
  password,
}: ParamsGetFetchTokenLogin) => Promise<string>;

export const getFetchTokenLogin: GetFetchTokenLogin = async ({
  email,
  password,
}) => {
  try {
    const response = await fetch(`${COMMERCE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const { access_token } = (await response.json()) as Tokens;
    return access_token;
  } catch (err: any) {
    throw err;
  }
};
