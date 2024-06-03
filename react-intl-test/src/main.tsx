/*
 * @Date: 2024-06-03 15:42:55
 * @Description: description
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { IntlProvider } from "react-intl";
import enUS from "./en-US.json";
import zhCN from "./zh-CN.json";
// import './index.css'

const messages: Record<string, any> = {
  "en-US": enUS,
  "zh-CN": zhCN,
};
const locale = navigator.language;

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <IntlProvider messages={messages[locale]} defaultLocale="zh-CN">
    <App />
  </IntlProvider>

  // </React.StrictMode>,
);
