import { useLocation, useNavigate } from "react-router-dom";
import { CartProduct } from "../context/CartContext";
import Order from "../components/Order/Order";
import { User } from "../api/User/type";
import { useEffect } from "react";

interface locationState {
  cartItems: CartProduct[];
  totalSum: number;
  user: User;
}

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null;
  }

  const { cartItems, totalSum, user } = location.state as locationState;

  return <Order cartItems={cartItems} totalSum={totalSum} user={user} />;
};

export default OrderPage;
