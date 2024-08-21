/*
 * @Date: 2024-08-20 17:35:57
 * @Description: description
 */
import { message } from "antd";
import { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import { useComponentsStore } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";
import { CommonComponentProps } from "../../interface";

function Page({ id, name, children }: CommonComponentProps) {
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, dropRef] = useDrop(() => ({
    accept: ["Button", "Container"],
    drop: (item: { type: string }) => {
      message.success(item.type);
      const props = componentConfig[item.type].defaultProps;
      addComponent({
        id: new Date().getTime(),
        name: item.type,
        props,
      }, id)
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
    hover: (item: { type: string }) => {
      console.log(item, 19);
    }
  }));

  return (
    <div
      ref={dropRef}
      className="p-[20px] h-[100%] box-border"
      style={{
        border: canDrop ? "2px solid blue" : "none",
      }}
    >
      
      {children}
    </div>
  );
}

export default Page;
