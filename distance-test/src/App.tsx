import { useEffect, useRef } from "react";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  function getTotalOffsetTop(element: HTMLElement) {
    let totalOffsetTop = 0;
    while (element) {
      totalOffsetTop += element.offsetTop; // 100
      element = element.offsetParent as HTMLElement; // 200
    }
    return totalOffsetTop;
  }

  useEffect(() => {
    console.log("offsetTop", ref.current?.offsetTop);
    console.log("clientTop", ref.current?.clientTop);

    console.log('total offsetTop', getTotalOffsetTop(ref!.current as HTMLDivElement));
  }, []);

  return (
    <div>
      <div
        style={{
          position: "relative", // offsetTop 是距离最近的有 position 属性（relative 或 absolute 或 fixed）的元素的距离。
          margin: "100px",
          padding: "200px",
          border: "1px solid blue",
        }}
      >
        <div
          id="box"
          ref={ref}
          style={{
            border: "20px solid #000",
            width: "100px",
            height: "100px",
            background: "pink",
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
