/*
 * @Date: 2024-06-19 14:56:25
 * @Description: description
 */
import React, { FC, PropsWithChildren } from "react";
import { useTransition, animated } from "@react-spring/web";
import Overlay from "./Overlay";
import { CSSProperties } from "styled-components";
import classNames from "classnames";

const DURATION = 300;

interface SlideInOverlayProps extends PropsWithChildren {
  isVisible: boolean;
  from?: "right" | "bottom";
  className?: string | string[];
  style?: CSSProperties;
  onEnter?: () => void;
  onExit?: () => void;
}

const SlideInOverlay: FC<SlideInOverlayProps> = (props) => {
  const { isVisible, children, from = "right", style, className, onEnter, onExit } = props;

  const x = React.useMemo(() => (from === "right" ? window.screen.width : window.screen.height), [from]);

  const transitions = useTransition(isVisible, {
    x,
    opacity: 1,
    from: { x, opacity: 1, a: 1 },
    enter: { x: 0, opacity: 1 },
    leave: { x, opacity: 0 },
    config: { duration: DURATION },
  });

  const translate = React.useCallback(
    (x: number) => {
      switch (from) {
        case "right":
          return `translateX(${x}px)`;
        case "bottom":
          return `translateY(${x}px)`;
      }
    },
    [from]
  );

  React.useEffect(() => {
    let timer = null;

    if (isVisible === true && onEnter != null) {
      timer = setTimeout(onEnter, DURATION);
    }

    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [isVisible, onEnter]);

  const visibleRef = React.useRef(isVisible);

  React.useEffect(() => {
    let timer = null;

    if (isVisible === false && visibleRef.current === true && onExit != null) {
      timer = setTimeout(onExit, DURATION);
    }

    visibleRef.current = isVisible;

    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [isVisible, onExit]);

  return (
    <>
      {transitions(
        (props, isVisible) =>
          isVisible && (
            <Overlay
              as={animated.div}
              className={classNames(className)}
              style={{
                ...style,
                transform: props.x.to((x) => {
                  console.log(x, props.x, 91)
                  return x === 0 ? "none" : translate(x); // x 为屏幕的宽和高
                }),
                opacity: props.opacity,
              }}
            >
              {/* 如果是路由的话，则直接换成Outlet */}
              {children}
            </Overlay>
          )
      )}
    </>
  );
};

export { SlideInOverlay, DURATION };
