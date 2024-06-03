/*
 * @Date: 2024-05-28 09:59:48
 * @Description: description
 */
import { CSSProperties, FC, ReactNode, useEffect, useRef, useState } from "react";

interface MyLazyloadProps {
  className?: string; /* className 和 style 是给外层 div 添加样式的 */
  style?: CSSProperties;
  placeholder?: ReactNode; /* 是占位的内容 */
  offset?: string | number; /* 是距离到可视区域多远就触发加载 */
  width?: number | string;
  height?: string | number;
  onContentVisible?: () => void; /* 进入可视化区域后所产生的回调 */
  children?: ReactNode;
}

const MyLazyload: FC<MyLazyloadProps> = (props) => {
  const { className = "", style, offset = 0, width, onContentVisible, placeholder, height, children } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const elementObserver = useRef<IntersectionObserver>();

  /* 关键函数去判断可视范围 */
  const lazyLoadHandler = (entries: IntersectionObserverEntry[]) => {

    const [entry] = entries;
    const { isIntersecting, intersectionRatio } = entry;
    
    if (intersectionRatio > 0) {
      const node = containerRef.current;
      console.log(node, entry, intersectionRatio);
    }

    if (isIntersecting) {
      setVisible(true);
      /* 可以通过这一层函数传递给外部，然后通过这个函数，可以在外部组件做相对应的处理等等 */
      onContentVisible?.();

      const node = containerRef.current;
      // 展示完成后及时的销毁
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node);
      }
    }
  }

  useEffect(() => {
    const options = {
        /* 这边没有写root，则这边的根元素就是此文档的 containerRef */
        /* rootMargin 这边做了一次偏移处理 */
        rootMargin: typeof offset === 'number' ? `${offset}px` : offset || '0px',
        /* 设置 threshold 为 0 也就是一进入可视区域就触发 */
        threshold: 0,
    }

    elementObserver.current = new IntersectionObserver(lazyLoadHandler, options);

    const node = containerRef.current; // 拿到node

    if (node instanceof HTMLElement) {
        elementObserver.current.observe(node);
    }
    return () => {
        if (node && node instanceof HTMLElement) {
            elementObserver.current?.unobserve(node);
        }
    }
  }, []);

  const styles = { height, width, ...style };

  return (
    <div ref={containerRef} className={`${className}`} style={styles}>
      {visible ? children : placeholder}
    </div>
  );
};

export default MyLazyload;
