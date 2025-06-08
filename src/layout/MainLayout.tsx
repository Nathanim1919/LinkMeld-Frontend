import EmptyNoteView from "../components/EmptyNoteView";
import NoteView from "../components/NoteView";
import Sidebar from "../components/Sidebar";
import { IoSearch } from "react-icons/io5";
import { useCaptureContext } from "../context/CaptureContext";
import { useUI } from "../context/UIContext";
import { MiddlePanel } from "../components/MiddlePanel";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import clsx from "clsx";

export const MainLayout: React.FC = () => {
  const { selectedCapture } = useCaptureContext();
  const { collapsed, middlePanelCollapsed, setMiddlePanelCollapsed } = useUI();

  const gridCols = clsx(
    "grid transition-all duration-300 ease-in-out text-white bg-black h-full w-full overflow-hidden",
    {
      "lg:grid-cols-[0fr_0fr_1fr]": collapsed && middlePanelCollapsed,
      "lg:grid-cols-[0fr_0.3fr_1fr]": collapsed && !middlePanelCollapsed,
      "lg:grid-cols-[0.15fr_0fr_1fr]": !collapsed && middlePanelCollapsed,
      "lg:grid-cols-[0.15fr_0.3fr_1fr]": !collapsed && !middlePanelCollapsed,
    }
  );

  return (
    <section className={gridCols}>
      <Sidebar />
      {/* Middle Panel */}
      <div
        className={clsx(
          "bg-[#131413] h-screen flex flex-col text-zinc-100 transition-width duration-100",
          middlePanelCollapsed ? "w-[50px]" : "w-full"
        )}
      >
        <div className="flex items-center justify-between p-2 relative">
          <div
            className={`flex relative rounded-full pl-2 mt-2 self-start bg-[#1d1f1d] items-center justify-between 
              ${middlePanelCollapsed ? "w-8 h-8" : "w-[90%]"}
               mx-auto cursor-pointer`}
            onClick={() => setMiddlePanelCollapsed(false)}
          >
            <IoSearch className="text-[17px]"/>
            {!middlePanelCollapsed && (
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full p-[8px] text-sm outline-0 bg-transparent"
              />
            )}
          </div>
          {!middlePanelCollapsed && (
            <button
              className="cursor-pointer w-8 h-8 text-2xl absolute -right-4 z-1000 grid place-items-center bg-white/10 backdrop-blur-2xl rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setMiddlePanelCollapsed(true)}
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <MdKeyboardDoubleArrowLeft />
            </button>
          )}
        </div>
        <MiddlePanel />
      </div>

      <div className="bg-[#1d1f1d] overflow-y-auto h-screen">
        {!selectedCapture ? (
          <EmptyNoteView />
        ) : (
          <NoteView capture={selectedCapture} />
        )}
      </div>
    </section>
  );
};

export default MainLayout;
