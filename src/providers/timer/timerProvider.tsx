import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useSound from "use-sound";
import { MainTimerContext } from "../mainTimer/mainTimerProvider";

const soundSfx = require("../../assets/sound.mp3");

export const TimerContext = createContext({
  seconds: 10,
  minutes: 0,
  isActive: false,
  isBrake: true,
  handleTimerStart: () => {},
  handleTimerStop: () => {},
  handleTimerReset: () => {},
});

interface IProps {
  children: ReactElement;
}

const TimerProvider: React.FC<IProps> = ({ children }) => {
  const [seconds, setSeconds] = useState(10);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBrake, setIsBrake] = useState(true);
  const [id, setId] = useState();

  const [play] = useSound(soundSfx, { volume: 1 });

  const { mainSeconds, mainMinutes } = useContext(MainTimerContext);

  const startTimer = () => {
    setIsActive(true);
    const intervalId = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    setId(intervalId);
  };

  const stopTimer = useCallback((): void => {
    setIsActive(false);
    clearInterval(id);
  }, [id]);

  const handleTimerReset = useCallback((): void => {
    setIsBrake(false);
    setSeconds(0);
    setMinutes(2);
  }, []);

  const handleTimerSetToBrake = (): void => {
    setSeconds(10);
    setMinutes(0);
    setIsBrake(true);
  };

  useEffect(() => {
    if (mainSeconds === 0 && mainMinutes === 0) {
      stopTimer();
      handleTimerSetToBrake();
    }
    if (isActive && seconds === -1 && minutes > 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    }
    if (isActive && !isBrake && seconds === -1 && minutes === 0) {
      handleTimerSetToBrake();
      play();
    }
    if (isBrake && seconds === 0) {
      handleTimerReset();
    }
  }, [
    handleTimerReset,
    stopTimer,
    play,
    seconds,
    isActive,
    minutes,
    isBrake,
    mainSeconds,
    mainMinutes,
  ]);

  return (
    <TimerContext.Provider
      value={{
        seconds,
        minutes,
        isActive,
        isBrake,
        handleTimerStart: startTimer,
        handleTimerStop: stopTimer,
        handleTimerReset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
