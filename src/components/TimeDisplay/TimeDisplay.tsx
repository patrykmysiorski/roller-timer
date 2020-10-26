import React, { useContext } from "react";
import { TimerContext } from "../../providers/timer/timerProvider";

const TimeDisplay: React.FC = () => {
  const { seconds, minutes } = useContext(TimerContext);
  const renderClockPart = (value: number) =>
    `${!value ? "00" : value < 10 ? `0${value}` : value}`;
  return (
    <p>
      {renderClockPart(minutes)}:{renderClockPart(seconds)}
    </p>
  );
};

export default TimeDisplay;
