import { useUI } from "../context/UIContext";
import {
  FiHome,
  FiStar,
  FiSearch,
} from "react-icons/fi";
import {
  MdOutlineHighlight,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { BsFolder, BsTag } from "react-icons/bs";
import { PiBrainBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";

import { Link, useRouterState } from "@tanstack/react-router";
import type { JSX } from "react";

const navItems = [
  {
    icon: <FiHome />,
    label: "Captures",
    path: "/captures",
  },
  {
    icon: <FiStar />,
    label: "Favorites",
    path: "/favourites",
  },
  {
    icon: <MdOutlineHighlight />,
    label: "Highlights",
    path: "/highlights", // placeholder — you can handle this route later
  },
  {
    icon: <FiSearch />,
    label: "Smart Search",
    path: "/smart-search", // placeholder
  },
  {
    icon: <BsFolder />,
    label: "Smart Folders",
    path: "/folders",
  },
  {
    icon: <BsTag />,
    label: "Tags",
    path: "/tags",
  },
  {
    icon: <PiBrainBold />,
    label: "Smart Clusters",
    path: "/clusters",
  },
];

const Sidebar = () => {
  const { collapsed, toggleCollapsed } = useUI();
  const { location } = useRouterState();

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

      {/* Top Nav */}
      <div className="mt-8">
        <nav className="space-y-4">
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
  path: string;
  collapsed: boolean;
  active?: boolean;
};

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
      className={`flex items-center space-x-3 px-3 py-2 text-white/60 hover:text-white hover:bg-zinc-800/70 hover:backdrop-blur rounded-lg cursor-pointer transition-all duration-200 ${
        active ? "bg-zinc-800 text-white font-semibold" : ""
      }`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

export default Sidebar;
