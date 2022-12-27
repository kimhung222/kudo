import React, { useContext, useEffect, useState } from "react";

// components
import { GMGameCard } from "../Cards/GMGameCard";
import { onValue, ref } from "firebase/database";
import { realtimeDB } from "../../libs/firebase";
import { users } from "../../constants";
import { AuthContext } from "../../context/auth.provider";
import { writeUserData } from "../../libs/database";

export const GMHeader = () => {
  const [data, setData] = useState({});
  const [currentGame, setCurrentGame] = useState(0);
  const context = useContext(AuthContext);
  useEffect(() => {
    const userRef = ref(realtimeDB, 'users');
    const gameStateRef = ref(realtimeDB, 'currentGame');
    onValue(userRef, (snapshot) => {
      setData(snapshot.val());
    });
    onValue(gameStateRef, (snapshot) => {
      setCurrentGame(snapshot.val());
    });
  }, []);
  const userJoinedCount = Object.keys(data)?.length || 0;

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }

  const handleGame1Start = () => {
    const usersLength = users.length;
    Object.values(data).forEach(user => {
      const number1 = getRandomInt(usersLength);
      let number2 = getRandomInt(usersLength);
      while (number2 === number1) number2 = getRandomInt(usersLength);
      const assign = [number1, number2];
      writeUserData(context.user.uid, assign);
    })
  }

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
                  statTitle={ userJoinedCount }
                  isPlaying={ currentGame === 1 }
                  id={ 1 }
                  onStart={ handleGame1Start }
                  btnStartText="Distribute"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 !all:mb-0">
                <GMGameCard
                  statSubtitle="NEW USERS"
                  statTitle={ userJoinedCount }
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
