import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
   

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>


      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
