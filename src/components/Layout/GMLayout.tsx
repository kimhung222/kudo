import React from 'react';
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router";
import { GMNavbar } from "../Nabars/GMNavbar";
import { GMHeader } from "../Headers/GMHeader";

export const GMLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <GMNavbar />
        <GMHeader />
        <Outlet />
      </div>
    </>
  )
}