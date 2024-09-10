/*
 * @Date: 2024-08-30 13:56:55
 * @Description: main配置页面
 */
import { createRoot } from "react-dom/client";
/* @ts-ignore */
import { ClickToComponent } from 'click-to-react-component';
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <ClickToComponent />
    <App />
  </>
);
 