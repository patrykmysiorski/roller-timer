import React, { useContext } from "react";
import { TimerContext } from "../../providers/timer/timerProvider";

const Timer: React.FC = () => {
  const {
    seconds,
    isActive,
    handleTimerStart,
    handleTimerStop,
    handleTimerReset,
  } = useContext(TimerContext);

  const handleStart = () => {
    handleTimerStart();
  };
  const handleStop = () => {
    handleTimerStop();
  };
  const handleReset = () => {
    handleTimerReset();
  };
  return (
    <div>
      <h1>{seconds}</h1>
      {isActive ? (
        <button onClick={handleStop}>stop</button>
      ) : (
        <button onClick={handleStart}>start</button>
      )}
      <button onClick={handleReset}>reset</button>
    </div>
  );
};

export default Timer;
