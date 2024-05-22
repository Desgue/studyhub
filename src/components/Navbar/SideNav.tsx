import { FaSpotify } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";

function SideNav() {
  return (
    <>
      <div className="fixed top-0 left-0 h-fit w-24 mt-6 ml-4 rounded-md flex flex-col bg-gray-900 text-white ">
        <IconContainer icon={<FaSpotify size={28} />} />
        <IconContainer icon={<FaYoutube size={32} />} />
        <IconContainer icon={<MdOutlineTimer size={30} />} />
      </div>
    </>
  );
}

export default SideNav;

function IconContainer({ icon }: { icon: React.ReactNode }) {
  return <div className="sidebar-icons">{icon}</div>;
}
