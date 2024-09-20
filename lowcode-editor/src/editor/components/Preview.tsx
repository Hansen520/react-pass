/*
 * @Date: 2024-09-10 17:28:13
 * @Description: description
 */
import React from "react";
import { Component, useComponentsStore } from "../stores/components";
import { useComponentConfigStore } from "../stores/component-config";
import { message } from "antd";
import { GoToLinkConfig } from "./actions/GoToLink";
import { ShowMessage, ShowMessageConfig } from "./actions/ShowMessage";
import { ActionConfig } from "./ActionModal";

export function Preview() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const handleEvent = (component: Component) => {
    const props: Record<string, any> = {};

    componentConfig[component.name].events?.forEach((event) => {
      const eventConfig = component.props[event.name];

      if (eventConfig) {
        props[event.name] = () => {
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
                const func = new Function('context', action.code); // 这个可以把字符串改为可执行的js运行代码
                func({
                    name: component.name,
                    props: component.props,
                    showMessage(content: string) {
                        message.success(content);
                    }
                });
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
