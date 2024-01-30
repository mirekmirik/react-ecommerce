import { Flex, Input, Modal, Space, message } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { postFetchCreateUser } from "../../api/User/User";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import UploadButton from "./UploadButton";
import { Link } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
  name: string;
  avatar: string | null;
}

const Register = () => {
  const { isShowModal, toggleShowModal, toggleForm } = useAuthContext();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    name: "",
    avatar: null,
  });

  const onChangeFormValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const createUser = async () => {
    const { email, password, name, avatar } = formValues;
    try {
      setConfirmLoading(true);
      await postFetchCreateUser({
        email,
        password,
        avatar,
        name,
      });
      message.success("You have succesfully registered!");
      toggleForm();
    } catch (err: any) {
      console.error(err);
      message.error(err);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Register"
      centered
      open={isShowModal}
      onCancel={() => toggleShowModal()}
      onOk={() => createUser()}
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
          <p style={{ fontWeight: 600 }}>
            Password must be at least 4 symbols and contains letters and numbers
          </p>
          <Input.Password
            placeholder="Input password"
            name="password"
            onChange={onChangeFormValues}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Flex>
        <Flex vertical>
          <p>Name</p>
          <Input
            placeholder="Input name"
            name="name"
            onChange={onChangeFormValues}
          />
        </Flex>
        <Flex gap={5} vertical>
          <p>Avatar</p>
          <UploadButton
            onChange={(file) =>
              setFormValues((prev) => ({ ...prev, avatar: file.location }))
            }
          />
        </Flex>
        <div>
          <Link to={"#"} onClick={toggleForm}>
            Have you already registered? Log in
          </Link>
        </div>
      </Space>
    </Modal>
  );
};

export default Register;
