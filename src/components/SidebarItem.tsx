import { Link, useMatchRoute } from "@tanstack/react-router";
import { useUI } from "../context/UIContext";
import { motion } from "framer-motion";
import type { JSX } from "react";


interface SidebarItemProps {
    icon: JSX.Element;
    label: string;
    onClick?: () => void;
    path?: string;
    collapsed: boolean;
  }

export const SidebarItem = ({ icon, label, path, collapsed, onClick }: SidebarItemProps) => {
  const { setMiddlePanelCollapsed, setCollapsed } = useUI();
  const matchRoute = useMatchRoute();
  const isActive = !!matchRoute({ to: path });

  const handleClick = () => {
    setCollapsed(false);
    setMiddlePanelCollapsed(false);

    if (path === "/search" || path === "/in") {
      // If the path is "/in", we want to reset the middle panel
      setCollapsed(true);

    }
  };

  return (
    <motion.div whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
      <Link
        to={path}
        activeOptions={{ exact: true }}
        onClick= {onClick || handleClick}
        className={`relative flex text-[19px] md:text-2xl items-center ${
          collapsed ? "justify-center" : "px-2"
        } py-2 rounded-lg transition-all duration-200
        ${isActive ? "bg-gray-800/50" : ""}`}
      >
        <span
          className={`relative z-10 ${
            isActive ? "text-blue-400" : "text-gray-500"
          } ${collapsed ? "text-1xl" : "text-1xl"}`}
        >
          {icon}
        </span>
        {!collapsed && (
          <span
            className={`ml-3 text-sm md:text-md ${
              isActive ? "font-medium text-white" : "font-normal text-gray-300"
            }`}
          >
            {label}
          </span>
        )}
        {isActive && !collapsed && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-blue-400"></div>
        )}
      </Link>
    </motion.div>
  );
};