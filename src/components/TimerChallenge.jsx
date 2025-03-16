import { useRef, useState } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const timer = useRef();
  const resultDialog = useRef();

  function handleStart() {
    setTimerStarted(!timerStarted);
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      resultDialog.current.open();
    }, targetTime * 1000);
  }

  function handleStop() {
    setTimerStarted(!timerStarted);
    clearTimeout(timer.current);
  }

  return (
    <>
      <ResultModal ref={resultDialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
