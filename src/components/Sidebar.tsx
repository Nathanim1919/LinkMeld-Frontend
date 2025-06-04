import { FiHome, FiStar, FiSearch } from "react-icons/fi";
import { BsFolder, BsTag } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineHighlight } from "react-icons/md";
import { PiBrainBold } from "react-icons/pi";
import type { JSX } from "react";

const Sidebar = () => {
  return (
    <div className="h-screen bg-black w-full text-zinc-100 flex flex-col justify-between p-4 shadow-xl overflow-hidden">
      {/* Top Section */}
      <div>
        <h1 className="text-xl font-bold mb-6">Quick Access</h1>

        <nav className="space-y-2">
          <SidebarItem icon={<FiHome />} label="Captures" />
          <SidebarItem icon={<FiStar />} label="Favorites" />
          <SidebarItem icon={<MdOutlineHighlight />} label="Highlights" />
          <SidebarItem icon={<FiSearch />} label="Smart Search" />
        </nav>

        <div className="mt-6">
          <h2 className="text-sm text-zinc-400 mb-2 uppercase">Organization</h2>
          <SidebarItem icon={<BsFolder />} label="Smart Folders" />
          <SidebarItem icon={<BsTag />} label="Tags" />
          <SidebarItem icon={<PiBrainBold />} label="Smart Clusters" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center space-x-3 mt-8 border-t pt-4 border-zinc-700">
        <FaRegUserCircle size={30} />
        <div>
          <p className="text-sm font-semibold">Thomas Williams</p>
          <p className="text-xs text-zinc-400">Personal</p>
        </div>
      </div>
    </div>
  );
};

type SidebarItemProps = {
  icon: JSX.Element;
  label: string;
};

const SidebarItem = ({ icon, label }: SidebarItemProps) => (
  <div className="flex items-center space-x-3 px-3 py-2 hover:bg-zinc-800/70 hover:backdrop-blur rounded-lg cursor-pointer transition-all duration-200">
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Sidebar;
