import { useEffect, useState } from 'react'

// components
import { onValue, ref } from 'firebase/database'
import { users } from '../../constants'
import { writeUserData } from '../../libs/database'
import { realtimeDB } from '../../libs/firebase'
import { GMGameCard } from '../Cards/GMGameCard'

const dataFakeGenerator = (max: number) => {
  const toReturn = []
  for (let i = 0; i < max; i++) {
    toReturn.push({
      userId: `user-${i}`,
    })
  }
  return toReturn
}

export const GMHeader = () => {
  const [data, setData] = useState({})
  const [currentGame, setCurrentGame] = useState(0)
  useEffect(() => {
    const userRef = ref(realtimeDB, 'users')
    const gameStateRef = ref(realtimeDB, 'currentGame')
    onValue(userRef, (snapshot) => {
      setData(snapshot.val() || {})
    })
    // const dt = dataFakeGenerator(50);
    // setData(dt);
    onValue(gameStateRef, (snapshot) => {
      setCurrentGame(snapshot.val())
    })
  }, [])
  const userJoinedCount = Object.keys(data)?.length || 0

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }

  const getRandomPair = (length: number): number[] => {
    const number1 = getRandomInt(length)
    let number2 = getRandomInt(length)
    while (number2 === number1) number2 = getRandomInt(length)
    return [number1, number2]
  }

  const handleGame1Start = () => {
    let userList = [...users]
    Object.values(data).forEach((user) => {
      if (userList.length <= 2) {
        userList = [...users]
      }
      const length = userList.length
      const pair = getRandomPair(length)
      const user1 = userList[pair[0]]
      const user2 = userList[pair[1]]
      writeUserData(user.userId, [user1.id, user2.id])
      userList = [...userList.filter((u) => ![user1.id, user2.id].includes(u.id))]
    })
  }

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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
