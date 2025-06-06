import { useUI } from "../context/UIContext";
import {
  FiHome,
  FiSearch,
} from "react-icons/fi";
import { BsBookmarkHeart, BsTag } from "react-icons/bs";
import { TbHighlight } from "react-icons/tb";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdOutlineLanguage,
} from "react-icons/md";
import { LuFolderOpen } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";

import { Link, useRouterState } from "@tanstack/react-router";
import type { JSX } from "react";

const navItems = [
  {
    icon: <FiHome />, // Consider replacing with custom icon if brandable
    label: "Captures",
    path: "/captures",
  },
  {
    icon: <BsBookmarkHeart />,
    label: "Bookmarks",
    path: "/bookmarks",
  },
  {
    icon: <TbHighlight />,
    label: "Highlights",
    path: "/highlights",
  },
  {
    icon: <FiSearch />,
    label: "Search",
    path: "/search",
  },
  {
    icon: <LuFolderOpen />,
    label: "Folders",
    path: "/folders",
  },
  {
    icon: <BsTag />,
    label: "Tags",
    path: "/tags",
  },
  {
    icon: <MdOutlineLanguage />,
    label: "Sources",
    path: "/sources",
  },
  
  {
    icon: <HiOutlineSparkles />,
    label: "Smart Clusters",
    path: "/clusters",
  },
];

const Sidebar = () => {
  const { collapsed, toggleCollapsed } = useUI();
  const { location } = useRouterState();

  return (
    <div
      className={`h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 \
        ${collapsed ? "w-[72px]" : "w-46"} text-zinc-100 flex flex-col \
        relative justify-between py-6 px-4 shadow-xl transition-all duration-300`}
    >
      {/* Collapse Toggle */}
      <div
        className="absolute top-2 right-2 p-1 cursor-pointer rounded-md hover:bg-zinc-800"
        onClick={toggleCollapsed}
      >
        {collapsed ? (
          <MdKeyboardDoubleArrowRight size={20} />
        ) : (
          <MdKeyboardDoubleArrowLeft size={20} />
        )}
      </div>

      {/* Top Nav */}
      <div className="mt-10">
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              collapsed={collapsed}
              active={location.pathname.startsWith(item.path)}
            />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-zinc-800 mt-auto">
        <div className="flex items-center space-x-3">
          <FaRegUserCircle size={30} className="text-zinc-400" />
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold leading-tight">Nathanim T</p>
              <p className="text-xs text-zinc-500">Personal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: JSX.Element;
  label: string;
  path: string;
  collapsed: boolean;
  active?: boolean;
}

const SidebarItem = ({
  icon,
  label,
  path,
  collapsed,
  active,
}: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={`flex items-center ${collapsed?'gap-0':'gap-3'} px-2 py-2 rounded-md transition-all duration-200 \
        text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/80 \
        ${active ? "bg-zinc-800 text-white" : ""}`}
    >
      <span
        className={`flex-shrink-0 ${collapsed ? "text-2xl" : "text-lg"}  ${active ? "text-violet-500" : "text-zinc-400"}`}
      >{icon}</span>
      {!collapsed && <span
        className={`flex-1 ${active ? "text-violet-500" : "text-zinc-400"}`}
        title={label}
      >{label}</span>}
    </Link>
  );
};

export default Sidebar;
