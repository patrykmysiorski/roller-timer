import React, {createContext, ReactElement, useState} from "react";

export const TimerContext = createContext({
  seconds: 0,
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
  }

  return (
    <TimerContext.Provider
      value={{
        seconds,
        isActive,
        handleTimerStart,
        handleTimerStop,
        handleTimerReset
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
