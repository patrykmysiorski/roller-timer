import React, { useState } from "react";
import Timer from "./components/Timer/Timer";
import "./App.scss";
import MainTimer from "./components/MainTimer/MainTimer";
import MainTimerProvider from "./providers/mainTimer/mainTimerProvider";
import TimerProvider from "./providers/timer/timerProvider";

const App = () => {
  const [series, setSeries] = useState(1);
  return (
    <div className="app">
      <div className="timers">
        <input
          type="number"
          placeholder="number of series"
          onChange={(e) => setSeries(Number(e.target.value))}
        />
        <MainTimerProvider series={series}>
          <TimerProvider>
            <>
              <Timer />
              <MainTimer />
            </>
          </TimerProvider>
        </MainTimerProvider>
      </div>
    </div>
  );
};

export default App;
