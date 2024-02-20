import { Flex } from "antd";
import { Order } from "../../api/Order/type";
import CartList from "../Cart/CartList";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <div>
      <h1>Number of order: {order.orderId}</h1>
      <Flex gap={10}>
        <CartList cartItems={order.cartItems} />
      </Flex>
      <h3>Total amount: {order.totalSum}$</h3>
      <p>User data of order: </p>
      <ul>
        <li>Address: {order.userData.address}</li>
        <li>Name: {order.userData.name}</li>
        <li>Phone number: {order.userData.phoneNumber}</li>
      </ul>
    </div>
  );
};

export default OrderItem;
