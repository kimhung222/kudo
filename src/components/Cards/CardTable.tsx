import React, { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { realtimeDB } from "../../libs/firebase";
import { users } from "../../constants";

// components


export default function CardTable({ color }) {
  const [data, setData] = useState({});
  useEffect(() => {
    const userRef = ref(realtimeDB, 'users');
    onValue(userRef, (snapshot) => {
      setData(snapshot.val());
    })
  }, []);
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Participants
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */ }
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
              >
                Name
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
              >
                Assignee
              </th>
              <th
                className={
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                  (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                }
              >
                Says
              </th>
            </tr>
            </thead>
            <tbody>
            { Object.values(data).map((item, index) => {
              console.log(item, index)
              return (
                <tr key={ index }>
                  <th
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    {/*<img*/ }
                    {/*  src="assets/img/bootstrap.jpg"*/ }
                    {/*  className="h-12 w-12 bg-white rounded-full border"*/ }
                    {/*  alt="..."*/ }
                    {/*></img>{ " " }*/ }
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light" ? "text-blueGray-600" : "text-white")
                      }
                    >
                    { item?.userId || 'user không xác định' }
                  </span>
                  </th>
                  <td
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    { item?.assign?.map((a, i) => {
                      const user = users[a];
                      return (
                        <p key={ `as_${ i }` }>{ user?.name }</p>
                      )
                    }) }
                  </td>
                  <td
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    { item?.assign?.map((a, i) => {
                      const user = users[a];
                      return (
                        <p key={ `as_${ i }` }>{ user?.name }</p>
                      )
                    }) }
                  </td>
                </tr>
              )
            }) }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};
