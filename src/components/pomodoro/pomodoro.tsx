import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  useLongBreakValue,
  usePomodoroValue,
  useShortBreakValue,
} from "@/Store/valuesStore";
import { useAudioStore } from "@/Store/audioStore";

function formatDisplayTime(time: number) {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
}

function secondsToTime(seconds: number) {
  return [Math.floor(seconds / 60), seconds % 60];
}
type Session = ["Study" | "Break", Dispatch<SetStateAction<String>>];

function Pomodoro() {
  //Global States
  const { pomodoroVal } = usePomodoroValue();
  const { shortBreakVal } = useShortBreakValue();
  const { longBreakVal } = useLongBreakValue();
  // Local States
  // @ts-ignore
  const [timer, setTimer] = React.useState(pomodoroVal * 60); // Timer state in seconds that will be manipulated
  const [minutes, setMinutes] = React.useState(0); // Minutes value formated for diplay in the ui
  const [seconds, setSeconds] = React.useState(0); // Seconds value formated for diplay in the ui
  const [hasStarted, setHasStarted] = React.useState(false); // State responsible for indicating if clock is running or paused
  const [intervalId, setIntervalId] = React.useState(null) as any; // Id of the interval object used for clearing it when clock is paused
  // @ts-ignore
  const [shortBreak, setShortBreak] = React.useState(shortBreakVal * 60); // short break interval time configurable through settings
  // @ts-ignore
  const [longBreak, setLongBreak] = React.useState(longBreakVal * 60); // long break interval time configurable through settings
  const [breakTime, setBreakTime] = React.useState(shortBreak); // break time state
  const [sessionType, setSessionType] = React.useState("Study") as Session;
  // @ts-ignore
  const { sound, volume, audio } = useAudioStore();

  React.useEffect(() => {
    setTimer(pomodoroVal * 60);
    setShortBreak(shortBreakVal * 60);
    setLongBreak(longBreakVal * 60);
  }, [pomodoroVal, shortBreakVal, longBreakVal]);

  React.useEffect(() => {
    let time = secondsToTime(timer);
    setMinutes(time[0]);
    setSeconds(time[1]);
  }, [timer]);

  React.useEffect(() => {
    setHasStarted(intervalId !== null);
  }, [intervalId]);

  React.useEffect(() => {
    if (timer === 0) {
      if (sessionType === "Study") {
        // If clock run down at a study session, then start the break session
        setSessionType("Break");
        setTimer(breakTime);
        audio.volume = volume;
        audio.play();
      } else {
        // If clock run down at break session, then start the study session
        setSessionType("Study");
        setTimer(pomodoroVal);
        audio.volume = volume;
        audio.play();
      }
    }
  }, [timer]);

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
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          return 0;
        });
      }, 1000);

      setIntervalId(newIntervalId);
    }
  };
  const handleCountdownReset = () => {
    if (intervalId) clearInterval(intervalId);
    setTimer(pomodoroVal * 60);
    setIntervalId(null);
    setBreakTime(shortBreak);
  };

  return (
    <div className="widget-container">
      <div className="flex">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button
            variant="ghost"
            disabled={hasStarted}
            onClick={() => setBreakTime(shortBreak)}
          >
            Pausa Curta
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button
            variant="ghost"
            disabled={hasStarted}
            onClick={() => setBreakTime(longBreak)}
          >
            Pausa Longa
          </Button>
        </div>
      </div>
      <div className="text-7xl md:text-9xl text-center p-4 ">
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
