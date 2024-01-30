import { Order } from "../../api/Order/type";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return orders.map((order) => <OrderItem key={order.orderId} order={order} />);
};

export default OrderList;
