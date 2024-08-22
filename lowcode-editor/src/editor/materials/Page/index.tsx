/*
 * @Date: 2024-08-20 17:35:57
 * @Description: page组件
 */
import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";


function Page({ id, name, children }: CommonComponentProps) {

  const { canDrop, dropRef } = useMaterialDrop(["Button", "Container"], id);

  return (
    <div
      data-component-id={id}
      ref={dropRef}
      className="p-[20px] h-[100%] box-border"
      style={{
        border: canDrop ? "2px solid red" : "none",
      }}
    >
      {children}
    </div>
  );
}

export default Page;
