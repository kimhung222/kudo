import React, { useEffect, useState } from "react";

// components
import { GMGameCard } from "../Cards/GMGameCard";
import { onValue, ref } from "firebase/database";
import { realtimeDB } from "../../libs/firebase";

export const GMHeader = () => {
  const [data, setData] = useState({});
  const [currentGame, setCurrentGame] = useState(0);
  useEffect(() => {
    const userRef = ref(realtimeDB, 'users');
    const gameStateRef = ref(realtimeDB, 'currentGame');
    onValue(userRef, (snapshot) => {
      setData(snapshot.val());
    });
    onValue(gameStateRef, (snapshot) => {
      console.log(snapshot.val());
      setCurrentGame(snapshot.val());
    });
  }, []);
  const game1Count = Object.keys(data)?.length || 0;
  console.log(currentGame)
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
                  statTitle={ game1Count }
                  isPlaying={ currentGame === 1 }
                  id={ 1 }
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 !all:mb-0">
                <GMGameCard
                  statSubtitle="NEW USERS"
                  statTitle="2,356"
                  isPlaying={ currentGame === 2 }
                  id={ 2 }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
