/*
 * @Date: 2024-08-22 16:52:14
 * @Description: description
 */
import { Form, Input, InputNumber, Select } from "antd";
import { CSSProperties, useEffect } from "react";
import { useComponentsStore } from "../stores/components";
import { ComponentSetter, useComponentConfigStore } from "../stores/component-config";
import CssEditor from "./CssEditor";
import { debounce } from "lodash-es";

export function ComponentStyle() {
  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.styles });
  }, [curComponent]);

  if (!curComponentId || !curComponent) return null;

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === "select") {
      return <Select options={options} />;
    } else if (type === "input") {
      return <Input />;
    } else if (type === "inputNumber") {
      return <InputNumber />;
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
    }
  }

  const handleEditorChange = debounce((valiue) => {
    console.log(valiue);
  }, 500);

  return (
    <Form form={form} onValuesChange={valueChange} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor value={`.comp{\n\n}`} onChange={handleEditorChange} />
      </div>
    </Form>
  );
}
