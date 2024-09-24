/*
 * @Date: 2024-09-24 13:50:40
 * @Description: formProd
 */
import { Form as AntdForm, DatePicker, Input } from "antd";
import React, { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useMemo } from "react";
import { CommonComponentProps } from "../../interface";
import dayjs from "dayjs";

export interface FormRef {
  submit: () => void;
}

const Form: ForwardRefRenderFunction<FormRef, CommonComponentProps> = ({ children, onFinish }, ref) => {
  const [form] = AntdForm.useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        // 暴露给父组件的方法
        submit: () => {
          form.submit();
        },
      };
    },
    [form]
  );

  // 通过这个useMemo来获取子组件的属性的变化，很巧妙的一种办法
  const formItems = useMemo(() => {
    return React.Children.map(children, (item: any) => {
      return {
        label: item.props?.label,
        name: item.props?.name,
        type: item.props?.type,
        id: item.props?.id,
        rules: item.props?.rules,
      };
    });
  }, [children]);

  async function save(values: any) {
    Object.keys(values).forEach((key) => {
      if (dayjs.isDayjs(values[key])) {
        values[key] = values[key].format("YYYY-MM-DD");
      }
    });
    onFinish(values);
  }

  return (
    <AntdForm name="form" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} form={form} onFinish={save}>
      {formItems.map((item: any) => {
        return (
          <AntdForm.Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={
              item.rules === "required"
                ? [
                    {
                      required: true,
                      message: "不能为空",
                    },
                  ]
                : []
            }
          >
            {item.type === "input" && <Input />}
            {item.type === "date" && <DatePicker />}
          </AntdForm.Item>
        );
      })}
    </AntdForm>
  );
};

export default forwardRef(Form);
