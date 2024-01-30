import { Button, Card, Divider } from "antd";
import { Product } from "../../api/Products/type";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

interface ProductItemProps extends Product {}

const ProductItem: React.FC<ProductItemProps> = ({
  category,
  creationAt,
  description,
  id,
  images,
  price,
  title,
  updatedAt,
}) => {
  const { addToCart } = useCartContext();

  const product: Product = {
    category,
    creationAt,
    description,
    id,
    images,
    price,
    title,
    updatedAt,
  };

  if (images[0][0] === "[") {
    return null;
  }

  const handleAddTocart = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/products/${id}`}>
      <Card
        title={title || "Product"}
        hoverable
        style={{ width: 240, height: "inherit" }}
        cover={<img alt={title} src={images[0]} />}
      >
        <p>Product №{id}</p>
        <Meta title={category.name || "Category"} />
        <Divider></Divider>
        <h2>Price: {price}$</h2>
        <Button type="primary" onClick={handleAddTocart}>
          BUY
        </Button>
      </Card>
    </Link>
  );
};

export default ProductItem;
