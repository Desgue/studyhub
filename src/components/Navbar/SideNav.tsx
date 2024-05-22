import { FaSpotify } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

function SideNav() {
  return (
    <>
      <div className="fixed top-0 left-0 h-fit w-24 mt-6 ml-4 rounded-md flex flex-col bg-gray-900 text-white ">
        <IconContainer icon={<FaSpotify size={28} />} tooltip="Spotify" />
        <IconContainer icon={<FaYoutube size={32} />} tooltip="Youtube" />
        <IconContainer icon={<MdOutlineTimer size={30} />} tooltip="Pomodoro" />
        <IconContainer
          icon={<IoSettingsOutline size={30} />}
          tooltip="Configurações"
        />
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
      <span className="sidebar-tooltips group-hover:scale-100">
        {" "}
        {tooltip}{" "}
      </span>
    </div>
  );
}
