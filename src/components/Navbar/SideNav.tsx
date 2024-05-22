import { FaSpotify } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function SideNav() {
  return (
    <>
      <div className="fixed top-0 left-0 h-fit w-24 mt-6 ml-4 rounded-md flex flex-col bg-gray-900 text-white ">
        <IconContainer icon={<FaSpotify size={28} />} tooltip="Spotify" />
        <IconContainer icon={<FaYoutube size={32} />} tooltip="Youtube" />
        <IconContainer icon={<MdOutlineTimer size={30} />} tooltip="Pomodoro" />
        <SettingsDialog />
      </div>
    </>
  );
}

export default SideNav;

function IconContainer({
  icon,
  tooltip = "Tooltip",
}: {
  icon: React.ReactNode;
  tooltip?: string;
}) {
  return (
    <div className="sidebar-icons group">
      {icon}
      <span className="sidebar-tooltips group-hover:scale-100">{tooltip}</span>
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
