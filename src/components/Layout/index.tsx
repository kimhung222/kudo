import React from "react";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

export const Root: React.FC = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="kudo">Kudo</NavLink>
      <NavLink to="greeting">Greeting</NavLink>
      <Outlet />
    </div>
  );
};
