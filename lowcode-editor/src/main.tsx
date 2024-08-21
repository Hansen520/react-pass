/*
 * @Date: 2024-08-20 15:24:26
 * @Description: description
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

createRoot(document.getElementById("root")!).render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>
);
