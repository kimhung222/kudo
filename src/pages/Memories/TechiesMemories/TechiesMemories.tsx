import { onChildAdded } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { getTechiesMemories } from '../../../libs/database';

import './TechiesMemories.css';

export const TechiesMemories: React.FC = () => {
  const [memories, setMemories] = useState<string[]>([]);

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
            <li className="memory-item">
              <div className="card">Magic Card</div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};
