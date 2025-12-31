import React from "react";
import { Outlet } from "react-router";
import Navbar from "../HomePage/HeroSection/Navbar";

const Root = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
