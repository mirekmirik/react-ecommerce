import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Order } from "../api/Order/type";
import { getFetchOrder } from "../api/Order/Order";
import { Spin, message } from "antd";
import { useOrderContext } from "../context/OrderContext";
import OrderItem from "../components/Orders/OrderItem";

const SuccessSubmitOrder = () => {
  const { orderId } = useParams();
  const { orders } = useOrderContext();
  const [order, setOrder] = useState<Order>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        const order = await getFetchOrder(Number(orderId), orders);
        setOrder(order);
      } catch (err: any) {
        message.error(err);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [orderId]);

  return loading ? (
    <Spin />
  ) : order?.cartItems.length ? (
    <div>
      <h1>Thanks for order!</h1>
      <OrderItem order={order} />
    </div>
  ) : null;
};

export default SuccessSubmitOrder;
