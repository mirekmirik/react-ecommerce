import { Button, Divider, Drawer, Flex } from "antd";
import { useCartContext } from "../../context/CartContext";
import CartList from "./CartList";
import NoCartItems from "./NoCartItems";
import { useMemo } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems, removeFromCart, toggleShowCart, isShowCart } =
    useCartContext();
  const { user, toggleShowModal } = useAuthContext();

  const totalSum = useMemo(() => {
    if (cartItems.length) {
      const sumOfItems = cartItems.map(
        (cartItem) => cartItem.price * cartItem.quantity
      );
      const totalSum = sumOfItems.reduce((acc, val) => acc + val);
      return totalSum;
    }
  }, [cartItems]);

  const onSubmitOrder = () => {
    if (!user) {
      toggleShowModal();
      toggleShowCart();
      return;
    }
    navigate("/order", {
      state: {
        cartItems,
        user,
        totalSum,
      },
    });
    toggleShowCart();
  };

  return (
    <>
      <div
        style={{
          background: "black",
          color: "white",
          borderRadius: "50%",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <p onClick={toggleShowCart}>
          Cart {cartItems.length ? `(${cartItems.length} items)` : null}{" "}
        </p>
      </div>
      <Drawer
        title="Cart"
        placement={"right"}
        closable={false}
        onClose={toggleShowCart}
        open={isShowCart}
        key={"right"}
      >
        {!cartItems.length ? (
          <NoCartItems />
        ) : (
          <>
            <CartList
              cartItems={cartItems}
              addToCart={addToCart}
              toggleShowCart={toggleShowCart}
              removeFromCart={removeFromCart}
            />
            <Divider />
            <Flex align="center" gap={10} vertical>
              <p style={{ fontWeight: 700, fontSize: 24 }}>
                Total sum: {totalSum}$
              </p>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={onSubmitOrder}
              >
                Order
              </Button>
            </Flex>
          </>
        )}
      </Drawer>
    </>
  );
};

export default Cart;
