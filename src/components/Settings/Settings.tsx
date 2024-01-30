import React, { useState } from "react";
import { Button, Flex, Form, Input, message } from "antd";
import { User } from "../../api/User/type";
import FileUpload from "../Auth/UploadButton";
import { updateFetchUser } from "../../api/Settings/Settings";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */


interface SettingsProps {
  user: User;
  addUser: (user: User) => void;
}

interface FormValues {
  email: string;
  password: string;
  name: string;
  avatar: string | null;
}

const Settings: React.FC<SettingsProps> = ({ user, addUser }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: user.email,
    password: user.password,
    name: user.name,
    avatar: user.avatar,
  });

  const onChangeFormFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      const updatedUser = await updateFetchUser(user.id, formValues);
      setFormValues(updatedUser);
      addUser(updatedUser);
      message.success("User has been succesfully update");
    } catch (err: any) {
      message.error(err);
    }
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
      onSubmitCapture={onSubmit}
    >
      <Form.Item name={["user", "name"]} label="Name">
        <Input
          onChange={onChangeFormFields}
          name="name"
          value={formValues.name}
          defaultValue={formValues.name}
        />
      </Form.Item>
      <Form.Item name={["user", "password"]} label="Password">
        <Input onChange={onChangeFormFields} name="password" />
      </Form.Item>
      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[{ type: "email" }]}
      >
        <Input
          name="email"
          onChange={onChangeFormFields}
          value={formValues.email}
          defaultValue={formValues.email}
        />
      </Form.Item>
      <Form.Item>
        <Flex gap={10} vertical>
          <h1>Avatar</h1>
          <FileUpload
            onChange={(file) =>
              setFormValues((prev) => ({ ...prev, avatar: file.location }))
            }
          />
        </Flex>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Settings;
