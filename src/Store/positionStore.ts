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
    pomodoroPos: { x: -212, y: -210 },
    setPomodoroPos: (newX: number, newY: number) =>
      set(() => ({
        pomodoroPos: {x: newX, y: newY}
      })),
  };
});


export const useSpotifyPos = create<SpotifyPosStore>((set) => {
  return {
    spotifyPos: { x: -612, y: -122 },
    setSpotifyPos: (newX: number, newY: number) =>
    set(() => ({
      spotifyPos: {x: newX, y: newY}
    })),
  };
});

export const useYoutubePos = create<YoutbePosStore>((set) => {
  return {
    youtubePos : {x: 280, y: -169},
    setYoutubePos: (newX: number, newY: number) =>
    set(() => ({
      youtubePos: {x: newX, y: newY}
    }))
  }
})