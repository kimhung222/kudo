import { useEffect, useState } from 'react';

// components
import { onValue, ref } from 'firebase/database';
import { users } from '../../constants';
import { writeAllUsers, writeDistributeStatus } from '../../libs/database';
import { realtimeDB } from '../../libs/firebase';
import { GMGameCard } from '../Cards/GMGameCard';

export const GMHeader = () => {
  const [data, setData] = useState({});
  const [currentGame, setCurrentGame] = useState(0);
  useEffect(() => {
    const userRef = ref(realtimeDB, 'users');
    const gameStateRef = ref(realtimeDB, 'currentGame');
    onValue(userRef, snapshot => {
      setData(snapshot.val() || {});
    });
    // const dt = dataFakeGenerator(50);
    // setData(dt);
    onValue(gameStateRef, snapshot => {
      setCurrentGame(snapshot.val());
    });
  }, []);
  const userJoinedCount = Object.keys(data)?.length || 0;

  console.log(data);

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const getRandomPair = (length: number): number[] => {
    const number1 = getRandomInt(length);
    let number2 = getRandomInt(length);
    while (number2 === number1) number2 = getRandomInt(length);
    return [number1, number2];
  };

  const getKudosData = users => {
    return users.map(i => ({
      content: '',
      userId: i
    }));
  };

  const handleGame1Start = () => {
    let userList = [...users];
    const allParticipants = {};
    Object.keys(data).forEach(userId => {
      if (userList.length <= 2) {
        userList = [...users];
      }
      const length = userList.length;
      const pair = getRandomPair(length);
      const user1 = userList[pair[0]];
      const user2 = userList[pair[1]];
      const kudos = getKudosData([user1.id, user2.id]);
      allParticipants[userId] = { userId, kudos };
      userList = [...userList.filter(u => ![user1.id, user2.id].includes(u.id))];
    });
    writeAllUsers(allParticipants).then(_ => {
      writeDistributeStatus(1);
    });
  };

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-16 pb-10 pt-10">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <GMGameCard
                  statSubtitle="Kudo"
                  statTitle={userJoinedCount}
                  isPlaying={currentGame === 1}
                  id={1}
                  onStart={handleGame1Start}
                  btnStartText="Distribute"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 !all:mb-0">
                <GMGameCard
                  statSubtitle="Memories"
                  statTitle={userJoinedCount}
                  isPlaying={currentGame === 2}
                  id={2}
                  onStart={undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
