/*
 * @Date: 2024-08-21 11:14:50
 * @Description: description
 */
import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { useComponentsStore } from "../stores/components";

export function useMaterialDrop(accept: string[], id: number) {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, dropRef] = useDrop(() => ({
    accept, // 接受哪些组件
    drop: (item: { type: string }, monitor) => {
      const didDrop = monitor.didDrop();
      // 防止已经拖拽过的组件目标重复拖拽，所以我们要精准拖拽
      if (didDrop) {
        return;
      }

      // const props = componentConfig[item.type].defaultProps;
      const config = componentConfig[item.type];
      /* 往页面上增加组件 */
      addComponent(
        {
          id: new Date().getTime(),
          name: item.type,
          desc: config.desc,
          props: config.defaultProps,
          // styles: {
          //   background: "green",
          // },
        },
        id
      );
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, dropRef };
}
