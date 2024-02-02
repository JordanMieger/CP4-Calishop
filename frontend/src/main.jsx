import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Basket from "./pages/Basket";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import { UserProvider } from "./contexts/userContext";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path:"/",
        element:<Home />,
      },
      {
        path:"Product",
        element:<Product />,
      },
      {
        path:"Basket",
        element:<Basket />,
      },
      {
        path:"Order",
        element:<Order />,
      },
      {
        path:"Login",
        element:<Login />,
      },
      {
        path:"Signup",
        element:<SignUp />,
      },
      {
        path:"Profile",
        element:<Profile />,
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
