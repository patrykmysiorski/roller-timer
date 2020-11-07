import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { TimerContext } from "../../providers/timer/timerProvider";
import { MainTimerContext } from "../../providers/mainTimer/mainTimerProvider";

const ButtonsContainer = () => {
  const {
    isActive,
    handleTimerStart,
    handleTimerStop,
    handleTimerReset,
  } = useContext(TimerContext);
  const { mainTimerStart, mainTimerStop } = useContext(MainTimerContext);
  const handleStart = () => {
    handleTimerStart();
    mainTimerStart();
  };
  const handleStop = () => {
    mainTimerStop();
    handleTimerStop();
  };
  const handleReset = () => {
    handleTimerReset();
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
