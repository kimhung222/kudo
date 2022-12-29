import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth.provider';
import { Memories, writeVoteMemories } from '../../../libs/database';
import { unique } from '@techmely/utils';
import './TechiesMemories.css';

export const TechiesMemories: React.FC = () => {
  const { user } = useAuth();
  const [memories, setMemories] = useState<Memories>({});
  const [votes, setVotes] = useState<any>({});
  const myVotes = votes ? votes?.[user?.uid || ''] : [];
  const totalVotes = (userId: string) => {
    const allVotes = Object.values(votes).flat() as string[];
    const count = allVotes.reduce((n, x) => {
      const matchCount = x === userId ? 1 : 0;
      return n + matchCount;
    }, 0);
    return count;
  };

  useEffect(() => {
    const memsRef = ref(getDatabase(), 'memories');
    const votesRef = ref(getDatabase(), 'votes');
    onValue(memsRef, snapshot => {
      const mems = snapshot.val();
      if (mems) {
        setMemories(mems);
      }
    });
    onValue(votesRef, snapshot => {
      const _votes = snapshot.val();
      setVotes(_votes);
    });
  }, []);

  const handleUpVote = (participantId: string) => e => {
    writeVoteMemories(user?.uid, unique([...myVotes, participantId]));
  };

  const handleDownVote = (participantId: string) => e => {
    writeVoteMemories(
      user?.uid,
      myVotes.filter(v => v !== participantId)
    );
  };

  return (
    <main className="relative h-screen bg-#212534">
      <h1 className="p4 text-center text-3xl text-white mb-4 text-shadow-40CBF9">
        Techies Memories 📝
      </h1>
      <section className="h-full flex-center">
        <ul
          className="memories-track flex space-x-14 py-10 overflow-x-scroll"
          style={{ whiteSpace: 'nowrap' }}
        >
          {Object.keys(memories)?.map?.((userId, index) => (
            <li key={index} className="memory-item first:pl-8">
              <div className="relative card">
                <div
                  className="absolute top-0 p-2 space-y-2 w-full"
                  style={{ whiteSpace: 'normal' }}
                >
                  {Object.keys(memories[userId]).map(key => (
                    <p key={key} className="text-base text-left text-white line-clamp-5">
                      {memories?.[userId][key]}
                    </p>
                  ))}
                </div>
                <div className="absolute px-1 w-full flex justify-between bottom-1">
                  <button
                    className="rounded-full p-2 backdrop-blur-sm"
                    onClick={handleDownVote(userId)}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      className="text-gray-400 square-12"
                    >
                      <path
                        fill="currentColor"
                        d="M12 15.575q.2 0 .375-.063q.175-.062.325-.212l2.6-2.6q.275-.275.275-.7q0-.425-.275-.7q-.275-.275-.7-.275q-.425 0-.7.275l-.9.9V9q0-.425-.287-.713Q12.425 8 12 8t-.712.287Q11 8.575 11 9v3.2l-.9-.9q-.275-.275-.7-.275q-.425 0-.7.275q-.275.275-.275.7q0 .425.275.7l2.6 2.6q.15.15.325.212q.175.063.375.063ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Zm0-8Z"
                      />
                    </svg>
                  </button>
                  <div className="pt-4">
                    <p className="text-xl text-white">Tổng votes {totalVotes(userId)}</p>
                  </div>
                  <button className="rounded-full p-2" onClick={handleUpVote(userId)}>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      className="text-indigo-600 square-12"
                    >
                      <path
                        fill="currentColor"
                        d="M12 16q.425 0 .713-.288Q13 15.425 13 15v-3.2l.9.9q.275.275.7.275q.425 0 .7-.275q.275-.275.275-.7q0-.425-.275-.7l-2.6-2.6q-.15-.15-.325-.213q-.175-.062-.375-.062t-.375.062q-.175.063-.325.213l-2.6 2.6q-.275.275-.275.7q0 .425.275.7q.275.275.7.275q.425 0 .7-.275l.9-.9V15q0 .425.288.712q.287.288.712.288Zm0 6q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Zm0-8Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
