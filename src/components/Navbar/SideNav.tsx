import { FaSpotify } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { useState } from "react";

export default function SideNav() {
  let isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      {isDesktop ? (
        <div className="fixed top-0 left-0 h-fit w-24 mt-6 ml-4 rounded-md flex flex-col bg-gray-900 text-white ">
          <IconContainer icon={<FaSpotify size={28} />} tooltip="Spotify" />
          <IconContainer icon={<FaYoutube size={32} />} tooltip="Youtube" />
          <IconContainer
            icon={<MdOutlineTimer size={30} />}
            tooltip="Pomodoro"
          />
          <SettingsDialog />
        </div>
      ) : (
        <div className="fixed items-center justify-center top-0 left-0 h-fit w-12 mt-4 ml-2 py-3 rounded-md flex flex-col gap-8 bg-gray-800  text-white ">
          <GiHamburgerMenu
            size={24}
            className="text-white"
            onClick={handleOpenMenu}
          />
          <IconContainer
            icon={<FaSpotify size={28} />}
            className={isOpen ? "" : "hidden"}
          />
          <IconContainer
            icon={<FaYoutube size={32} />}
            className={isOpen ? "" : "hidden"}
          />

          <MdOutlineTimer size={30} className={isOpen ? "" : "hidden"} />
        </div>
      )}
    </>
  );
}

function IconContainer({
  icon,
  tooltip = "Tooltip",
  className,
}: {
  icon: React.ReactNode;
  tooltip?: string;
  className?: string;
}) {
  return (
    <div className={`sidebar-icons group ${className}`}>
      {icon}
      {tooltip ? (
        <span className="sidebar-tooltips group-hover:scale-100">
          {tooltip}
        </span>
      ) : null}
    </div>
  );
}

function SettingsDialog() {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <IconContainer
            icon={<IoSettingsOutline size={30} />}
            tooltip="Configurações"
          />
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-white border-none ">
          <DialogHeader>
            <DialogTitle className="text-center "> Settings </DialogTitle>
            <DialogDescription className="text-white">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
