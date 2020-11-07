import React, { useContext } from "react";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import { MainTimerContext } from "../../providers/mainTimer/mainTimerProvider";

const MainTimer: React.FC = () => {
  const { mainSeconds, mainMinutes } = useContext(MainTimerContext);
  return (
    <div className={"timer-container"}>
      <TimeDisplay seconds={mainSeconds} minutes={mainMinutes} />
    </div>
  );
};

export default MainTimer;
