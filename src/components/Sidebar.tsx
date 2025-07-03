import { useUI } from "../context/UIContext";
import { BsBookmarkHeart } from "react-icons/bs";
import { MdOutlineLanguage } from "react-icons/md";
import { LuFolderOpen } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type JSX } from "react";
import { useCaptureContext } from "../context/CaptureContext";
import { IoLogOutOutline } from "react-icons/io5";
import { Brain } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { VscLoading } from "react-icons/vsc";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SidebarItem } from "./SidebarItem";
import { IoSearch } from "react-icons/io5";
import { IoDocumentsOutline } from "react-icons/io5";

const navItems = [
  {
    icon: <IoDocumentsOutline />,
    label: "Captures",
    path: "/in/captures",
  },
  {
    icon: <BsBookmarkHeart />,
    label: "Bookmarks",
    path: "/in/bookmarks",
  },
  {
    icon: <IoSearch />,
    label: "Search",
    path: "/in",
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
  const { setSelectedCapture } = useCaptureContext();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setLoading(true);
    await authClient
      .signOut({
        fetchOptions: {
          onSuccess: () => {
            navigate({ to: "/login" });
          },
        },
      })
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch(() => {
        toast.error("Error occured when logging out");
      });
    setLoading(false);
  };

  return (
    <motion.div
      className={`h-screen bg-[#161618] border-r border-gray-800/40
        ${collapsed ? "w-16" : "w-42"} text-gray-300 flex flex-col
        relative justify-between pb-6 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="pt-6 w-full px-4">
        <div
          onClick={() => {
            setCollapsed(!collapsed);
            setSelectedCapture(null);
          }}
          className={`flex cursor-pointer items-center gap-3 ${
            collapsed ? "justify-center" : "px-2"
          }`}
        >
          <div className="p-2 bg-gray-700/50 rounded-lg backdrop-blur-sm">
            <Brain className="w-5 h-5 text-gray-300" />
          </div>
          {!collapsed && (
            <span className="text-lg font-medium text-gray-200">Lnkd.</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 w-full px-2">
        <nav className="flex flex-col gap-2">
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

      {/* User & Logout */}
      <div className="flex flex-col w-full px-2 gap-1 mt-auto">
        <div className="pt-2 border-t border-gray-800/40">
          <Link
            onClick={() => setCollapsed(!collapsed)}
            to="/profile"
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-800/40 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <div className="relative">
              <FaRegUserCircle size={20} className="text-gray-400" />
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-gray-900"></span>
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-gray-300 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            )}
          </Link>
        </div>
        <motion.button
          onClick={handleLogOut}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {loading ? (
            <VscLoading className="animate-spin w-5 h-5 text-gray-400" />
          ) : (
            <IoLogOutOutline className="w-5 h-5 text-gray-400" />
          )}
          {!collapsed && <span className="text-sm text-gray-400">Logout</span>}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
