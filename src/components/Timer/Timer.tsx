import React, { useContext } from "react";
import { TimerContext } from "../../providers/timer/timerProvider";
import "./Timer.scss";
import Button from "@material-ui/core/Button";
import TimeDisplay from "../TimeDisplay/TimeDisplay";

const Timer: React.FC = () => {
  const {
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
    <div className={"timer-container"}>
      <TimeDisplay />
      <div className="buttons-container">
        {isActive ? (
          <Button variant="contained" color="secondary" onClick={handleStop}>
            STOP
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleStart}>
            START
          </Button>
        )}

        <Button variant="contained" color="default" onClick={handleReset}>
          RESET
        </Button>
      </div>
    </div>
  );
};

export default Timer;
