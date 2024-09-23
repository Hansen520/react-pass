/*
 * @Date: 2024-08-21 11:14:50
 * @Description: description
 */
import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../stores/component-config";
import { getComponentById, useComponentsStore } from "../stores/components";

export interface ItemType {
  type: string;
  dragType?: "move" | "add";
  id: number;
}

export function useMaterialDrop(accept: string[], id: number) {
  const { addComponent, deleteComponent, components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, dropRef] = useDrop(() => ({
    accept, // 接受哪些组件
    drop: (item: ItemType, monitor) => {
      const didDrop = monitor.didDrop();
      // 防止已经拖拽过的组件目标重复拖拽，所以我们要精准拖拽
      if (didDrop) {
        return;
      }
      // move 组件的时候 就先delete再add
      if (item.dragType === "move") {
        const component = getComponentById(item.id, components)!;
        if (component.id === id) return;
        console.log(item.id);
        deleteComponent(item.id);

        addComponent(component, id);
      } else { // 如果是非移动组件，则直接添加
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
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));

  return { canDrop, dropRef };
}
