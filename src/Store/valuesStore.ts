import { create } from "zustand";

type PomodoroValueStore = {
    pomodoroVal: number,
    defaultPomodoro: number,
    setPomodoroVal: (newVal: number) => void
}
type ShortBreakValueStore = {
    shortBreakVal: number,
    setShortBreakVal: (newVal: number) => void
}
type LongBreakValueStore = {
    longBreakVal: number,
    setLongBreakVal: (newVal: number) => void
}

type TimerValueStore = {
    timer: number,
    setTimerVal: (newVal: number) => void
}

export const usePomodoroValue = create<PomodoroValueStore>((set) => {
    return {
        pomodoroVal: 25  ,
        defaultPomodoro: 25 ,
        setPomodoroVal: (newVal) => set(() => ({
            pomodoroVal: newVal
        }))
    }
})

export const useShortBreakValue = create<ShortBreakValueStore>((set) => {
    return {
        shortBreakVal: 5,
        setShortBreakVal: (newVal) => set(() => ({
            shortBreakVal: newVal
        }))
    }
})

export const useLongBreakValue = create<LongBreakValueStore>((set) => {
    return {
        longBreakVal: 5,
        setLongBreakVal: (newVal) => set(() => ({
            longBreakVal: newVal
        }))
    }
})

export const useTimer = create<TimerValueStore>((set) => {
    return {
        timer: 25 * 60,
        setTimerVal: (newVal) => set(()=> ({
            timer: newVal
        }))
    }
})