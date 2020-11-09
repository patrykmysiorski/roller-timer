import React, {createContext, ReactElement, useCallback, useEffect, useState,} from "react";

export const MainTimerContext = createContext({
  mainSeconds: 0,
  mainMinutes: 0,
  isActive: false,
  mainTimerStart: () => {},
  mainTimerStop: () => {},
  setMainTimer: () => {},
});

interface IProps {
  children: ReactElement;
  series: number;
}

const MainTimerProvider: React.FC<IProps> = ({ children, series }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState();

  const setMainTimer = useCallback(() => {
    const secondsInWholeTraining = series * 130;
    const initialMinutes = Math.floor(secondsInWholeTraining / 60);
    const initialSeconds = secondsInWholeTraining - initialMinutes * 60;
    setSeconds(initialSeconds);
    setMinutes(initialMinutes);
  }, [series]);

  useEffect(() => {
    setMainTimer();
  }, [setMainTimer, series]);

  const mainTimerStart = () => {
    setIsActive(true);
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    setId(intervalId);
  };

  const mainTimerStop = useCallback(() => {
    setIsActive(false);
    clearInterval(id);
  }, [id]);

  useEffect(() => {
    if (isActive && seconds === -1 && minutes > 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    }
    if (isActive && seconds === 0 && minutes === 0) {
      mainTimerStop();
      setMainTimer();
    }
  }, [setMainTimer, mainTimerStop, seconds, isActive, minutes]);

  return (
    <MainTimerContext.Provider
      value={{
        mainSeconds: seconds,
        mainMinutes: minutes,
        isActive,
        mainTimerStart,
        mainTimerStop,
        setMainTimer,
      }}
    >
      {children}
    </MainTimerContext.Provider>
  );
};

export default MainTimerProvider;
