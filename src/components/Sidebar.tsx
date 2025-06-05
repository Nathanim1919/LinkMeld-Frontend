import { useState } from "react";
import { FiHome, FiStar, FiSearch } from "react-icons/fi";
import { BsFolder, BsTag } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import {
  MdOutlineHighlight,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { PiBrainBold } from "react-icons/pi";

import type { JSX } from "react";
import { useUI } from "../context/UIContext";

const Sidebar = () => {
  const { collapsed, toggleCollapsed } = useUI();

  return (
    <div
      className={`h-screen bg-black ${
        collapsed ? "w-[72px]" : "w-48"
      } text-zinc-100 flex flex-col relative justify-between p-4 shadow-xl transition-all duration-300`}
    >
      <div
        className="flex absolute border-b border-white/25 w-full py-2 top-0 items-center justify-end right-0 px-4"
        onClick={toggleCollapsed}
      >
        {collapsed ? (
          <MdKeyboardDoubleArrowRight className="cursor-pointer" />
        ) : (
          <MdKeyboardDoubleArrowLeft className="cursor-pointer" />
        )}
      </div>
      {/* Top */}
      <div className="mt-8">
        <nav className="space-y-4">
          <SidebarItem
            icon={<FiHome />}
            label="Captures"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<FiStar />}
            label="Favorites"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<MdOutlineHighlight />}
            label="Highlights"
            collapsed={collapsed}
          />
          <SidebarItem
            icon={<FiSearch />}
            label="Smart Search"
            collapsed={collapsed}
          />
        <SidebarItem
          icon={<BsFolder />}
          label="Smart Folders"
          collapsed={collapsed}
        />
        <SidebarItem icon={<BsTag />} label="Tags" collapsed={collapsed} />
        <SidebarItem
          icon={<PiBrainBold />}
          label="Smart Clusters"
          collapsed={collapsed}
        />
        </nav>

      </div>

      {/* Footer */}
      <div>
        <div className="flex items-center space-x-3 border-t pt-4 border-zinc-700">
          <FaRegUserCircle size={30} />
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">Thomas Williams</p>
              <p className="text-xs text-zinc-400">Personal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type SidebarItemProps = {
  icon: JSX.Element;
  label: string;
  collapsed: boolean;
};

const SidebarItem = ({ icon, label, collapsed }: SidebarItemProps) => (
  <div className="flex  items-center space-x-3 px-3 py-2 text-white/60 hover:text-white hover:bg-zinc-800/70 hover:backdrop-blur rounded-lg cursor-pointer transition-all duration-200">
    <span className="text-lg">{icon}</span>
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
  </div>
);

export default Sidebar;
