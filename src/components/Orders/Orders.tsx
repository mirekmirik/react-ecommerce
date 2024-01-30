import { Order } from "../../api/Order/type";

import OrderList from "./OrderList";

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  return <OrderList orders={orders} />;
};

export default Orders;
