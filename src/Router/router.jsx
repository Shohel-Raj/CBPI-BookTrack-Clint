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
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import DashoardHomeUser from "../Pages/Dashboard/user/DashoardHomeUser";
import AdminDashboardHome from "../Pages/Dashboard/AdminDAshboardHome";
import AdminRoute from "./AdminRoute";
import DashboardTeacher from "../Pages/Dashboard/Teacher/DashboardTeacher";

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
   {
    path: "/dashboard",
    element: (
      <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "member", element: <DashoardHomeUser /> },
      { path: "teacher", element: <DashboardTeacher /> },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboardHome />
          </AdminRoute>
        ),
      },]
    //   { path: "admin/manage-users", element: <ManageUsers /> },
    //   { path: "admin/manage-lessons", element: <ManageLessons /> },
    //   { path: "admin/reported-lessons", element: <ReportedLessons /> },
    //   { path: "profile", element: <Profile /> },
    //   { path: "add-lesson", element: <AddLesson /> },
    //   { path: "my-lessons", element: <MyLessons /> },
    //   { path: "favorites", element: <Favorites /> },
    // ],
  },
  
]);

export default router;
