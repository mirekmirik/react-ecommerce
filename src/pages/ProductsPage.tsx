import { useEffect, useRef, useState } from "react";
import Products from "../components/Products/Products";
import { Product } from "../api/Products/type";
import {
  ParamsGetProductsByFilter,
  getFetchProducts,
  getFetchProductsByFilter,
} from "../api/Products/Products";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Card, Flex, InputNumber, Pagination } from "antd";
import NotProducts from "../components/Products/NotProducts";
import BreadcrumbList from "../components/Breadcrumb/Breadcrumb";
import SkeletonList from "../components/Skeleton/SkeletonList";

enum Filters {
  Price = "price",
  PriceMax = "price_max",
  PriceMin = "price_min",
  Title = "title",
  Category = "categoryId",
}

const initialFilters = (products: Product[] = [], categoryId?: string) => {
  const prices = products.map((product) => product.price);
  const priceMin = prices.length ? String(Math.min(...prices)) : "";
  const priceMax = prices.length ? String(Math.max(...prices)) : "";

  return {
    categoryId: Number(categoryId),
    price: "",
    price_max: priceMax,
    price_min: priceMin,
    title: "",
  };
};

const limit = 5;
const ProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<ParamsGetProductsByFilter>({});
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);
  const isWasTypingRef = useRef(false);

  // the problem of API is that there are no pictures of the some products, so i delete products without them
  const deleteItemsWithoutImage = (products: Product[]) => {
    const items = products.filter((product) => product.images[0][0] !== "[");
    return items;
  };

  const getItemsPagination = (
    products: Product[],
    offset: number,
    limit: number
  ) => {
    const startIndex = offset * limit;
    const endIndex = startIndex + limit;
    const itemsSlice = products.slice(startIndex, endIndex);
    return itemsSlice;
  };

  const getCategoryName = (products: Product[], categoryId: number) => {
    if (categoryId) {
      const currentCategory = products.find(
        (product) => product.category.id === categoryId
      );
      const currentCategoryName = currentCategory?.category.name;
      return currentCategoryName;
    }
    return null;
  };

  useEffect(() => {
    const fetchInitialProducts = async () => {
      setLoading(true);
      const params = { categoryId: Number(categoryId) };
      try {
        const response = categoryId
          ? await getFetchProductsByFilter(params) // Use initial filter if available
          : await getFetchProducts({});

        if (!response) {
          throw new Error(response);
        }
        const newItems = deleteItemsWithoutImage(response);
        setProducts(newItems);
        setFilter(initialFilters(newItems, categoryId));
      } catch (error: any) {
        toast.error(error);
      } finally {
        setInitialFetchComplete(true);
        setLoading(false);
      }
    };

    fetchInitialProducts();

    return () => {
      isWasTypingRef.current = false;
      setOffset(0);
    };
  }, [categoryId]);

  // Use a separate useEffect to handle filter changes
  useEffect(() => {
    const fetchProductsByFilter = async () => {
      setLoading(true);
      try {
        const response = await getFetchProductsByFilter(filter);
        const newItems = deleteItemsWithoutImage(response);
        setProducts(newItems);
        setOffset(0);
      } catch (error: any) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    isWasTypingRef.current && fetchProductsByFilter();
  }, [filter]);

  const onChangeFilters = (type: Filters, value: number | string) => {
    isWasTypingRef.current = true;
    setFilter((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <>
      <BreadcrumbList
        items={[{ name: getCategoryName(products, Number(categoryId)) || "" }]}
      />
      <Card style={{ marginBottom: "10px" }}>
        <Flex gap={10}>
          <InputNumber
            addonBefore="Fixed price"
            addonAfter="$"
            placeholder="Price"
            disabled={!products.length}
            value={filter.price}
            onChange={(value) =>
              onChangeFilters(Filters.Price, value as string)
            }
          />
          <InputNumber
            addonBefore="Min price"
            addonAfter="$"
            placeholder="Min price"
            disabled={!products.length}
            value={filter.price_min}
            onChange={(value) =>
              onChangeFilters(Filters.PriceMin, value as string)
            }
          />
          <InputNumber
            addonBefore="Max price"
            addonAfter="$"
            placeholder="Max price"
            disabled={!products.length}
            value={filter.price_max}
            onChange={(value) =>
              onChangeFilters(Filters.PriceMax, value as string)
            }
          />
        </Flex>
      </Card>
      <Flex wrap="wrap" vertical gap={10}>
        {loading ? (
          <Flex gap={10} wrap="wrap">
            <SkeletonList countItems={5} />
          </Flex>
        ) : !products.length && initialFetchComplete ? (
          <NotProducts />
        ) : (
          <>
            <Flex wrap="wrap" gap={10}>
              <Products
                products={getItemsPagination(products, offset, limit)}
                loading={loading}
              />
            </Flex>
            <Pagination
              total={products.length}
              pageSize={limit}
              current={offset + 1}
              showTotal={(total) => `Total ${total} items`}
              onChange={(page) => setOffset(page - 1)}
              defaultCurrent={1}
            />
          </>
        )}
      </Flex>
    </>
  );
};

export default ProductsPage;
