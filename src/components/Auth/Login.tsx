import { Flex, Input, Modal, Space, message } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { getFetchProfile } from "../../api/User/User";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { addUser, isShowModal, toggleShowModal, toggleForm } =
    useAuthContext();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const onChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const getUser = async () => {
    const { email, password } = formValues;
    try {
      setConfirmLoading(true);
      const user = await getFetchProfile({ email, password });
      toggleShowModal();
      message.success("You have sucessfully log in");
      addUser(user);
    } catch (err: any) {
      message.error(err);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Login"
      centered
      open={isShowModal}
      onCancel={() => toggleShowModal()}
      onOk={() => getUser()}
      confirmLoading={confirmLoading}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Flex vertical>
          <p>Email</p>
          <Input
            placeholder="Input email"
            name="email"
            onChange={onChangeFormValues}
          />
        </Flex>
        <Flex vertical>
          <p>Password</p>
          <Input.Password
            placeholder="Input password"
            name="password"
            onChange={onChangeFormValues}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Flex>
        <div>
          <Link to={"#"} onClick={toggleForm}>
            Haven't registered yet? Register
          </Link>
        </div>
      </Space>
    </Modal>
  );
};

export default Login;
