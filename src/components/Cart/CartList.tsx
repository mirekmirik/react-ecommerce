import { CartProduct } from "../../context/CartContext";
import CartItem from "./CartItem";
import { Product } from "../../api/Products/type";

interface CartListProps {
  cartItems: CartProduct[];
  addToCart?: (item: Product) => void;
  removeFromCart?: (id: number) => void;
  toggleShowCart?: () => void
}

const CartList: React.FC<CartListProps> = ({
  cartItems,
  addToCart,
  removeFromCart,
  toggleShowCart
}) => {
  return cartItems.map((cartItem) => (
    <CartItem
      {...cartItem}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      toggleShowCart={toggleShowCart}
    />
  ));
};

export default CartList;
