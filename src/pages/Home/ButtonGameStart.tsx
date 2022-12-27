import gsap from 'gsap'
import React, { MutableRefObject, PropsWithChildren, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { routePaths } from '../../libs/routePaths'

import './ButtonGameStart.scss'
import { writeUserData } from "../../libs/database";
import { AuthContext } from "../../context/auth.provider";

// paths
// edit here: https://yqnn.github.io/svg-path-editor/
const paths = {
  step1: {
    unfilled: 'M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z',
    inBetween: 'M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z',
    /*
      M 0 0 h 34 c 73 7 73 94 0 100 H 0 V 0 Z
      M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z
      M 0 0 h 34 c 112 44 -32 49 0 100 H 0 V 0 Z
      */
    filled: 'M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z',
  },
  step2: {
    filled: 'M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z',
    //inBetween: 'M 100 0 H 50 c 20 33 20 67 0 100 h 50 V 0 Z',
    inBetween: 'M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z',
    unfilled: 'M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z',
  },
}

type Props = {
  overlayPath: MutableRefObject<SVGPathElement>
}

export const ButtonGameStart: React.FC<PropsWithChildren<Props>> = ({ children, overlayPath }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [page, setPage] = useState(1)
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const handleXyz = () => {
    navigate(routePaths.greeting);
    writeUserData(context.user.uid);
  }

  const pageSwitchTimeline = gsap
    .timeline({
      paused: true,
      onComplete: () => {
        setIsAnimating(false)
      },
    })
    .set(overlayPath.current, {
      attr: { d: paths.step1.unfilled },
    })
    .to(
      overlayPath.current,
      {
        duration: 0.8,
        ease: 'power3.in',
        attr: { d: paths.step1.inBetween },
      },
      0,
    )
    .to(overlayPath.current, {
      duration: 0.2,
      ease: 'power1',
      attr: { d: paths.step1.filled },
      onComplete: () => {
        navigate(routePaths.greeting)
      },
    })

    .set(overlayPath.current, {
      attr: { d: paths.step2.filled },
    })

    .to(overlayPath.current, {
      duration: 0.15,
      ease: 'sine.in',
      attr: { d: paths.step2.inBetween },
    })
    .to(overlayPath.current, {
      duration: 1,
      ease: 'power4',
      attr: { d: paths.step2.unfilled },
    })

  function reveal() {
    if (isAnimating) return
    setIsAnimating(true)
    setPage(2)
    pageSwitchTimeline.play(0)
  }

  function unReveal() {
    if (isAnimating) return
    setIsAnimating(true)
    setPage(1)
    pageSwitchTimeline.play(0)
  }

  return (
    <div className="flex-center mt-40">
      <button data-testid="btn-start-random-question" className="text-white" onClick={ handleXyz }>
        <div className="cute-cube-rotate-infinite mb-2">
          <div className="green"></div>
          <div className="pink"></div>
          <div className="blue"></div>
        </div>
        Tham gia ngay
      </button>
    </div>
  )
}
