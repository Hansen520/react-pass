/*
 * @Date: 2024-08-20 16:56:41
 * @Description: description
 */
import { create } from "zustand";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import PageDev from "../materials/Page/dev"; /* 用于编辑环境 */
import PageProd from "../materials/Page/prod"; /* 用于预览环境 */
import ModalDev from "../materials/Modal/dev"; /* 用于编辑环境 */
import ModalProd from "../materials/Modal/prod"; /* 用于预览环境 */

export interface ComponentSetter {
  name: string;
  label: string; // 属性的名称
  type: string;
  [key: string]: any;
}

export interface ComponentEvent {
  name: string;
  label: string;
}

export interface ComponentMethod {
  name: string;
  label: string;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[]; // 组件的属性配置
  stylesSetter?: ComponentSetter[]; // 组件的样式配置
  events?: ComponentEvent[]; // 组件的事件配置
  methods?: ComponentMethod[]; // 组件的方法配置
  // component: any;
  dev: any; // 开发环境下的组件()
  prod: any; // 生产环境下的组件(预览组件，比方说组件日期会跳出来)
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
      desc: "容器",
      dev: ContainerDev, // 拿到对应的组件做后续的渲染
      prod: ContainerProd,
    },

    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      desc: "按钮",
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        {
          name: "text",
          label: "文本",
          type: "input",
        },
      ],
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ],
      events: [
        {
          name: "onClick",
          label: "点击事件",
        },
        {
          name: "onDoubleClick",
          label: "双击事件",
        },
      ],
      dev: ButtonDev, // 拿到对应的组件做后续的渲染
      prod: ButtonProd,
    },
    Modal: {
      name: "Modal",
      defaultProps: {
        title: "弹窗",
      },
      setter: [
        {
          name: "title",
          label: "标题",
          type: "input",
        },
      ],
      stylesSetter: [],
      events: [
        {
          name: "onOk",
          label: "确认事件",
        },
        {
          name: "onCancel",
          label: "取消事件",
        },
      ],
      methods: [
        {
          name: "open",
          label: "打开弹窗",
        },
        {
          name: "close",
          label: "关闭弹窗",
        },
      ],
      desc: "弹窗",
      dev: ModalDev,
      prod: ModalProd,
    },
    Page: {
      name: "Page",
      defaultProps: {},
      desc: "页面",
      dev: PageDev, // 拿到对应的组件做后续的渲染
      prod: PageProd,
    },
  },
  /* 注册新的组件 */
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
