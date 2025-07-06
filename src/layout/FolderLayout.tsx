import { Outlet } from "@tanstack/react-router";
import { useUI } from "../context/UIContext";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

export const FolderLayout: React.FC = () => {
  const { middlePanelCollapsed, setMiddlePanelCollapsed } = useUI();

  return (
    <div
      className={`bg-[#1A1A1C] ${
        middlePanelCollapsed ? "p-0" : "p-2"
      } relative border-r border-zinc-800 overflow-y-auto`}
    >
      <div
        className="w-8 z-1000 h-8 rounded-full cursor-pointer hover:bg-transparent text-2xl grid place-items-center absolute top-1 hover:opacity-45 right-0"
        onClick={() => setMiddlePanelCollapsed(!middlePanelCollapsed)}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </div>
      <Outlet />
    </div>
  );
};
