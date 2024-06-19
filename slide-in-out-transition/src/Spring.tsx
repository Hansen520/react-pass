import { useSpring, animated } from "@react-spring/web";

export default function MyComponent() {
  const [springs, api] = useSpring(() => ({
    from: { width: 100,
      height: 100 },
    config: {
      mass: 2,
      friction: 10,
      tension: 200,
    }
  }));

  const handleClick = () => {
    api.start({
      width: 200,
      height: 200
        
    })
  }

  return (
    <animated.div
      onClick={handleClick}
      style={{
        background: "#ff6d6d",
        borderRadius: 8,
        ...springs, // 将动画应用到 div 元素上
      }}
    />
  );
}
