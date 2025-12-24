import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import Navbar from "../Components/Common/Navbar";
import Wraper from "../Components/Wraper";
import Footer from "../Components/Common/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-base-100 shadow-sm sticky top-0 z-50">
        <Wraper>
          <Navbar />
        </Wraper>
      </div>
      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      <div className="bg-base-200" >
          <Footer />
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
