import { Card } from "antd";
import { useState } from "react";
import { Product } from "../../api/Products/type";

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const [images, setImages] = useState(product.images);

  const onChangeImage = (index: number) => {
    const updatedImages = [...images];
    const mainImage = updatedImages.splice(index, 1)[0];
    updatedImages.unshift(mainImage);
    setImages(updatedImages);
  };


  return (
    <Card
      style={{ minWidth: 300, maxWidth: 500 }}
      cover={<img alt={product.title} src={images[0]} />}
    >
      <Card.Grid style={{ width: "50%" }}>
        {images[1] && (
          <img
            alt={product.title}
            src={images[1]}
            width={"100%"}
            onClick={() => onChangeImage(1)}
          />
        )}
      </Card.Grid>
      <Card.Grid style={{ width: "50%" }}>
        {images[2] && (
          <img
            alt={product.title}
            src={images[2]}
            width={"100%"}
            onClick={() => onChangeImage(2)}
          />
        )}
      </Card.Grid>
    </Card>
  );
};

export default ProductCard;
