import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

import { CountProvider } from "host/context";
import Content from "appOne/Content";

export default function App() {
  return (
    <div className="text-3xl mx-auto max-w-6xl">
      <Content title="Solutions app" />
    </div>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <CountProvider>
    <App />
  </CountProvider>
);
