/*
 * @Date: 2024-08-05 15:06:32
 * @Description: description
 */
import { Watermark, Calendar, ConfigProvider, useMessage } from "@hansen520/han-components";
import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
// import '@hansen520/han-components/dist/esm/Calendar/index.css';
import '@hansen520/han-components/dist/esm/Message/index.css';
import dayjs from "dayjs";
function Aaa() {
  const message = useMessage();

  return <button onClick={() =>{
    message.add({
      content:'请求成功'
    })
  }}>成功</button>
}

function App() {

  return (
    <ConfigProvider>
      <div>
        <Aaa></Aaa>
      </div>
    </ConfigProvider>
  );
}

export default App;
