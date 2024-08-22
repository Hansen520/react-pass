/*
 * @Date: 2024-08-20 16:48:25
 * @Description: Container组件
 */
import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";

const Container = ({ id, children, styles }: CommonComponentProps) => {
  const { dropRef } = useMaterialDrop(["Button", "Container"], id);

  return (
    <div
      style={styles}
      data-component-id={id}
      ref={dropRef}
      className="border-[1px] border-[#000] min-h-[100px] p-[20px]"
    >
      {children}
    </div>
  );
};

export default Container;
