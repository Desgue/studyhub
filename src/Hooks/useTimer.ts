import { useState, useEffect, useRef, useCallback } from "react";

interface UseTimerProps {
  initialTime: number;
  onComplete?: () => void;
}

interface UseTimerReturn {
  currentTime: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setTime: (time: number) => void;
}

export function useTimer({ initialTime, onComplete }: UseTimerProps): UseTimerReturn {
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (currentTime === 0 && onComplete) {
      onComplete();
      pause();
    }
  }, [currentTime, onComplete, pause]);

  const start = useCallback(() => {
    if (intervalRef.current) return; // Already running
    
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    pause();
    setCurrentTime(initialTime);
  }, [pause, initialTime]);

  const setTime = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentTime,
    isRunning,
    start,
    pause,
    reset,
    setTime,
  };
}