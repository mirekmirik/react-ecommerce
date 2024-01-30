import { Button, Card, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import { CartProduct } from "../../context/CartContext";
import { Link } from "react-router-dom";

interface CartItemProps extends CartProduct {
  addToCart?: (item: CartProduct) => void;
  removeFromCart?: (index: number) => void;
  toggleShowCart?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  category,
  creationAt,
  description,
  id,
  images,
  price,
  quantity,
  title,
  updatedAt,
  addToCart,
  removeFromCart,
  toggleShowCart,
}) => {
  const item: CartProduct = {
    category,
    creationAt,
    description,
    id,
    images,
    price,
    quantity,
    title,
    updatedAt,
  };

  return (
    <Flex align="center" gap={10}>
      <Link to={`/products/${id}`} onClick={() => toggleShowCart?.()}>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={images[0]} height={100} />}
        >
          <Meta title={title} />
          <p>
            Price: {price}$ x {quantity}
          </p>
          <p style={{ fontWeight: 800, fontSize: 18 }}>
            Total: {price * quantity}$
          </p>
        </Card>
      </Link>
      {!addToCart || !removeFromCart ? null : (
        <Card>
          <Flex justify="center" vertical gap={5}>
            <Button type="primary" onClick={() => addToCart(item)}>
              +
            </Button>
            <Button type="primary" onClick={() => removeFromCart(id)}>
              -
            </Button>
          </Flex>
        </Card>
      )}
    </Flex>
  );
};

export default CartItem;
