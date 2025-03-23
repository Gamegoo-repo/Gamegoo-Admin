import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ReportPage from "../pages/ReportPage";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [{ index: true, element: <MainPage /> }],
      },
      {
        path: "/",
        element: <MainLayout />,
        children: [{ path: "report", element: <ReportPage /> }],
      },
    ],
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
