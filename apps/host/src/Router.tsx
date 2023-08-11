import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/root/Root";
import rootLoader from "./routes/root/loader";
import appLoader from "./routes/app/loader";
import App from "./routes/app/App";
import { UserProvider } from "host/context";
import SignIn from "./routes/signin/SignIn";
import signInAction from "./routes/signin/action";

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
    path: "sign-in",
    element: <SignIn />,
    action: signInAction,
  },
]);

export default function Router() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}
