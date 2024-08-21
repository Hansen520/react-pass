/*
 * @Date: 2024-08-20 15:47:35
 * @Description: 编辑区域
 */
import React, { useEffect, ReactNode, createElement } from "react";
import { Component, useComponentsStore } from "../stores/components";
import { useComponentConfigStore } from "../stores/component-config";

export function EditArea() {
  const { components, addComponent, deleteComponent, updateComponentProps } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  useEffect(() => {
  //   addComponent(
  //     {
  //       id: 222,
  //       name: "Container",
  //       props: {},
  //       children: [],
  //     },
  //     1
  //   );

  //   addComponent({
  //     id: 333,
  //     name: 'Button',
  //     props: {
  //         text: '这是一段按钮的文本域'
  //     },
  //     children: []
  // }, 222);

    // setTimeout(() => {
    //   deleteComponent(333);
    // }, 3000);

    // updateComponentProps(222, {
    //   window: 'OS',
    //   title: 'Hello World',

    // });
  }, []);
  console.log(components, 42);

  /* 递归渲染组件 */
  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
        const config = componentConfig?.[component.name]

        if (!config?.component) {
            return null;
        }
        console.log(config.component, 51);
        
        return createElement(
            config.component,
            {
                key: component.id,
                id: component.id,
                name: component.name,
                ...config.defaultProps,
                ...component.props,
            },
            renderComponents(component.children || [])
        )
    })
}

  return (
    <div className="h-[100%]">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
    </div>
  );
}
