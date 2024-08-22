import React from "react";
import { useDrag } from "react-dnd";

export interface MaterialItemProps {
  // TODO: add props
  name: string;
  desc: string;
}

function MaterialItem(props: MaterialItemProps) {
  const { name, desc } = props;

  const [, dragRef] = useDrag({
    type: name,
    item: {
      type: name,
    },
  });

  return (
    <div
      ref={dragRef}
      className="
        border-dashed
        border-[1px]
        border-[#000]
        py-[8px] px-[10px] 
        m-[10px]
        cursor-move
        inline-block
        bg-white
        hover:bg-[#ccc]
      "
    >
      {desc}
    </div>
  );
}

export default MaterialItem;
