/*
 * @Date: 2024-09-10 17:28:13
 * @Description: description
 */
import React, { useRef } from "react";
import { Component, useComponentsStore } from "../stores/components";
import { useComponentConfigStore } from "../stores/component-config";
import { message } from "antd";
import { ActionConfig } from "./ActionModal";

export function Preview() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const componentRefs = useRef<Record<string, any>>({});

  const handleEvent = (component: Component) => {
    const props: Record<string, any> = {};

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      if (eventConfig) {
        props[event.name] = (...args: any[]) => {
          eventConfig?.actions?.forEach((action: ActionConfig) => {
            if (action.type === "goToLink" && action?.url) {
              window.location.href = action.url; // 链接跳转
            } else if (action.type === "showMessage" && action?.config) {
              if (action.config.type === "success") {
                message.success(action.config.text);
              } else if (action.config.type === "error") {
                message.error(action.config.text);
              }
            } else if (action.type === 'customJS') {
                // args 可以获取finish中拿到的参数
                const func = new Function('context', 'args', action.code); // 这个可以把字符串改为可执行的js运行代码
                func({
                    name: component.name,
                    props: component.props,
                    showMessage(content: string) {
                        message.success(content);
                    } /* context */
                }, args /* 为 args */); // 传参 
            } else if (action.type === 'componentMethod') {
              /* 这边是对内部prod里面暴露的方法进行执行 method */
              const component = componentRefs.current[action.config.componentId];

              if (component) {
                component[action.config.method]?.(...args);
              }
            }
          });
        };
      }
    });
    return props;
  };

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.prod) {
        return null;
      }

      return React.createElement(
        config.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ref: (ref: Record<string, any>) => { componentRefs.current[component.id] = ref },
          ...config.defaultProps,
          ...component.props,
          ...handleEvent(component),
        },
        renderComponents(component.children || [])
      );
    });
  }

  return <div>{renderComponents(components)}</div>;
}
