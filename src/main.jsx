import React from "react";
import { createRoot } from "react-dom/client";
import PingPodApp from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PingPodApp />
  </React.StrictMode>
);
