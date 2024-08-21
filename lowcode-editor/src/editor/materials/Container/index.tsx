/*
 * @Date: 2024-08-20 16:48:25
 * @Description: description
 */
// import { PropsWithChildren } from "react";
import { CommonComponentProps } from "../../interface";
// import { useComponentsStore } from "../../stores/components";
// import { useComponentConfigStore } from "../../stores/component-config";
// import { useDrop } from "react-dnd";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";

const Container = ({ id, children }: CommonComponentProps) => {
  // const { addComponent } = useComponentsStore();
  // const { componentConfig } = useComponentConfigStore();

  // const [{ canDrop }, dropRef] = useDrop(() => ({
  //   accept: ["Button", "Container"],
  //   drop: (item: { type: string }, monitor) => {
  //     const didDrop = monitor.didDrop();
  //     if (didDrop) {
  //       return;
  //     }

  //     const props = componentConfig[item.type].defaultProps;

  //     addComponent(
  //       {
  //         id: new Date().getTime(),
  //         name: item.type,
  //         props,
  //       },
  //       id
  //     );
  //   },
  //   collect: (monitor) => ({
  //     canDrop: monitor.canDrop(),
  //   }),
  // }));
  const { dropRef } = useMaterialDrop(["Button", "Container"], id);

  return (
    <div ref={dropRef} className="border-[1px] border-[#000] min-h-[100px] p-[20px]">
      {children}
    </div>
  );
};

export default Container;
