import { useAuthContext } from "../../context/AuthContext";
import { Avatar, Dropdown, Flex, MenuProps } from "antd";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";


const Auth = () => {
  const { toggleShowModal, user, form, logOut } = useAuthContext();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={"/orders"}>My orders</Link>,
    },
    {
      key: "2",
      label: <Link to={"/settings"}>Settings</Link>,
    },
    {
      key: "3",
      label: (
        <Link to={"/"} onClick={logOut}>
          Log out
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div
        onClick={!user ? () => toggleShowModal() : undefined}
        style={{
          color: "white",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {user ? (
          <>
            <Dropdown placement="bottom" arrow menu={{ items }}>
              <Flex align="center" gap={5}>
                <p style={{ cursor: "pointer" }}>{user.name}</p>
                <Avatar src={user.avatar} alt={user.name} />
              </Flex>
            </Dropdown>
          </>
        ) : (
          <p style={{ cursor: "pointer" }}>Login</p>
        )}

        {/* {user && (
          <Avatar
            src={user?.avatar}
            alt="avatar"
            icon={!user.avatar ? <UserOutlined /> : null}
          />
        )} */}
      </div>
      {form === "login" ? <Login /> : <Register />}
    </div>
  );
};

export default Auth;
