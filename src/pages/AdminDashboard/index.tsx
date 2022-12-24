import React from "react";
import CardTable from "../../components/Cards/CardTable";

export const AdminDashboard = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardTable/>
        </div>
      </div>
    </>
  );
}
