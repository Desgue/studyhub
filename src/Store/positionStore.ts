import { create } from "zustand";


type PomodoroPosStore = {
    pomodoroPos: {x: number, y:number},
    setPomodoroPos: (x:number, y:number) => void
};

type SpotifyPosStore = {
  spotifyPos: {x:number, y:number},
  setSpotifyPos: (x:number, y:number) => void
}

type YoutbePosStore = {
  youtubePos: {x:number, y:number},
  setYoutubePos: (x:number, y:number) => void
}
export const usePomodoroPos  = create<PomodoroPosStore>((set) => {
  return {
    pomodoroPos: { x: 200, y: 100 },
    setPomodoroPos: (newX: number, newY: number) =>
      set(() => ({
        pomodoroPos: {x: newX, y: newY}
      })),
  };
});


export const useSpotifyPos = create<SpotifyPosStore>((set) => {
  return {
    spotifyPos: { x: 700, y: 100 },
    setSpotifyPos: (newX: number, newY: number) =>
    set(() => ({
      spotifyPos: {x: newX, y: newY}
    })),
  };
});

export const useYoutubePos = create<YoutbePosStore>((set) => {
  return {
    youtubePos : {x: 1200, y: 100},
    setYoutubePos: (newX: number, newY: number) =>
    set(() => ({
      youtubePos: {x: newX, y: newY}
    }))
  }
})