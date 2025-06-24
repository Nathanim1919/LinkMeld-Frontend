import { useUI } from "../context/UIContext";
import { FiHome } from "react-icons/fi";
import { BsBookmarkHeart } from "react-icons/bs";
import { MdOutlineLanguage } from "react-icons/md";
import { LuFolderOpen } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { useState, type JSX } from "react";
import { useCaptureContext } from "../context/CaptureContext";
import { IoLogOutOutline } from "react-icons/io5";
import { Brain } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { VscLoading } from "react-icons/vsc";

const navItems = [
  {
    icon: <FiHome />,
    label: "Home",
    path: "/in",
  },
  {
    icon: <BsBookmarkHeart />,
    label: "Bookmarks",
    path: "/in/bookmarks",
  },
  {
    icon: <LuFolderOpen />,
    label: "Folders",
    path: "/in/folders",
  },
  {
    icon: <MdOutlineLanguage />,
    label: "Sources",
    path: "/in/sources",
  },
];

const Sidebar: React.FC<{
  user: {
    id: string;
    email: string;
    name: string;
    token: string;
  };
}> = ({ user }) => {
  const { collapsed, setCollapsed } = useUI();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate({ to: "/login" });
        },
      },
    });
    setLoading(false);
  };

  return (
    <div
      className={`h-screen bg-[#0F0F10] \
        ${collapsed ? "w-[60px]" : "w-full"} text-zinc-100 pl-2 flex flex-col \
        relative justify-between items-center pb-4 transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center pt-4">
        <Link
          to="/in"
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-2 ${
            collapsed ? "text-2xl" : "text-lg"
          } font-bold text-violet-500`}
        >
          <Brain className="w-6 h-6" />
          {!collapsed && <span className="text-lg font-bold">Cluelet</span>}
        </Link>
      </div>
      {/* Top Nav */}
      <div className="mt-10 w-full">
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
      <div className="flex flex-col mt-auto gap-3">
        <div className="pt-6 border-t border-zinc-800">
          <Link
            onClick={() => setCollapsed(!collapsed)}
            to="/profile"
            className="flex items-center space-x-3"
          >
            <FaRegUserCircle size={30} className="text-zinc-400" />
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold leading-tight">
                  {user.name}
                </p>
              </div>
            )}
          </Link>
        </div>
        <button
          onClick={handleLogOut}
          className="flex cursor-pointer items-center gap-2 bg-gray-800 p-1 rounded-md"
        >
          {loading ? (
            <VscLoading className="animate-spin w-5 h-5 text-white" />
          ) : (
            <IoLogOutOutline />
          )}
          {!collapsed && <span>Logout</span>}
        </button>
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
  const matchRoute = useMatchRoute();
  const isActive = !!matchRoute({ to: path, exact: false });

  const handleClick = () => {
    setCollapsed(false);
    setMiddlePanelCollapsed(false);
    if (path === "/in") {
      setSelectedCapture(null); // Clear selectedCapture for Home
    }
  };

  return (
    <div className="relative w-full">
      {/* Active Background with curves */}

      <Link
        to={path}
        activeOptions={{ exact: true }}
        onClick={handleClick}
        className={`relative rounded-l-full  z-10 [&.active]:bg-[#1A1A1C] flex items-center ${
          collapsed ? "gap-0" : "gap-3"
        } px-2 py-3 transition-all w-full duration-200 
        text-sm font-medium text-zinc-400 hover:bg-zinc-950 
        [&.active]:text-violet-500 active-link`}
      >
        {isActive && (
          <>
            <b
              className="absolute w-full h-[60%] bg-[#1A1A1C] -top-6 right-0
        before:absolute before:w-full before:h-full before:bg-[#0F0F10] before:top-0 before:left-0 before:rounded-br-[40px] before:border-violet-500
        "
            ></b>
            <b
              className="absolute w-full h-[60%] bg-[#1A1A1C] -bottom-6 right-0
        before:absolute before:w-full before:h-full before:bg-[#0F0F10] before:top-0 before:left-0 before:rounded-tr-[40px]
        "
            ></b>
          </>
        )}
        <span className={`flex-shrink-0 ${collapsed ? "text-2xl" : "text-lg"}`}>
          {icon}
        </span>
        {!collapsed && (
          <span className="flex-1 hover:text-violet-500" title={label}>
            {label}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Sidebar;
