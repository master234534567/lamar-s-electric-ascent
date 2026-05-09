import React from "react";
import { createRoot } from "react-dom/client";
import "../src/styles.css";
import { LamarSite } from "../src/components/LamarSite";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LamarSite />
  </React.StrictMode>
);
