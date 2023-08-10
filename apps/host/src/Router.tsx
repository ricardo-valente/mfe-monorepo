import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root/Root";
import rootLoader from "./routes/root/loader";
import appLoader from "./routes/app/loader";
import App from "./routes/app/App";
import { CountProvider } from "@/context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
  },
  {
    path: "app/:name",
    element: <App />,
    loader: appLoader,
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
