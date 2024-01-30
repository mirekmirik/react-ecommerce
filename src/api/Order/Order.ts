import { Order } from "./type";

type ParamsFetchCreateOrder = Omit<Order, "orderId">;

type PostFetchCreateOrder = ({
  cartItems,
  totalSum,
  userData,
}: ParamsFetchCreateOrder) => Promise<Order>;

export const postFetchCreateOrder: PostFetchCreateOrder = async ({
  cartItems,
  totalSum,
  userData,
}) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const orderId = Math.random();
    return { cartItems, totalSum, userData, orderId };
  } catch (err) {
    throw "Something went wrong...";
  }
};

export const getFetchOrder = async (orderId: number, orders: Order[]) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const order = orders.find((order) => order.orderId === orderId);
    if (!order) {
      throw new Error(`This order isn't exist`);
    }
    return order;
  } catch (err) {
    throw err;
  }
};

export const getAllFetchOrders = async (userId: number, orders: Order[]) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const findOrders = orders.filter(
      (order) => order.userData.userId === userId
    );
    if (!findOrders) {
      return null;
    }
    return findOrders;
  } catch (err) {
    throw err;
  }
};
