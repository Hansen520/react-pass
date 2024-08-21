/*
 * @Date: 2024-08-20 16:56:41
 * @Description: description
 */
import { create } from "zustand";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  component: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      component: Container, // 拿到对应的组件做后续的渲染
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: '按钮'
      },
      component: Button,
    },
    Page: {
      name: 'Page',
      defaultProps: {},
      component: Page
  }
  
  },
  /* 注册新的组件 */
  registerComponent: (name, componentConfig) => set((state) => {
    return {
      ...state,
      componentConfig: {
        ...state.componentConfig,
        [name]: componentConfig,
      }
    }
  })
}));
