import { useUI } from "../context/UIContext";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import NotesList from "../components/NotesList";

export const HomeLayout: React.FC = () => {
  const { middlePanelCollapsed, setMiddlePanelCollapsed } = useUI();

  return (

      <div
        className={`bg-[#141416] ${
          middlePanelCollapsed ? "p-0" : ""
        } relative border-r border-zinc-800 overflow-y-auto`}
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
