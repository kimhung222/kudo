import React, { LegacyRef, MutableRefObject, useEffect, useRef } from 'react'
import '../../styles/home.css'
import '../../styles/home.scss'
import { ButtonGameStart } from './ButtonGameStart'

const LIGHT_BULB_COUNT = 8

export const HomePage: React.FC = () => {
  const helloCharts = 'Kudo 2022 🌟'.split('')
  const descriptionCharts =
    'Nơi trao nhau những lời góp ý, yêu thương, với hy vọng mọi người sẽ trở nên tốt đẹp hơn'.split(
      '',
    )
  const overlayPathRef = useRef(null)

  useEffect(() => {
    console.log(overlayPathRef)
  }, [overlayPathRef])
  return (
    <main className="relative h-screen">
      <ul className="noel-neon-light">
        {Array.from({ length: LIGHT_BULB_COUNT }).map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
      <div className="rounded pt-20 px-4">
        <div className="text-white font-bold text-4xl text-center mb-4">
          {helloCharts.map((c, id) => (
            <span key={id}>{c}</span>
          ))}
        </div>
        <div className="text-white/80 text-base text-center">
          {descriptionCharts.map((c, id) => (
            <span key={id}>{c}</span>
          ))}
        </div>
        {overlayPathRef?.current && <ButtonGameStart overlayPath={overlayPathRef?.current} />}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-200px bg-noel"></div>
      <svg
        className="overlay relative pointer-events-none w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={overlayPathRef}
          className="overlay__path"
          vectorEffect="non-scaling-stroke"
          d="M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z"
        ></path>
      </svg>
    </main>
  )
}
