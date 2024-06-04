import { create } from "zustand";
import defaultSound from "@/assets/alarm.wav"
type AudioStore = {
    volume: number
    setVolume: (newVol: number) => void
    sound: string,
    setSound: (newSound: string) => void
}

export const useAudioStore = create<AudioStore>((set)=> {
    return {
        volume: 1,
        setVolume: (newVol) => set(()=> ({
            volume:newVol
        })),
        sound: defaultSound,
        setSound: (newSound) => set(()=>({
            sound: newSound
        })),
    };
});