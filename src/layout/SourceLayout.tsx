import { Outlet } from "@tanstack/react-router";
import { useUI } from "../context/UIContext";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

export const SourceLayout: React.FC = () => {
  const { middlePanelCollapsed, setMiddlePanelCollapsed } = useUI();

  return (
    <div
      className={`bg-[#141416] ${
        middlePanelCollapsed ? "p-0" : ""
      } relative border-r border-zinc-800 overflow-y-auto`}
    >
      <div
        className="w-8 z-1000 hover:text-violet-500 h-8 rounded-full cursor-pointer hover:bg-transparent text-2xl grid place-items-center absolute top-3 right-0"
        onClick={() => setMiddlePanelCollapsed(!middlePanelCollapsed)}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </div>
      <Outlet />
    </div>
  );
};
