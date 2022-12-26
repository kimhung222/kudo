import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";

export const CreateKudoSuccessPage: React.FC = () => {
  return (
    <div className="w-screen flex justify-center pt-6">
      <div className="w-full md:w-[768px] px-4 flex flex-col h-[50vh] justify-end">
        <div className="flex w-full justify-center">
          <div className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
            <CheckIcon height={100} className="text-white" aria-hidden="true" />
          </div>
        </div>
        <div className="flex flex-col w-full items-center">
          <div className="mt-4 text-lg tracking-tight text-slate-900 ">
            Lời chúc của bạn đã được gửi!
          </div>
          {/*<NavLink to="/kudo/create">*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    className="mt-4 w-[fit-content] inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
          {/*  >*/}
          {/*    Sửa đánh giá*/}
          {/*  </button>*/}
          {/*</NavLink>*/}
        </div>
      </div>
    </div>
  );
};
