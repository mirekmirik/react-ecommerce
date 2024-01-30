import { COMMERCE_API } from "../../constants/constants";
import { Product } from "./type";

type ParamsGetProducts = { limit?: number; offset?: number };
type GetFetchProducts = ({
  limit,
  offset,
}: ParamsGetProducts) => Promise<Product[]>;

export const getFetchProducts: GetFetchProducts = async ({
  limit = 9999,
  offset = 0,
}) => {
  try {
    const url = `${COMMERCE_API}/products?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const products = await response.json();
    return products as Product[];
  } catch (err: any) {
    throw err.message;
  }
};

export type ParamsGetProductsByFilter = {
  title?: string;
  price_min?: string;
  price_max?: string;
  categoryId?: number;
  price?: string;
  offset?: number;
  limit?: number;
};

type GetFetchProductsByFilter = ({
  categoryId,
  price,
  price_max,
  price_min,
  title,
  offset,
  limit,
}: ParamsGetProductsByFilter) => Promise<Product[]>;

export const getFetchProductsByFilter: GetFetchProductsByFilter = async ({
  categoryId,
  price,
  price_max,
  price_min,
  title,
  offset = 0,
  limit = 9999,
}) => {
  let url = `${COMMERCE_API}/products/`;

  const queryParams = [];
  if (categoryId) queryParams.push(`categoryId=${categoryId}`);
  if (price) queryParams.push(`price=${price}`);
  if (price_max) queryParams.push(`price_max=${price_max}`);
  if (price_min) queryParams.push(`price_min=${price_min}`);
  if (title) queryParams.push(`title=${title}`);
  if (offset) queryParams.push(`offset=${offset}`);
  if (limit) queryParams.push(`limit=${limit}`);

  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  url += queryString;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const products = await response.json();
    return products as Product[];
  } catch (err: any) {
    throw err.message;
  }
};

export type ParamsGetProductById = {
  id: string;
};

type GetFetchProductById = ({ id }: ParamsGetProductById) => Promise<Product>;

export const getFetchProductById: GetFetchProductById = async ({ id }) => {
  const url = `${COMMERCE_API}/products/${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    const product = await response.json();
    return product as Product;
  } catch (err: any) {
    throw err.message;
  }
};
