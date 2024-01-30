import ProductItem from "./ProductItem";
import { Product } from "../../api/Products/type";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products,  }) => {
  return products.map((product) => {
    return (
      <ProductItem
        key={product.id}
        category={product.category}
        creationAt={product.creationAt}
        description={product.description}
        id={product.id}
        images={product.images}
        price={product.price}
        title={product.title}
        updatedAt={product.updatedAt}
      />
    );
  });
};

export default ProductList;
