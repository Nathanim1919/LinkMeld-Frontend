import { Outlet } from "@tanstack/react-router";
import { useStore } from "../context/StoreContext";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import type { UIStore } from "../stores/types";

export const FolderLayout: React.FC = () => {
  const { middlePanelCollapsed, setMiddlePanelCollapsed } = useStore().ui as UIStore;

  return (
    <div
      className={`bg-[#faf7f7] dark:bg-[#141416]  ${
        middlePanelCollapsed ? "p-0" : ""
      } relative border-r border-gray-200 dark:border-zinc-800 overflow-y-auto`}
    >
      <div
        className="w-8 z-1000 h-8 rounded-full cursor-pointer hover:bg-transparent text-2xl grid place-items-center hover:text-violet-500 absolute top-1 hover:opacity-45 right-0"
        onClick={() => setMiddlePanelCollapsed(!middlePanelCollapsed)}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </div>
      <Outlet />
    </div>
  );
};
