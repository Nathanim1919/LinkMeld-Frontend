// layout/ContentLayout.tsx
import { Outlet } from "@tanstack/react-router";
import clsx from "clsx";
import { useUI } from "../context/UIContext";
import { useCaptureContext } from "../context/CaptureContext";
import NoteView from "../components/NoteView";
import EmptyNoteView from "../components/EmptyNoteView";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";


export const ContentLayout = () => {
  const { middlePanelCollapsed, setMiddlePanelCollapsed } = useUI();
  const { selectedCapture } = useCaptureContext();

  return (
    <div
      className={clsx(
        "h-full grid transition-all duration-300 ease-in-out",
        middlePanelCollapsed ? "grid-cols-[0fr_1fr]" : "grid-cols-[0.3fr_1fr]"
      )}
    >
      {/* Left panel (Sidebar + Panel like folders/bookmarks) */}
      <div className={`bg-[#1A1A1C] ${middlePanelCollapsed ? "p-0" : "p-2"} relative border-r border-zinc-800 overflow-y-auto`}>
        <div className="w-8 h-8 bg-violet-500/10 rounded-full cursor-pointer hover:bg-transparent text-2xl grid place-items-center absolute top-3 right-2"
        onClick={() => setMiddlePanelCollapsed(!middlePanelCollapsed)}
        >
          <MdOutlineKeyboardDoubleArrowLeft/>
        </div>
        <Outlet />
      </div>

      {/* Right panel (Note view or empty) */}
      <div className="bg-[#161617] overflow-y-auto">
        {selectedCapture ? (
          <NoteView capture={selectedCapture} />
        ) : (
          <EmptyNoteView />
        )}
      </div>
    </div>
  );
};
