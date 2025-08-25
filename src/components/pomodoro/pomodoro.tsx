import React from "react";
import { Button } from "../ui/button";
import { formatDisplayTime, secondsToTime } from "@/lib/timeUtils";
import { useTimer } from "@/Hooks/useTimer";
import { useSessionManager } from "@/Hooks/useSessionManager";

function Pomodoro() {
  // Session management hook
  const sessionManager = useSessionManager();
  
  // Timer hook with session completion callback
  const timer = useTimer({
    initialTime: sessionManager.getCurrentSessionTime(),
    onComplete: sessionManager.handleSessionComplete
  });
  
  // Update timer when session type changes (only after completion)
  React.useEffect(() => {
    if (timer.currentTime === 0) {
      timer.setTime(sessionManager.getCurrentSessionTime());
    }
  }, [sessionManager.sessionType, sessionManager.breakTime, timer, sessionManager]);
  
  // Derived state for display
  const [minutes, seconds] = secondsToTime(timer.currentTime);

  // Update timer when global values change (only if not running)
  React.useEffect(() => {
    if (!timer.isRunning) {
      timer.setTime(sessionManager.getCurrentSessionTime());
    }
  }, [sessionManager.getCurrentSessionTime, timer]);

  const handleCountdownStart = () => {
    if (timer.isRunning) {
      timer.pause();
    } else {
      timer.start();
    }
  };
  
  const handleCountdownReset = () => {
    sessionManager.resetSession();
    timer.setTime(sessionManager.getCurrentSessionTime());
    timer.pause();
  };
  
  const handleBreakTimeChange = (newBreakTime: number) => {
    sessionManager.setBreakTime(newBreakTime);
    // If currently in break session and timer is not running, update the timer immediately
    if (sessionManager.sessionType === "Break" && !timer.isRunning) {
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
            onClick={() => handleBreakTimeChange(sessionManager.getShortBreakTime())}
          >
            Pausa Curta
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button
            variant="ghost"
            disabled={timer.isRunning}
            onClick={() => handleBreakTimeChange(sessionManager.getLongBreakTime())}
          >
            Pausa Longa
          </Button>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          {sessionManager.sessionType === "Study" ? "Sessão de Estudo" : "Pausa"}
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
