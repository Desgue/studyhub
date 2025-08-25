import React from "react";
import { Button } from "../ui/button";
import {
  useLongBreakValue,
  usePomodoroValue,
  useShortBreakValue,
} from "@/Store/valuesStore";
import { useAudioStore } from "@/Store/audioStore";
import { formatDisplayTime, secondsToTime } from "@/lib/timeUtils";
import { useTimer } from "@/Hooks/useTimer";

type SessionType = "Study" | "Break";

function Pomodoro() {
  //Global States
  const { pomodoroVal } = usePomodoroValue();
  const { shortBreakVal } = useShortBreakValue();
  const { longBreakVal } = useLongBreakValue();
  const { volume, audio } = useAudioStore();
  
  // Local States
  const [breakTime, setBreakTime] = React.useState(shortBreakVal * 60);
  const [sessionType, setSessionType] = React.useState<SessionType>("Study");
  
  // Timer completion handler with session switching
  const handleTimerComplete = React.useCallback(() => {
    // Play audio notification
    audio.volume = volume;
    audio.play();
    
    // Handle session switching
    setSessionType(prev => prev === "Study" ? "Break" : "Study");
  }, [audio, volume]);
  
  // Timer hook
  const timer = useTimer({
    initialTime: pomodoroVal * 60,
    onComplete: handleTimerComplete
  });
  
  // Update timer when session type changes (only after completion)
  React.useEffect(() => {
    if (timer.currentTime === 0) {
      if (sessionType === "Study") {
        timer.setTime(pomodoroVal * 60);
      } else {
        timer.setTime(breakTime);
      }
    }
  }, [sessionType, pomodoroVal, breakTime, timer]);
  
  // Derived state for display
  const [minutes, seconds] = secondsToTime(timer.currentTime);

  // Update break time when global values change
  React.useEffect(() => {
    const newBreakTime = shortBreakVal * 60;
    setBreakTime(newBreakTime);
    // Update timer if currently in break session and not running
    if (sessionType === "Break" && !timer.isRunning) {
      timer.setTime(newBreakTime);
    }
  }, [shortBreakVal, sessionType, timer]);
  
  // Update study time when pomodoro value changes (only if not running)
  React.useEffect(() => {
    if (!timer.isRunning && sessionType === "Study") {
      timer.setTime(pomodoroVal * 60);
    }
  }, [pomodoroVal, timer, sessionType]);

  const handleCountdownStart = () => {
    if (timer.isRunning) {
      timer.pause();
    } else {
      timer.start();
    }
  };
  
  const handleCountdownReset = () => {
    setSessionType("Study");
    timer.setTime(pomodoroVal * 60);
    timer.pause();
  };
  
  const handleBreakTimeChange = (newBreakTime: number) => {
    setBreakTime(newBreakTime);
    // If currently in break session and timer is not running, update the timer immediately
    if (sessionType === "Break" && !timer.isRunning) {
      timer.setTime(newBreakTime);
    }
  };

  return (
    <div className="widget-container">
      <div className="flex">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button
            variant="ghost"
            disabled={timer.isRunning}
            onClick={() => handleBreakTimeChange(shortBreakVal * 60)}
          >
            Pausa Curta
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button
            variant="ghost"
            disabled={timer.isRunning}
            onClick={() => handleBreakTimeChange(longBreakVal * 60)}
          >
            Pausa Longa
          </Button>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          {sessionType === "Study" ? "Sessão de Estudo" : "Pausa"}
        </div>
        <div className="text-7xl md:text-9xl p-4">
          {formatDisplayTime(minutes)}:{formatDisplayTime(seconds)}
        </div>
      </div>
      <div className="flex items-center justify-center gap-1">
        <Button
          variant="ghost"
          className="hover:bg-opacity-95 mb-1"
          onClick={handleCountdownStart}
        >
          {timer.isRunning ? "Pausar" : "Iniciar"}
        </Button>

        <Button variant="ghost" className="mb-1" onClick={handleCountdownReset}>
          Resetar
        </Button>
      </div>
    </div>
  );
}

export default Pomodoro;
