/*
 * @Date: 2024-06-03 15:42:55
 * @Description: description
 */
import { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { defineMessages, useIntl } from "react-intl";
import getMessage from './getMessage';




const messsages = defineMessages({
  username: {
    id: "username",
    defaultMessage: '用户名',
    description: '这是登录的用户名'
  },
  password: {
    id: "password",
    defaultMessage: '密码',
    description: '这是登录的密码'
  },
  rememberMe: {
    id: 'rememberMe',
    defaultMessage: '记住我',
    description: '登录页的记住我复选框'
  },
  submit: {
    id: 'submit',
    defaultMessage: '提交',
    description: '登录页的提交按钮'
  },
  inputYourUsername: {
    id: 'inputYourUsername',
    defaultMessage: '请输入用户名！',
    description: '登录页的用户名为空的提示'
  },
  inputYourPassword: {
    id: 'inputYourPassword',
    defaultMessage: '请输入密码！',
    description: '登录页的密码为空的提示'
  }
})
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};



const App: React.FC = () => {
  const intl = useIntl();

  useEffect(() => {
    setTimeout(() => {
      alert(getMessage());
    }, 500)
  }, [])
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label={intl.formatMessage(messsages.username)}
          name="username"
          rules={[{ required: true, message: intl.formatMessage(messsages.inputYourUsername) }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label={intl.formatMessage(messsages.password)}
          name="password"
          rules={[{ required: true, message: intl.formatMessage(messsages.inputYourPassword) }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>{intl.formatMessage(messsages.rememberMe)}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>
        日期：
        <div>{intl.formatDate(new Date(), { weekday: "long" })}</div>
        <div>{intl.formatDate(new Date(), { weekday: "short" })}</div>
        <div>{intl.formatDate(new Date(), { weekday: "narrow" })}</div>
        <div>{intl.formatDate(new Date(), { dateStyle: "full" })}</div>
        <div>{intl.formatDate(new Date(), { dateStyle: "long" })}</div>
      </div>
      <div>
        相对时间：
        <div>{intl.formatRelativeTime(200, "hour")}</div>
        <div>{intl.formatRelativeTime(-10, "minute")}</div>
      </div>
      <div>
        数字：
        <div>
          {intl.formatNumber(200000, {
            style: "currency",
            currency: intl.locale.includes('en') ? 'USD' : 'CNY',
          })}
        </div>
        <div>
          {intl.formatNumber(10000, {
            style: "unit",
            unit: "meter",
          })}
        </div>
      </div>
    </>
  );
};

export default App;
