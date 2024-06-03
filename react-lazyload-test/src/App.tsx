/*
 * @Date: 2024-05-27 11:21:07
 * @Description: description
 */
import { useState } from "react";
// import img1 from "./素材1.png";
import img2 from "./扑克牌1.jpg";
import "./App.css";
// import LazyLoad from 'react-lazyload';
import LazyLoad from "./MyLazyLoad";

function App() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      <p>一一一一一一一一一一一一一一一一一一</p>
      {/* 这边增加一些类名可以做一些的动画 */}
      <LazyLoad
        className={isVisible ? "show" : "hide"}
        placeholder={<div>loading...</div>}
        onContentVisible={() => {
          console.log("comp visible");
          setIsVisible(true);
        }}
      >
        {/* <img src={img1}/> */}
      </LazyLoad>
      <LazyLoad
        placeholder={<div>loading...</div>}
        onContentVisible={() => {
          console.log("img visible");
        }}
      >
        <img src={img2} />
      </LazyLoad>
    </div>
  );
}

export default App;
