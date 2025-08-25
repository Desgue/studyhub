import React, { useCallback, useMemo, useEffect } from "react";
import { Button } from "../ui/button";
import { formatDisplayTime, secondsToTime } from "@/lib/timeUtils";
import { useTimer } from "@/Hooks/useTimer";
import { useSessionManager } from "@/Hooks/useSessionManager";

function Pomodoro() {
  // Session management hook
  const sessionManager = useSessionManager();
  
  // Memoize the initial time to prevent unnecessary re-renders
  const initialTime = useMemo(() => 
    sessionManager.getCurrentSessionTime(), 
    [sessionManager.getCurrentSessionTime]
  );
  
  // Timer hook with session completion callback
  const timer = useTimer({
    initialTime,
    onComplete: sessionManager.handleSessionComplete
  });
  
  // Update timer when session type changes (only after completion)
  useEffect(() => {
    if (timer.currentTime === 0) {
      timer.setTime(sessionManager.getCurrentSessionTime());
    }
  }, [sessionManager.sessionType, sessionManager.breakTime, timer.setTime, sessionManager.getCurrentSessionTime]);
  
  // Update timer when global values change (only if not running)
  useEffect(() => {
    if (!timer.isRunning) {
      timer.setTime(sessionManager.getCurrentSessionTime());
    }
  }, [sessionManager.getCurrentSessionTime, timer.isRunning, timer.setTime]);
  
  // Memoized derived state for display
  const displayTime = useMemo(() => {
    const [minutes, seconds] = secondsToTime(timer.currentTime);
    return {
      formattedMinutes: formatDisplayTime(minutes),
      formattedSeconds: formatDisplayTime(seconds)
    };
  }, [timer.currentTime]);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleCountdownStart = useCallback(() => {
    if (timer.isRunning) {
      timer.pause();
    } else {
      timer.start();
    }
  }, [timer.isRunning, timer.pause, timer.start]);
  
  const handleCountdownReset = useCallback(() => {
    sessionManager.resetSession();
    timer.setTime(sessionManager.getCurrentSessionTime());
    timer.pause();
  }, [sessionManager.resetSession, sessionManager.getCurrentSessionTime, timer.setTime, timer.pause]);
  
  const handleShortBreak = useCallback(() => {
    const shortBreakTime = sessionManager.getShortBreakTime();
    sessionManager.setBreakTime(shortBreakTime);
    // If currently in break session and timer is not running, update the timer immediately
    if (sessionManager.sessionType === "Break" && !timer.isRunning) {
      timer.setTime(shortBreakTime);
    }
  }, [sessionManager.getShortBreakTime, sessionManager.setBreakTime, sessionManager.sessionType, timer.isRunning, timer.setTime]);
  
  const handleLongBreak = useCallback(() => {
    const longBreakTime = sessionManager.getLongBreakTime();
    sessionManager.setBreakTime(longBreakTime);
    // If currently in break session and timer is not running, update the timer immediately
    if (sessionManager.sessionType === "Break" && !timer.isRunning) {
      timer.setTime(longBreakTime);
    }
  }, [sessionManager.getLongBreakTime, sessionManager.setBreakTime, sessionManager.sessionType, timer.isRunning, timer.setTime]);
  
  // Memoized session type display text
  const sessionTypeText = useMemo(() => 
    sessionManager.sessionType === "Study" ? "Sessão de Estudo" : "Pausa",
    [sessionManager.sessionType]
  );
  
  // Memoized button text
  const startButtonText = useMemo(() => 
    timer.isRunning ? "Pausar" : "Iniciar",
    [timer.isRunning]
  );

  return (
    <div className="widget-container">
      {/* Break Time Selection */}
      <div className="flex">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button
            variant="ghost"
            disabled={timer.isRunning}
            onClick={handleShortBreak}
          >
            Pausa Curta
          </Button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <Button
            variant="ghost"
            disabled={timer.isRunning}
            onClick={handleLongBreak}
          >
            Pausa Longa
          </Button>
        </div>
      </div>
      
      {/* Timer Display */}
      <div className="text-center">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          {sessionTypeText}
        </div>
        <div className="text-7xl md:text-9xl p-4">
          {displayTime.formattedMinutes}:{displayTime.formattedSeconds}
        </div>
      </div>
      
      {/* Timer Controls */}
      <div className="flex items-center justify-center gap-1">
        <Button
          variant="ghost"
          className="hover:bg-opacity-95 mb-1"
          onClick={handleCountdownStart}
        >
          {startButtonText}
        </Button>
        <Button 
          variant="ghost" 
          className="mb-1" 
          onClick={handleCountdownReset}
        >
          Resetar
        </Button>
      </div>
    </div>
  );
}

export default Pomodoro;
