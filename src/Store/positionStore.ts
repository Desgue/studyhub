import { create } from "zustand";


type PomodoroPosStore = {
    pomodoroPos: {x: number, y:number},
    setPomodoroPos: (x:number, y:number) => void
};
export const usePomodoroPos  = create<PomodoroPosStore>((set) => {
  return {
    pomodoroPos: { x: -612, y: -210 },
    setPomodoroPos: (newX: number, newY: number) =>
      set(() => ({
        pomodoroPos: {x: newX, y: newY}
      })),
  };
});
