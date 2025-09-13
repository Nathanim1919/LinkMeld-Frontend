import { useStore } from "../context/StoreContext";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import NotesList from "../components/NotesList";
import type { UIStore } from "../stores/types";

export const HomeLayout: React.FC = () => {
  const { middlePanelCollapsed, setMiddlePanelCollapsed } = useStore().ui as UIStore;

  return (

      <div
        className={`bg-[#faf7f7] dark:bg-[#141416] ${
          middlePanelCollapsed ? "p-0" : ""
        } relative border-r border-gray-200 dark:border-zinc-800 overflow-y-auto`}
      >
        <div
          className="w-8 h-8 z-1000 hover:text-violet-500 rounded-full cursor-pointer hover:bg-transparent text-2xl grid place-items-center absolute top-3 right-0"
          onClick={() => setMiddlePanelCollapsed(!middlePanelCollapsed)}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </div>
        <NotesList filter="all" />
      </div>
  );
};
