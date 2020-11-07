import React, { useContext } from "react";
import "./Timer.scss";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import ButtonsContainer from "../ButtonsContainer/ButtonsContainer";
import { TimerContext } from "../../providers/timer/timerProvider";

const Timer: React.FC = () => {
  const { seconds, minutes } = useContext(TimerContext);
  return (
    <div className={"timer-container"}>
      <TimeDisplay seconds={seconds} minutes={minutes} />
      <ButtonsContainer />
    </div>
  );
};

export default Timer;
