import ProductList from "./ProductList";
import { Product } from "../../api/Products/type";

interface ProductsProps {
  products: Product[];
  loading: boolean;
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return <ProductList products={products} />;
};

export default Products;
