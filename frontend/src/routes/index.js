import React, { lazy, Suspense } from "react";

import { useRoutes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Protected from "../components/Protected";
import Home from "../pages/Home";

function Routes() {
  let element = useRoutes([
    {
      path: "/",
      element: (
        <Protected>
          <Home />
        </Protected>
      ),
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
  ]);

  return element;
}

export default Routes;
