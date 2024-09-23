/*
 * @Date: 2024-08-20 16:48:25
 * @Description: Container组件
 */
import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "../../hooks/useMaterialDrop";
import { useDrag } from "react-dnd";
import { useEffect, useRef } from "react";

const Dev = ({ id, name, children, styles }: CommonComponentProps) => {
  const { canDrop, dropRef } = useMaterialDrop(["Button", "Container", "Table"], id);
  
  const divRef = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
      dragType: 'move',
      id: id
    }
  })

  useEffect(() => {
    dropRef(divRef);
    drag(divRef);
}, []);

  return (
    <div
      style={styles}
      data-component-id={id}
      ref={divRef}
      className={`min-h-[100px] p-[20px] ${ canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
    >
      {children}
    </div>
  );
};

export default Dev;
