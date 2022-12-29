import { useEffect } from 'react';
import { onValue, ref } from 'firebase/database';
import { realtimeDB } from '../../libs/firebase';
import { useNavigate } from 'react-router-dom';

export const NavigationHandler = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const gameStateRef = ref(realtimeDB, 'currentGame');
    onValue(gameStateRef, snapshot => {
      if (window.location.pathname !== '/admin-dashboard') {
        if (snapshot.val() === 2) {
          navigate('/me/memories');
        }
        if (snapshot.val() === 1) {
          navigate('/kudo/create');
        }
      }
    });
  }, []);
  return <>{children}</>;
};
