import React from "react";

// components
import { GMGameCard } from "../Cards/GMGameCard";

export const GMHeader = () => {
  return (
    <>
      {/* Header */ }
      <div className="relative bg-lightBlue-600 md:pt-16 pb-10 pt-10">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */ }
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <GMGameCard
                  statSubtitle="Game 1"
                  statTitle="50"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 !all:mb-0">
                <GMGameCard
                  statSubtitle="NEW USERS"
                  statTitle="2,356"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
