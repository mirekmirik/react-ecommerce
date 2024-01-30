import { Category } from "./type";

type ParamsGetCategories = { limit: number };
type GetFetchCategories = ({
  limit,
}: ParamsGetCategories) => Promise<Category[]>;

export const getFetchCategories:GetFetchCategories = async ({ limit }) => {
  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/categories?limit=${limit}`
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const categories = await response.json();
    return categories;
  } catch (err: any) {
    throw err.message;
  }
};
