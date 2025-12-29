import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import AllBooks from "../Pages/AllBooks";
import BecomeMembor from "../Pages/BecomeMembor";
import ProtectedRoutes from "./ProtectedRouts";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import DashoardHomeUser from "../Pages/Dashboard/user/DashoardHomeUser";
import AdminDashboardHome from "../Pages/Dashboard/AdminDAshboardHome";
import AdminRoute from "./AdminRoute";
import DashboardTeacher from "../Pages/Dashboard/Teacher/DashboardTeacher";
import AddBooks from "../Pages/Dashboard/Admin/AddBooks";
import ManageBook from "../Pages/Dashboard/Admin/ManageBook";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import BookDetails from "../Pages/BookDetails";
import ProfilePage from "../Pages/ProfilePage";
import UserBorrowBook from "../Pages/Dashboard/UserBorrowBook";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import ContuctUsManage from "../Pages/Dashboard/Admin/ContuctUsManage";
import UpdateBook from "../Pages/Dashboard/Admin/UpdateBook";
import AddCarrusol from "../Pages/Dashboard/Admin/AddCarrusol";
import AdminBorrowedHistory from "../Pages/Dashboard/Admin/AdminBorrowedHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/all-books",
        Component: AllBooks,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contuct-us",
        Component: ContactUs,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/become-member",
        element: (
          <ProtectedRoutes>
            <BecomeMembor />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/book-details/:id",
        element: (
          <ProtectedRoutes>
            <BookDetails />
          </ProtectedRoutes>
        ),
      },
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
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "manage-books",
        element: <UserBorrowBook />,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboardHome />
          </AdminRoute>
        ),
      },

      {
        path: "admin/add-books",
        element: (
          <AdminRoute>
            <AddBooks />
          </AdminRoute>
        ),
      },
      {
        path: "admin/Borrowed",
        element: (
          <AdminRoute>
            <AdminBorrowedHistory />
          </AdminRoute>
        ),
      },
      {
        path: "admin/carusal",
        element: (
          <AdminRoute>
            <AddCarrusol />
          </AdminRoute>
        ),
      },
     
      {
        path: "admin/all-books",
        element: (
          <AdminRoute>
            <ManageBook />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-contuct-us",
        element: (
          <AdminRoute>
            <ContuctUsManage />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-contuct-us",
        element: (
          <AdminRoute>
            <ContuctUsManage />
          </AdminRoute>
        ),
      },
       {
        path: "admin/all-books/books/edit/:id",
        element: (
          <AdminRoute>
            <UpdateBook />
          </AdminRoute>
        ),
      },
    ],
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
