import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";

import ErrorPage from "../Pages/ErrorPage";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path:"/auth/login",
        Component:Login
      },
      {
        path:"/auth/register",
        Component: Register
      }
    
    ],
  },
  
]);

export default router;
