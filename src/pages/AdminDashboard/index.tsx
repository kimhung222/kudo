import React from "react";
import CardTable from "../../components/Cards/CardTable";
import KudoTable from "../../components/Cards/KudoTable";

export const AdminDashboard = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <KudoTable/>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 h-screen">
          <CardTable/>
        </div>
      </div>
    </>
  );
}
