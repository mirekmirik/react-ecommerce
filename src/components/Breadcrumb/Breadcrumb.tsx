import { Breadcrumb, BreadcrumbItemProps } from "antd";
import { Link, To } from "react-router-dom";

interface BreadcrumbListProps {
  items: {
    href?: string;
    name: string;
  }[];
}

const BreadcrumbList: React.FC<BreadcrumbListProps> = ({ items }) => {
  const homePage = { href: "/", name: "Home" };
  
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item href={homePage.href}>{homePage.name}</Breadcrumb.Item>
      {items.map((item, i) => (
        <Breadcrumb.Item key={i} href={item.href}>{item.name}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbList;
