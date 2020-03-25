import React, { useState, useEffect, useCallback, useRef } from "react";

interface PropsTypes {
  collecting: boolean;
}

const ElapsedTime: React.FC<PropsTypes> = ({ collecting }: PropsTypes) => {
  const time = useRef<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  let intervalRef = useRef<NodeJS.Timeout | null | any>(null);
  const [intervalCounter, setIntervalCounter] = useState<Number>(0);

  const increaseTime = useCallback(() => {
    time.current.setSeconds(Number(time.current.getSeconds()) + 1);
    setIntervalCounter(time.current.getSeconds());
  }, []);

  useEffect(() => {
    if (collecting) {
      time.current.setHours(0, 0, 0, 0);
      setIntervalCounter(0);
      intervalRef.current = setInterval(increaseTime, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [collecting, increaseTime]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="elapsed-time">
      {time.current.getHours()}:{time.current.getMinutes()}:
      {time.current.getSeconds()}
    </div>
  );
};

export default ElapsedTime;
