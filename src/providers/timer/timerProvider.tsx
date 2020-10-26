import React, {createContext, ReactElement, useEffect, useState} from "react";

export const TimerContext = createContext({
  seconds: 0,
  minutes: 0,
  isActive: false,
  handleTimerStart: () => {},
  handleTimerStop: () => {},
  handleTimerReset: () => {},
});

interface IProps {
  children: ReactElement;
}

const TimerProvider: React.FC<IProps> = ({ children }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState();

  const handleTimerStart = () => {
    setIsActive(true);
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    setId(intervalId);
  };

  const handleTimerStop = (): void => {
    setIsActive(false);
    clearInterval(id);
  };

  const handleTimerReset = (): void => {
    setSeconds(0);
    setMinutes(0);
  };

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((minutes) => minutes + 1);
    }
  }, [seconds]);

  return (
    <TimerContext.Provider
      value={{
        seconds,
        minutes,
        isActive,
        handleTimerStart,
        handleTimerStop,
        handleTimerReset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
