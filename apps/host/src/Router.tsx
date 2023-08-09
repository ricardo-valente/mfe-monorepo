import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root/Root";
import { apps } from "./routes/root/handle";
import App from "./routes/app/App";
import { CountProvider } from "@/context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: () => apps,
  },
  {
    path: "app/:name",
    element: <App />,
  },
  {
    path: "login",
    element: <h1>Login page</h1>,
  },
]);

const root = createRoot(document.getElementById("app")!);
root.render(
  <CountProvider>
    <RouterProvider router={router} />
  </CountProvider>
);
