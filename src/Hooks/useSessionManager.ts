import { useState, useCallback, useEffect } from "react";
import { useAudioStore } from "@/Store/audioStore";
import {
  useLongBreakValue,
  usePomodoroValue,
  useShortBreakValue,
} from "@/Store/valuesStore";

type SessionType = "Study" | "Break";

interface UseSessionManagerReturn {
  sessionType: SessionType;
  breakTime: number;
  getCurrentSessionTime: () => number;
  handleSessionComplete: () => void;
  resetSession: () => void;
  setBreakTime: (time: number) => void;
  getShortBreakTime: () => number;
  getLongBreakTime: () => number;
}

export function useSessionManager(): UseSessionManagerReturn {
  // Global store values
  const { pomodoroVal } = usePomodoroValue();
  const { shortBreakVal } = useShortBreakValue();
  const { longBreakVal } = useLongBreakValue();
  const { volume, audio } = useAudioStore();

  // Local session state
  const [sessionType, setSessionType] = useState<SessionType>("Study");
  const [breakTime, setBreakTime] = useState(shortBreakVal * 60);

  // Update break time when global short break value changes
  useEffect(() => {
    setBreakTime(shortBreakVal * 60);
  }, [shortBreakVal]);

  // Get current session time based on session type
  const getCurrentSessionTime = useCallback(() => {
    if (sessionType === "Study") {
      return pomodoroVal * 60;
    }
    return breakTime;
  }, [sessionType, pomodoroVal, breakTime]);

  // Handle session completion with audio and session switching
  const handleSessionComplete = useCallback(() => {
    // Play audio notification
    audio.volume = volume;
    audio.play();
    
    // Switch session type
    setSessionType(prev => prev === "Study" ? "Break" : "Study");
  }, [audio, volume]);

  // Reset session to initial state
  const resetSession = useCallback(() => {
    setSessionType("Study");
  }, []);

  // Get short break time in seconds
  const getShortBreakTime = useCallback(() => {
    return shortBreakVal * 60;
  }, [shortBreakVal]);

  // Get long break time in seconds
  const getLongBreakTime = useCallback(() => {
    return longBreakVal * 60;
  }, [longBreakVal]);

  return {
    sessionType,
    breakTime,
    getCurrentSessionTime,
    handleSessionComplete,
    resetSession,
    setBreakTime,
    getShortBreakTime,
    getLongBreakTime,
  };
}