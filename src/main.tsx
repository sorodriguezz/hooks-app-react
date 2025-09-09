import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TasksApp } from "./05-useReduce/TaskApp";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <HooksApp /> */}
    <TasksApp />
  </StrictMode>
);
