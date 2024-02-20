import React, { useState } from "react";
import { Button, Form, Input, Spin, message } from "antd";
import { User } from "../../api/User/type";
import { postFetchCreateOrder } from "../../api/Order/Order";
import { CartProduct } from "../../context/CartContext";
import { useOrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

interface OrderFormProps {
  user: User;
  cartItems: CartProduct[];
  totalSum: number;
}

type FormValuesOrder = {
  name: string;
  phoneNumber: number;
  address: string;
};

const OrderForm: React.FC<OrderFormProps> = ({ user, cartItems, totalSum }) => {
  const [formValues, setFormValues] = useState<FormValuesOrder>({
    address: "",
    name: user.name || '',
    phoneNumber: 0,
  });
  const { addOrder } = useOrderContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeFormValues = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    if (formValues.address && formValues.name && formValues.phoneNumber) {
      try {
        const params = {
          cartItems,
          totalSum,
          userData: { ...formValues, userId: user.id },
        };
        setLoading(true);
        const order = await postFetchCreateOrder(params);
        addOrder(order);
        message.success("Order has been succesfully confirmed!");
        navigate(`/order/success/${order.orderId}`);
      } catch (err: any) {
        message.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      message.error("You should fill all fields!");
    }
  };

  return (
    <Form
      {...formItemLayout}
      variant="filled"
      style={{ maxWidth: 600 }}
      onSubmitCapture={onSubmit}
    >
      <Form.Item label="Name" name="name">
        <Input
          defaultValue={user?.name}
          value={formValues.name}
          onChange={onChangeFormValues}
        />
      </Form.Item>

      <Form.Item label="Phone number" name="phoneNumber">
        <Input
          style={{ width: "100%" }}
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={onChangeFormValues}
        />
      </Form.Item>

      <Form.Item label="Address" name="address">
        <Input.TextArea
          name="address"
          value={formValues.address}
          onChange={onChangeFormValues}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {loading && <Spin />}
    </Form>
  );
};

export default OrderForm;
