import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product } from "../api/Products/type";

const CartContext = createContext({
  cartItems: [] as CartProduct[],
  addToCart: (item: Product) => {},
  removeFromCart: (index: number) => {},
  toggleShowCart: () => {},
  isShowCart: false,
});

export type CartProduct = Product & {
  quantity: number;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  
  const storagedCart = useMemo(() => {
    const storageCart = localStorage.getItem("cart");
    if (storageCart) {
      const cart = JSON.parse(storageCart);
      return cart;
    }
  }, [localStorage.getItem("cart")]);

  const [cartItems, setCartItems] = useState<CartProduct[]>(storagedCart || []);
  const [isShowCart, setShowCart] = useState(false);

  // useEffect(() => {
  //   const storagedCart = localStorage.getItem("cart");
  //   if (storagedCart) {
  //     const cart = JSON.parse(storagedCart);
  //     setCartItems(cart);
  //   } else {
  //     setCartItems([]);
  //   }
  // }, [localStorage.getItem("cart")]);

  const addToCart = (item: Product) => {
    const foundItemIdx = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const currentItems = [...cartItems];
    if (foundItemIdx >= 0) {
      let current = currentItems[foundItemIdx];
      currentItems[foundItemIdx] = {
        ...current,
        quantity: current.quantity + 1,
      };
    } else {
      currentItems.push({ ...item, quantity: 1 });
    }
    setCartItems(currentItems);
    localStorage.setItem("cart", JSON.stringify(currentItems));
  };

  const removeFromCart = (index: number) => {
    const foundItemIdx = cartItems.findIndex(
      (cartItem) => cartItem.id === index
    );
    let newCartItems = [...cartItems];
    const current = newCartItems[foundItemIdx];
    if (current.quantity === 1) {
      newCartItems = newCartItems.filter((cartItem) => cartItem.id !== index);
    } else {
      current.quantity = current.quantity - 1;
    }
    setCartItems(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const toggleShowCart = () => {
    setShowCart((prev) => !prev);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    toggleShowCart,
    isShowCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
