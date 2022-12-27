import React, { useEffect } from 'react'
import { onValue, ref } from "firebase/database";
import { realtimeDB } from "../../libs/firebase";
import { useNavigate } from "react-router-dom";

export const KudoPage: React.FC = () => {
  const nvg = useNavigate;
  useEffect(() => {
    const gameStateRef = ref(realtimeDB, 'currentGame');
    onValue(gameStateRef, (snapshot) => {
      if (snapshot.val() === 2 && window.location !== '/admin-dashboard') {
        console.log(window.location)
        nvg('/memories');
      }
    });
  }, []);
  return <div className="mt-3 text-[blue]">Kudo</div>
}
