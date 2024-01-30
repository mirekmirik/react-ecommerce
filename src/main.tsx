import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App/App";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import ProtectedRoute from "./ProtectedRoute";
import SuccessSubmitOrder from "./pages/SuccessSubmitOrder";
import OrdersPage from "./pages/OrdersPage";
import SettingsPage from "./pages/SettingsPage";

// Wrap your routing logic inside a component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: "/products/category/:categoryId",
        element: <ProductsPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
      },
      {
        path: "/order",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/success/:orderId",
        element: (
          <ProtectedRoute>
            <SuccessSubmitOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
