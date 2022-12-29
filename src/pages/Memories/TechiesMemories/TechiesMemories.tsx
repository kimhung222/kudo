import { onChildAdded } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { getTechiesMemories, Memory } from '../../../libs/database';

import './TechiesMemories.css';

export const TechiesMemories: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    getTechiesMemories().then(mems => {
      setMemories(mems);
    });
  }, []);

  // Handle listen for adding more memories from others
  // useEffect(() => {
  //   onChildAdded()
  // }, []);

  return (
    <main className="relative h-screen bg-#212534">
      <h1 className="p4 text-center text-3xl text-white mb-4 text-shadow-40CBF9">
        Techies Memories 📝
      </h1>
      <section className="h-full flex-center">
        <div className="memories-wrapper">
          <ul className="memories-track">
            {memories.map((mem, index) => {
              console.log('{memories.map  👻  mem', mem);
              return (
                <li key={index} className="memory-item">
                  <div className="relative card">
                    <div className="absolute px-4 w-full flex justify-between bottom-4">
                      <button className="rounded-full p-2 border border-gray-400 backdrop-blur-sm">
                        <svg width="32" height="32" viewBox="0 0 24 24" className="text-gray-500">
                          <path
                            fill="currentColor"
                            d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6Z"
                          />
                        </svg>
                      </button>
                      <button className="rounded-full p-2 border border-gray-400">
                        <svg width="32" height="32" viewBox="0 0 24 24" className="text-rose-6">
                          <path
                            fill="currentColor"
                            d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
};
