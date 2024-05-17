import React from "react";
import { Button } from "../ui/button";
import useCountDown from "@/hooks/userCountdown";

function formatDisplayTime(time: number) {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
}

function secondsToTime(seconds: number) {
  return [Math.floor(seconds / 60), seconds % 60];
}
const DEFAULT_POMODORO = 1500;
const DEFAULT_SHORT_BREAK = 300;
const DEFAULT_LONG_BREAK = 900;

function Pomodoro() {
  const [pomodoroTimer, setPomodoroTimer] = React.useState(DEFAULT_POMODORO); // Pomodoro countdown timer in seconds
  const [timer, setTimer] = React.useState(pomodoroTimer); // Timer state in seconds that will be manipulated
  const [minutes, setMinutes] = React.useState(0); // Minutes value formated for diplay in the ui
  const [seconds, setSeconds] = React.useState(0); // Seconds value formated for diplay in the ui
  const [hasStarted, setHasStarted] = React.useState(false); // State responsible for indicating if clock is running or paused
  const [intervalId, setIntervalId] = React.useState(null) as any; // Id of the interval object used for clearing it when clock is paused

  React.useEffect(() => {
    let time = secondsToTime(timer);
    setMinutes(time[0]);
    setSeconds(time[1]);
  }, [timer]);

  React.useEffect(() => {
    setHasStarted(intervalId !== null);
  }, [intervalId]);

  const handleCountdownStart = () => {
    // Click on button when timer is running should pause it
    if (hasStarted) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
    } else {
      // Click on button when timer is paused should initiate it
      const newIntervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      setIntervalId(newIntervalId);
    }
  };
  const handleCountdownReset = () => {};

  return (
    <div className="text-center">
      <div className="text-right px-1"> x</div>
      <div className="flex">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button variant="ghost" disabled={hasStarted}>
            Pausa Curta
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button variant="ghost" disabled={hasStarted}>
            Pausa Longa
          </Button>
        </div>
      </div>
      <div className="text-9xl p-4">
        {formatDisplayTime(minutes)}:{formatDisplayTime(seconds)}
      </div>
      <div className="flex items-center justify-center gap-1">
        <Button
          variant="ghost"
          className="hover:bg-opacity-95 mb-1"
          onClick={handleCountdownStart}
        >
          {hasStarted ? "Pausar" : "Iniciar"}
        </Button>

        <Button variant="ghost" className="mb-1" onClick={handleCountdownReset}>
          Resetar
        </Button>
      </div>
    </div>
  );
}

export default Pomodoro;
