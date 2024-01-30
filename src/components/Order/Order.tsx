import { Divider, Flex } from "antd";
import { CartProduct } from "../../context/CartContext";
import OrderForm from "./OrderForm";
import { User } from "../../api/User/type";
import CartList from "../Cart/CartList";

interface OrderProps {
  cartItems: CartProduct[];
  user: User;
  totalSum: number;
}

const Order: React.FC<OrderProps> = ({ cartItems, totalSum, user }) => {
  return (
    <Flex vertical>
      <Flex gap={10}>
        <CartList cartItems={cartItems} />
      </Flex>
      <p style={{ fontWeight: 700, fontSize: 24 }}>Total sum: {totalSum}$</p>
      <Divider />
      <OrderForm user={user} cartItems={cartItems} totalSum={totalSum} />
    </Flex>
  );
};

export default Order;
