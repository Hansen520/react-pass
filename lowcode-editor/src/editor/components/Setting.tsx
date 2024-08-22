/*
 * @Date: 2024-08-20 15:47:42
 * @Description: description
 */
import React from "react";
import { useComponentsStore } from "../stores/components";
import { Segmented } from "antd";
import { useState } from "react";
import { ComponentAttr } from "./ComponentAttr";
import { ComponentEvent } from "./ComponentEvent";
import { ComponentStyle } from "./ComponentStyle";

export function Setting() {
  const { curComponentId } = useComponentsStore();

  const [key, setKey] = useState<string>("属性");

  if (!curComponentId) return null;

  return (
    <div>
      <Segmented value={key} onChange={setKey} block options={["属性", "样式", "事件"]} />
      <div className="pt-[20px]">
        {key === "属性" && <ComponentAttr />}
        {key === "样式" && <ComponentStyle />}
        {key === "事件" && <ComponentEvent />}
      </div>
    </div>
  );
}
