import React from "react";
import { createRoot } from "react-dom/client";
import Button from "@mui/material/Button";

import "./index.scss";

import { CountProvider } from "host/context";
import Content from "./Content";

export default function App() {
  return (
    <div className="text-3xl mx-auto max-w-6xl">
      <Content />

      <Button variant="contained">Hello World</Button>
    </div>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <CountProvider>
    <App />
  </CountProvider>
);
