import gsap from 'gsap';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { routePaths } from '../../libs/routePaths';

import { useAuth } from '../../context/auth.provider';
import { writeUserData } from '../../libs/database';
import './ButtonGameStart.scss';
import { onValue, ref } from 'firebase/database';
import { realtimeDB } from '../../libs/firebase';

// paths
// edit here: https://yqnn.github.io/svg-path-editor/
const paths = {
  step1: {
    unfilled: 'M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z',
    inBetween: 'M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z',
    filled: 'M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z'
  },
  step2: {
    filled: 'M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z',
    inBetween: 'M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z',
    unfilled: 'M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z'
  }
};

type Props = {
  overlayPath: SVGPathElement;
};

export const ButtonGameStart: React.FC<PropsWithChildren<Props>> = ({ children, overlayPath }) => {
  const navigate = useNavigate();
  const { user, pending } = useAuth();
  const [currentGame, setCurrentGame] = useState(0);

  useEffect(() => {
    const userRef = ref(realtimeDB, 'users');
    const gameStateRef = ref(realtimeDB, 'currentGame');
    // const dt = dataFakeGenerator(50);
    // setData(dt);
    onValue(gameStateRef, snapshot => {
      setCurrentGame(snapshot.val());
    });
  }, []);

  const moveToGreeting = () => {
    if (!currentGame) {
      pageSwitchTimeline.play(0);
    }
  };

  const pageSwitchTimeline = gsap
    .timeline({
      paused: true
    })
    .set(overlayPath, {
      attr: { d: paths.step1.unfilled }
    })
    .to(
      overlayPath,
      {
        duration: 0.8,
        ease: 'power3.in',
        attr: { d: paths.step1.inBetween }
      },
      0
    )
    .to(overlayPath, {
      duration: 0.2,
      ease: 'power1',
      attr: { d: paths.step1.filled }
    })
    .set(overlayPath, {
      attr: { d: paths.step2.filled }
    })
    .to(overlayPath, {
      duration: 0.15,
      ease: 'sine.in',
      attr: { d: paths.step2.inBetween },
      // temporary write on complete here bcs the function writeUserData need a time to handle
      // promise
      onComplete: () => {
        writeUserData(user?.uid || '', []);
        navigate(routePaths.greeting);
      }
    })
    .to(overlayPath, {
      duration: 1,
      ease: 'power4',
      attr: { d: paths.step2.unfilled }
    });

  return (
    <div className="flex-center mt-40">
      <button
        data-testid="btn-start-random-question"
        className="text-white"
        onClick={moveToGreeting}
        disabled={pending}
      >
        <div className="cute-cube-rotate-infinite mb-2">
          <div className="green"></div>
          <div className="pink"></div>
          <div className="blue"></div>
        </div>
        <div className="mt-4"> Tham gia ngay</div>
      </button>
    </div>
  );
};
