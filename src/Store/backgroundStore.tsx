import CozyShop from "@/components/backgrounds/CozyShop/CozyShop";
import MountainStars from "@/components/backgrounds/MountainStars/MountainStars";
import MountainSunset from "@/components/backgrounds/MountainSunset/MountainSunset";

import cozyShop from "@/assets/background/lofi-rainy-cozy-shop.mp4";
import sunset from "@/assets/background/mountain-sunset.jpg";
import mountain from "@/assets/background/mountain-night-stars.jpg";

import { create } from "zustand";

export const backgrounds = {
  [cozyShop]: <CozyShop />,
  [mountain]: <MountainStars />,
  [sunset]: <MountainSunset />,
};

type BackgroundImageStore = {
  bgImg: JSX.Element;
  setBackgroundImg: (bg: string) => void;
};

export const useBackgroundImage = create<BackgroundImageStore>((set) => {
  return {
    bgImg: <CozyShop />,
    setBackgroundImg: (newBg: string) =>
      set(() => ({
        bgImg: backgrounds[newBg],
      })),
  };
});
