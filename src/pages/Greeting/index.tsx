import React, { useEffect } from 'react';
import { realtimeDB } from '../../libs/firebase';
import { useNavigate } from 'react-router-dom';

import './Greeting.scss';
import { onValue, ref } from 'firebase/database';

const SNOW_COUNT = 200;

export const GreetingPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const gameStateRef = ref(realtimeDB, 'currentGame');
    onValue(gameStateRef, snapshot => {
      const currentGame = snapshot.val();
      if (currentGame === 1) {
        navigate('/kudo/create');
      }
    });
  }, []);
  return (
    <main className="bg-black h-screen font-sans text-white">
      {Array.from({ length: SNOW_COUNT }).map((_, index) => (
        <div key={index} className="snow-fall" />
      ))}
      <div className="flex-center h-full">
        <div className="text-center">
          <img src="/waitingforyou.gif" />
          <h1 className="text-3xl mb-4 text-shadow-f43f5e">Đang chờ ACE join 😎</h1>
          <p className="text-base">Hãy nghĩ dần những lời yêu gửi tới ACE Techies nhé!</p>
        </div>
      </div>
    </main>
  );
};
