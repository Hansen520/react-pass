/*
 * @Date: 2024-08-22 10:31:06
 * @Description: description
 */

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { getComponentById, useComponentsStore } from "../stores/components";

interface HoverMaskProps {
  containerClassName: string;
  componentId: number;
  portalWrapperClassName: string;
}

function HoverMask({ containerClassName, portalWrapperClassName, componentId }: HoverMaskProps) {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  const { components } = useComponentsStore();

  useEffect(() => {
    // console.log(componentId, 29);
    updatePosition();
  }, [componentId]);

  useEffect(() => {
    updatePosition();
  }, [components]);

  useEffect(() => {
    const resizeHandler = () => {
      updatePosition();
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  /* 更新位置 */
  function updatePosition() {
    if (!componentId) return;

    const container = document.querySelector(`.${containerClassName}`); // 距离整个容器上面的距离
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect(); // 每一个组件容器
    const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();
    // console.log(top, containerTop, container.scrollTop, 45);
    let labelTop = top - containerTop + container.scrollTop; // 距上面 -  容器 + 滚动条
    const labelLeft = left - containerLeft + width;

    if (labelTop <= 0) {
      labelTop -= -20;
    }

    // 设置mask的位置
    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollLeft,
      width,
      height,
      labelTop,
      labelLeft,
    });
  }

  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`)!;
  }, []);

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  // const el = useMemo(() => {
  //   const el = document.createElement("div");
  //   el.className = `wrapper`;

  //   const container = document.querySelector(`.${containerClassName}`);
  //   container?.appendChild(el);
  //   return el;
  // }, []);

  // 往el里面筛节点数据
  return createPortal(
    <>
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          border: "1px dashed blue",
          pointerEvents: "none",
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: "14px",
          zIndex: 13,
          display: !position.width || position.width < 10 ? "none" : "inline",
          transform: "translate(-100%, -100%)",
        }}
      >
        <div
          style={{
            padding: "0 8px",
            backgroundColor: "blue",
            borderRadius: 4,
            color: "#fff",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {curComponent?.desc}
        </div>
      </div>
    </>,
    el
  );
}

export default HoverMask;
