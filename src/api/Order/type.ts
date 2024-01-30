import { CartProduct } from "../../context/CartContext";

type UserDataOrder = {
  userId: number;
  phoneNumber: number;
  address: string;
  name: string;
};

export type Order = {
  orderId: number;
  totalSum: number;
  cartItems: CartProduct[];
  userData: UserDataOrder;
};
