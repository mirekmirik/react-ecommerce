import { Flex, Menu, MenuProps } from "antd";
import { Category } from "../../api/Categories/type";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import Auth from "../Auth/Auth";

interface NavbarProps {
  categories: Category[];
  onChange?: (pickedCategory: string) => void;
  pickedCategory: string;
}

const Navbar: React.FC<NavbarProps> = ({
  categories,
  onChange,
  pickedCategory,
}) => {
  const homeItem = {
    label: (
      <Link onClick={() => onChange?.("all")} to={`/`}>
        Home
      </Link>
    ),
    key: "all",
  };

  const items: MenuProps["items"] = categories.map((category) => {
    const categoryId = category.id.toString();
    return {
      label: (
        <Link
          onClick={() => onChange?.(categoryId)}
          to={`/products/category/${categoryId}`}
        >
          {category.name}
        </Link>
      ),
      key: category.id,
    };
  });

  return (
    <>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[pickedCategory]}
        items={[homeItem, ...items]}
        style={{ flex: 1, minWidth: 0 }}
      />
      <Flex gap={10} align="center">
        <Cart />
        <Auth />
      </Flex>
    </>
  );
};

export default Navbar;
