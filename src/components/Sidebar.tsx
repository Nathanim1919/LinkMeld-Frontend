import { useUI } from "../context/UIContext";
import { FiHome } from "react-icons/fi";
import { IoMdDocument } from "react-icons/io";
import { BsBookmarkHeart } from "react-icons/bs";
import { MdKeyboardDoubleArrowLeft, MdOutlineLanguage } from "react-icons/md";
import { LuFolderOpen } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import type { JSX } from "react";
import { useCaptureContext } from "../context/CaptureContext";

const navItems = [
  {
    icon: <FiHome />,
    label: "Home",
    path: "/",
  },
  {
    icon: <IoMdDocument />,
    label: "Captures",
    path: "/captures",
  },
  {
    icon: <BsBookmarkHeart />,
    label: "Bookmarks",
    path: "/bookmarks",
  },
  {
    icon: <LuFolderOpen />,
    label: "Folders",
    path: "/folders",
  },
  {
    icon: <MdOutlineLanguage />,
    label: "Sources",
    path: "/sources",
  },
];

const Sidebar = () => {
  const { collapsed, setCollapsed } = useUI();

  return (
    <div
      className={`h-screen bg-black \
        ${collapsed ? "w-[60px]" : "w-46"} text-zinc-100 flex flex-col \
        relative justify-between items-center py-6 px-4 shadow-xl transition-all duration-300`}
    >
      {/* Collapse Toggle */}
      <div
        className="absolute top-2 right-2 p-1 cursor-pointer rounded-md hover:bg-zinc-800"
        onClick={() => setCollapsed(true)}
      >
        {!collapsed ? <MdKeyboardDoubleArrowLeft size={20} /> : null}
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
            />
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-zinc-800 mt-auto">
        <Link
          onClick={() => setCollapsed(false)}
          to="/profile"
          className="flex items-center space-x-3"
        >
          <FaRegUserCircle size={30} className="text-zinc-400" />
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold leading-tight">Nathanim T</p>
              <p className="text-xs text-zinc-500">Personal</p>
            </div>
          )}
        </Link>
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

const SidebarItem = ({ icon, label, path, collapsed }: SidebarItemProps) => {
  const { setMiddlePanelCollapsed, setCollapsed } = useUI();
  const { setSelectedCapture } = useCaptureContext(); // Add this from CaptureContext

  const handleClick = () => {
    setCollapsed(false);
    setMiddlePanelCollapsed(false);
    if (path === "/") {
      setSelectedCapture(null); // Clear selectedCapture for Home
    }
  };

  return (
    <Link
      to={path}
      activeOptions={{ exact: true }}
      onClick={handleClick}
      className={`flex items-center ${
        collapsed ? "gap-0" : "gap-3"
      } px-2 py-2 rounded-md transition-all duration-200 \
        text-sm font-medium text-zinc-400 hover:bg-zinc-950 \
       [&.active]:text-violet-500 [&.active]:bg-violet-500/10`}
    >
      <span className={`flex-shrink-0 ${collapsed ? "text-2xl" : "text-lg"}`}>
        {icon}
      </span>
      {!collapsed && (
        <span className={`flex-1  hover:text-violet-500`} title={label}>
          {label}
        </span>
      )}
    </Link>
  );
};

export default Sidebar;
