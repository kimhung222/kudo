import React, { useEffect, useRef, useState } from "react";
import "../../styles/home.css";
import "../../styles/home.scss";
import { ButtonGameStart } from "./ButtonGameStart";
import { onMessageListener } from "../../libs/firebase";
import { useNavigate } from "react-router-dom";

const LIGHT_BULB_COUNT = 8;

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const helloCharts = "Kudo 2022 🌟".split("");
  const descriptionCharts =
    "Nơi trao nhau những lời góp ý, yêu thương, với hy vọng mọi người sẽ trở nên tốt đẹp hơn".split(
      ""
    );
  const [hadOverlay, setHadOverlay] = useState(false);
  const overlayPathRef = useRef(null);

  useEffect(() => {
    onMessageListener().then((payload) => {
      if (payload?.notification?.body === "start_kudo") {
        navigate("/kudo");
      }
    });
  }, []);

  useEffect(() => {
    if (overlayPathRef.current) {
      setHadOverlay(true);
    }
  }, [overlayPathRef]);

  return (
    <main className="relative grid grid-cols-[100%] grid-rows-[100vh] bg-[#0c0c0d]">
      <ul className="noel-neon-light">
        {Array.from({ length: LIGHT_BULB_COUNT }).map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
      <div
        className="rounded pt-20 px-4"
        style={{
          gridArea: "1 / 1 / 2 / 2",
        }}
      >
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
        {/** @ts-expect-error Ignore type check */}
        {hadOverlay && (
          <ButtonGameStart overlayPath={overlayPathRef?.current} />
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-200px bg-noel"
        style={{
          clipPath: "polygon(0 65%, 100% 39%, 100% 100%, 0% 100%)",
        }}
      ></div>
      <svg
        id="overlay"
        className="z-1000 relative pointer-events-none w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          gridArea: "1 / 1 / 2 / 2",
        }}
      >
        <path
          ref={overlayPathRef}
          className="overlay__path"
          vectorEffect="non-scaling-stroke"
          d="M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z"
        ></path>
      </svg>
    </main>
  );
};
