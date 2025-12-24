import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";

import ErrorPage from "../Pages/ErrorPage";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import AllBooks from "../Pages/AllBooks";
import CommunityHub from "../Pages/CommunityHub";
import BecomeMembor from "../Pages/BecomeMembor";
import ProtectedRoutes from "./ProtectedRouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path:"/all-books",
        Component:AllBooks
      },
      {
        path:"/community-hub",
        Component:CommunityHub
      },
      {
        path:"/auth/login",
        Component:Login
      },
      {
        path:"/auth/register",
        Component: Register
      },
      {
        path:"/become-member",
        element:<ProtectedRoutes>
          <BecomeMembor/>

        </ProtectedRoutes>
      }
    
    ],
  },
  
]);

export default router;
