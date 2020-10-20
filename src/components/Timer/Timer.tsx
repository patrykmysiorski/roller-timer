import React, {useContext} from "react";
import {TimerContext} from "../../providers/timer/timerProvider";
import prettyMilliseconds from "pretty-ms";

const Timer: React.FC = () => {
  const { time, handleTimerStart, handleTimerStop } = useContext(TimerContext);
  const handleStart = () => {
    console.log("start trigger");
    handleTimerStart();
  };
  const handleStop = () => {
    console.log("stop trigger");
    handleTimerStop();
  };
  const handleReset = () => console.log("reset trigger");
  return (
    <div>
      <h1>{prettyMilliseconds(time)}</h1>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={handleReset}>reset</button>
    </div>
  );
};

export default Timer;
