import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import router from "./Router/router.jsx";

createRoot(document.getElementById("root")).render(
 <StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
  </StrictMode>
);
