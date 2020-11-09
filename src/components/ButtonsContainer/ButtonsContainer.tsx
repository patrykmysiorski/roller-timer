import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { TimerContext } from "../../providers/timer/timerProvider";
import { MainTimerContext } from "../../providers/mainTimer/mainTimerProvider";

const ButtonsContainer = () => {
  const { isActive, startTimer, stopTimer, resetTimer } = useContext(
    TimerContext
  );
  const { mainTimerStart, mainTimerStop } = useContext(MainTimerContext);
  const handleStart = () => {
    startTimer();
    mainTimerStart();
  };
  const handleStop = () => {
    mainTimerStop();
    stopTimer();
  };
  const handleReset = () => {
    resetTimer();
  };
  return (
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
  );
};

export default ButtonsContainer;
