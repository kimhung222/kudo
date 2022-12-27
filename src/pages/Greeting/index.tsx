import React, { useEffect } from "react";
import { onMessageListener } from "../../libs/firebase";
import { useNavigate } from "react-router-dom";

export const GreetingPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onMessageListener().then(payload => {
      if (payload?.notification?.body === 'start_kudo') {
        navigate('/kudo');
      }
    })
  }, []);
  return <div className="mt-3 text-[red]">Greeting</div>;
};
