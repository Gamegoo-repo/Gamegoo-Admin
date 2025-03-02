import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [{ index: true, element: <MainPage /> }],
  },
]);

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Router;
