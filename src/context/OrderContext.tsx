import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { Order } from "../api/Order/type";

type OrderContextProps = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

const OrderContext = createContext<OrderContextProps>({
  orders: [],
  // @ts-ignore
  addOrder(order) {},
});

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const storagedOrders = useMemo(() => {
    const storageOrders = localStorage.getItem("orders");
    if (storageOrders) {
      const orders = JSON.parse(storageOrders);
      return orders;
    }
  }, [localStorage.getItem("orders")]);

  const [orders, setOrders] = useState<Order[]>(storagedOrders || []);

  const addOrder = (order: Order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
  };

  const contextValue = {
    orders,
    addOrder,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  return useContext(OrderContext);
};
