import "./App.css";
import { useEffect, useState } from "react";
import { Layout, theme } from "antd";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { getFetchCategories } from "../api/Categories/Categories";
import { Category } from "../api/Categories/type";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { OrderProvider } from "../context/OrderContext";

function App() {
  const params = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [pickedCategory, setPickedCategory] = useState(
    params.categoryId || "all"
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getFetchCategories({ limit: 100 });
        if (!response) {
          throw new Error(response);
        }
        setCategories(response);
      } catch (err: any) {
        toast.error(err);
      }
    };
    getCategories();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Bounce}
            theme="light"
          />
          <Layout style={{ minHeight: "100%", height: "auto" }}>
            <Header style={{ display: "flex", alignItems: "center" }}>
              <Navbar
                categories={categories}
                onChange={(categoryId) => setPickedCategory(categoryId)}
                pickedCategory={pickedCategory}
              />
            </Header>

            <Content style={{ padding: "0 48px" }}>
              <div
                style={{
                  background: colorBgContainer,
                  minHeight: 280,
                  padding: 24,
                  height: "auto",
                  borderRadius: borderRadiusLG,
                }}
              >
                <Outlet />
              </div>
            </Content>

            <Footer style={{ textAlign: "center" }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
