import { FaSpotify } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbPhoto } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { MouseEventHandler, useState } from "react";
import {
  usePomodoroVisibility,
  useSpotifyVisibility,
  useYoutubeVisibility,
} from "@/Store/visibilityStore";
import { useBackgroundImage } from "@/Store/backgroundStore";
import { backgrounds } from "@/Store/backgroundStore";
import sunset from "@/assets/background/mountain-sunset.jpg";
import cozyShop from "@/assets/background/lofi-rainy-cozy-shop.mp4";
import mountain from "@/assets/background/mountain-night-stars.jpg";

export default function SideNav() {
  let isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);
  const { isPomodoroVisible, setPomodoroVisibility } = usePomodoroVisibility();
  const { isSpotifyVisible, setSpotifyVisibility } = useSpotifyVisibility();
  const { isYoutubeVisible, setYoutubeVisibility } = useYoutubeVisibility();

  const handleOpenMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      {isDesktop ? (
        <div className="fixed top-0 left-0 h-fit w-24 mt-6 ml-4 rounded-lg flex flex-col gap-1 bg-gray-900 text-white ">
          <IconContainer
            icon={<FaSpotify size={28} />}
            tooltip="Spotify"
            isVisible={isSpotifyVisible}
            onClick={() => setSpotifyVisibility(!isSpotifyVisible)}
          />
          <IconContainer
            icon={<FaYoutube size={32} />}
            tooltip="Youtube"
            isVisible={isYoutubeVisible}
            onClick={() => setYoutubeVisibility(!isYoutubeVisible)}
          />
          <IconContainer
            icon={<MdOutlineTimer size={30} />}
            tooltip="Pomodoro"
            isVisible={isPomodoroVisible}
            onClick={() => setPomodoroVisibility(!isPomodoroVisible)}
          />
          <SettingsDialog isOpen={true} />
          <BackgroundDialog isOpen={true} />
        </div>
      ) : (
        <div className="fixed items-center justify-center top-0 left-0 h-auto w-12 mt-4 ml-2 py-3 rounded-md flex flex-col gap-2 bg-gray-800  text-white z-[999] ">
          <GiHamburgerMenu
            size={24}
            className="text-white"
            onClick={handleOpenMenu}
          />
          <IconContainer
            icon={<FaSpotify size={28} />}
            className={isOpen ? "w-full" : "hidden"}
            isVisible={isSpotifyVisible}
            onClick={() => setSpotifyVisibility(!isSpotifyVisible)}
          />
          <IconContainer
            icon={<FaYoutube size={32} />}
            className={isOpen ? "w-full" : "hidden"}
            isVisible={isYoutubeVisible}
            onClick={() => setYoutubeVisibility(!isYoutubeVisible)}
          />
          <IconContainer
            icon={<MdOutlineTimer size={32} />}
            className={isOpen ? "w-full" : "hidden"}
            isVisible={isPomodoroVisible}
            onClick={() => setPomodoroVisibility(!isPomodoroVisible)}
          />
          <SettingsDialog isOpen={isOpen} />
          <IconContainer
            icon={<TbPhoto size={32} />}
            className={isOpen ? "w-full" : "hidden"}
            isVisible={false}
          />
        </div>
      )}
    </>
  );
}

function IconContainer({
  icon,
  tooltip,
  className,
  onClick,
  isVisible,
}: {
  icon: React.ReactNode;
  tooltip?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isVisible?: boolean;
}) {
  return (
    <div
      className={`sidebar-icons group rounded-sm ${className} ${
        isVisible ? "bg-blue-600" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      {tooltip ? (
        <span className="sidebar-tooltips group-hover:scale-100">
          {tooltip}
        </span>
      ) : null}
    </div>
  );
}

function SettingsDialog({ isOpen }: { isOpen?: boolean }) {
  return (
    <>
      <Dialog>
        <DialogTrigger className={isOpen ? "" : "hidden"}>
          <IconContainer
            icon={<IoSettingsOutline size={30} />}
            tooltip="Configurações"
          />
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-white border-none ">
          <DialogHeader>
            <DialogTitle className="text-center "> Settings </DialogTitle>
            <DialogDescription className="text-white">
              Settings Page Under Construction
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

function BackgroundDialog({ isOpen }: { isOpen?: boolean }) {
  return (
    <>
      <Dialog>
        <DialogTrigger className={isOpen ? "" : "hidden"}>
          <IconContainer icon={<TbPhoto size={32} />} tooltip="Background" />
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-white border-none ">
          <DialogHeader>
            <DialogTitle className="text-center ">
              Escolha a imagem de fundo
            </DialogTitle>
            <DialogDescription className="text-white text-center"></DialogDescription>
          </DialogHeader>
          <BackgroundGrid />
        </DialogContent>
      </Dialog>
    </>
  );
}

function BackgroundGrid() {
  const { setBackgroundImg } = useBackgroundImage();
  return (
    <>
      <div className="grid grid-cols-3 gap-2 ">
        <BackgroundGridItem
          src={sunset}
          onClick={() => setBackgroundImg(sunset)}
          type="image"
        />
        <BackgroundGridItem
          src={mountain}
          onClick={() => setBackgroundImg(mountain)}
          type="image"
        />
        <BackgroundGridItem
          src={cozyShop}
          onClick={() => setBackgroundImg(cozyShop)}
          type="video"
        />
      </div>
    </>
  );
}

function BackgroundGridItem({
  src,
  onClick,
  type,
}: {
  src: string;
  onClick: MouseEventHandler<HTMLImageElement>;
  type: "image" | "video";
}) {
  if (type === "image")
    return (
      <img
        src={src}
        alt="aurora boreal background image"
        className="grid-img"
        onClick={onClick}
      />
    );
  return (
    <div onClick={onClick}>
      <video muted src={src} className="grid-img" />
    </div>
  );
}
