import { useEffect, useState } from "react";
import Orders from "../components/Orders/Orders";
import { useOrderContext } from "../context/OrderContext";
import { Order } from "../api/Order/type";
import { getAllFetchOrders } from "../api/Order/Order";
import { useAuthContext } from "../context/AuthContext";
import { Spin, message } from "antd";
import NoOrders from "../components/Orders/NoOrders";

const OrdersPage = () => {
  const { orders } = useOrderContext();
  const { user } = useAuthContext();
  const [ordersByUser, setOrdersByUser] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
 


  // simulate server request
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setLoading(true);
        const ordersByUser = await getAllFetchOrders(user!.id, orders);
        if (!ordersByUser) {
          return message.warning("There are no orders");
        }
        setOrdersByUser(ordersByUser);
      } catch (err: any) {
        message.error(err);
      } finally {
        setLoading(false);
      }
    };
    getAllOrders();
  }, []);

  return loading ? (
    <Spin />
  ) : !ordersByUser.length ? (
    <NoOrders />
  ) : (
    <Orders orders={ordersByUser} />
  );
};

export default OrdersPage;
