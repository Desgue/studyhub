import { create } from "zustand";

type PomodoroVisibilityStore = {
    isPomodoroVisible: boolean
    setPomodoroVisibility: (visible: boolean) => void
}

export const usePomodoroVisibility = create<PomodoroVisibilityStore>((set)=> {
    return {
        isPomodoroVisible: true,
        setPomodoroVisibility: (visible: boolean) => set(()=> ({
            isPomodoroVisible: visible
        }))
    }
});

type SpotifyVisibilityStore = {
    isSpotifyVisible: boolean
    setSpotifyVisibility: (visible: boolean) => void
}

export const useSpotifyVisibility = create<SpotifyVisibilityStore>((set)=> {
    return {
        isSpotifyVisible: true,
        setSpotifyVisibility: (visible: boolean) => set(()=> ({
            isSpotifyVisible: visible
        }))
    }
});

type YoutubeVisibilityStore = {
    isYoutubeVisible: boolean
    setYoutubeVisibility: (visible: boolean) => void
}

export const useYoutubeVisibility = create<YoutubeVisibilityStore>((set)=> {
    return {
        isYoutubeVisible: true,
        setYoutubeVisibility: (visible: boolean) => set(()=> ({
            isYoutubeVisible: visible
        }))
    }
});

