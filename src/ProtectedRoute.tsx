import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, toggleShowModal } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to login if not authenticated
      toggleShowModal();
    }
  }, [user]);
  if (!user) return null;

  return children;
};

export default ProtectedRoute;
