import React, {useContext} from "react";
import './TimeDisplay.scss'
import {TimerContext} from "../../providers/timer/timerProvider";

interface IProps {
  seconds: number;
  minutes: number;
}

const TimeDisplay: React.FC<IProps> = ({ seconds, minutes }) => {
  const { isBrake } = useContext(TimerContext);
  const renderClockPart = (value: number) =>
    `${!value ? "00" : value < 10 ? `0${value}` : value}`;
  return (
    <p className={`clock ${isBrake && 'red'}`}>
      {renderClockPart(minutes)}:{renderClockPart(seconds)}
    </p>
  );
};

export default TimeDisplay;
