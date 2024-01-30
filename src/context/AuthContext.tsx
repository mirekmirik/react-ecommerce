import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../api/User/type";

interface AuthContextProps {
  user: User | null;
  isShowModal: boolean;
  form: "login" | "register";
  addUser: (user: User) => void;
  logOut: () => void;
  toggleForm: () => void;
  toggleShowModal: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isShowModal: false,
  form: "login",
  addUser(user) {},
  toggleForm() {},
  logOut() {},
  toggleShowModal() {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storagedUser = useMemo(() => {
    const storageUser = localStorage.getItem("user");
    if (storageUser) {
      const user = JSON.parse(storageUser);
      return user;
    }
  }, [localStorage.getItem("user")]);

  const [user, setUser] = useState<User | null>(storagedUser || null);
  const [form, setForm] = useState<"login" | "register">("login");
  const [isShowModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const addUser = (user: User) => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
  };

  const toggleForm = () => {
    const newForm = form === "login" ? "register" : "login";
    setForm(newForm);
  };

  const contextValue: AuthContextProps = {
    user,
    isShowModal,
    form,
    toggleForm,
    toggleShowModal,
    addUser,
    logOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
