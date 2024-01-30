import { Button, Col, Divider, Flex, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFetchProductById } from "../api/Products/Products";
import ProductCard from "../components/Product/Product";
import { Product } from "../api/Products/type";
import { toast } from "react-toastify";
import NotProduct from "../components/Product/NotProduct";
import SkeletonProductCard from "../components/Skeleton/SkeletonProductCard";
import BreadcrumbList from "../components/Breadcrumb/Breadcrumb";
import { useCartContext } from "../context/CartContext";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
  const { addToCart } = useCartContext();
  if (!productId) return null;

  useEffect(() => {
    const getProductById = async () => {
      try {
        setLoading(true);
        const response = await getFetchProductById({ id: productId });
        setProduct(response);
        setInitialFetchComplete(true);
      } catch (err: any) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      getProductById();
    }

    // Clean up function
    return () => {
      setInitialFetchComplete(false);
      setLoading(false);
    };
  }, [productId]);

  if (loading) {
    return <SkeletonProductCard />;
  }

  if (initialFetchComplete && !loading && !product?.id) {
    return <NotProduct />;
  }

  return (
    initialFetchComplete &&
    product && (
      <>
        <BreadcrumbList
          items={[
            {
              name: `${product.category?.name || ""}`,
              href: `/products/category/${product.category?.id || ""}`,
            },
            {
              name: `${product.title || ""}`,
            },
          ]}
        />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <ProductCard product={product} />
          </Col>
          <Col span={12}>
            <Flex vertical>
              <h1>{product.title}</h1>
              <Divider />
              <p>{product.description}</p>
            </Flex>
            <Typography.Title level={2}>
              Price: ${product.price}
            </Typography.Title>
            <Button type="primary" onClick={() => addToCart(product)}>
              BUY
            </Button>
          </Col>
        </Row>
      </>
    )
  );
};

export default ProductPage;
