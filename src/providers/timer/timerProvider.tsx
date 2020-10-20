import React, { createContext, ReactElement, useEffect, useState } from "react";

export const TimerContext = createContext({
  time: 0,
  isOn: false,
  handleTimerStart: () => {},
  handleTimerStop: () => {},
});

interface IProps {
  children: ReactElement;
}

const TimerProvider: React.FC<IProps> = ({ children }) => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleTimerStart = (): void => {
    setIsActive(true);
    // setMilliseconds(milliseconds);
    // setInterval(() => setMilliseconds((milliseconds) => milliseconds + 1), 1);
  };

  const handleTimerStop = (): void => {
    setIsActive(false);
  };

  useEffect(() => {
    let interval: any = undefined;
    if (isActive) {
      interval = setInterval(
        () => setMilliseconds((milliseconds) => milliseconds + 1),
        1
      );
    } else if (!isActive && milliseconds !== 0) {
      // clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, milliseconds]);

  return (
    <TimerContext.Provider
      value={{
        time: milliseconds,
        isOn: isActive,
        handleTimerStart,
        handleTimerStop,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
