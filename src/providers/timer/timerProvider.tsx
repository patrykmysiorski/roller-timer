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

const soundSfx = require("../../assets/sounds/sound.mp3");
const clockTickingSfx = require("../../assets/sounds/clock-ticking.wav");

export const TimerContext = createContext({
  seconds: 10,
  minutes: 0,
  isActive: false,
  isBrake: true,
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
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

  const [playFinish] = useSound(soundSfx, { volume: 1 });
  const [playTicking] = useSound(clockTickingSfx, { volume: 1 });

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

  const resetTimer = useCallback((): void => {
    setIsBrake(false);
    setSeconds(0);
    setMinutes(2);
  }, []);

  const setTimerBrake = (): void => {
    setSeconds(10);
    setMinutes(0);
    setIsBrake(true);
  };

  useEffect(() => {
    if (mainSeconds === 0 && mainMinutes === 0) {
      stopTimer();
      setTimerBrake();
    }
    if (isActive && seconds === -1 && minutes > 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    }
    if (isActive && !isBrake && seconds === -1 && minutes === 0) {
      setTimerBrake();
      playFinish();
    }
    if (isBrake && seconds === 0) {
      resetTimer();
    }
    if (isBrake && isActive) {
      playTicking();
    }
  }, [
    resetTimer,
    stopTimer,
    playFinish,
    seconds,
    isActive,
    minutes,
    isBrake,
    mainSeconds,
    mainMinutes,
    playTicking,
  ]);

  return (
    <TimerContext.Provider
      value={{
        seconds,
        minutes,
        isActive,
        isBrake,
        startTimer,
        stopTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
