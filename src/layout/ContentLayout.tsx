// layout/ContentLayout.tsx
import { Outlet } from "@tanstack/react-router";
import clsx from "clsx";
import { useUI } from "../context/UIContext";
import { useCaptureContext } from "../context/CaptureContext";
import NoteView from "../components/NoteView";
import EmptyNoteView from "../components/EmptyNoteView";

export const ContentLayout = () => {
  const { middlePanelCollapsed } = useUI();
  const { selectedCapture } = useCaptureContext();

  return (
    <div
      className={clsx(
        "h-full grid transition-all duration-300 ease-in-out",
        middlePanelCollapsed ? "grid-cols-[0fr_1fr]" : "grid-cols-[0.25fr_1fr]"
      )}
    >
      {/* Left panel (Sidebar + Panel like folders/bookmarks) */}
      <div className="bg-[#131313] p-2 border-r border-zinc-800 overflow-y-auto">
        <Outlet />
      </div>

      {/* Right panel (Note view or empty) */}
      <div className="bg-[#1d1f1d] overflow-y-auto">
        {selectedCapture ? (
          <NoteView capture={selectedCapture} />
        ) : (
          <EmptyNoteView />
        )}
      </div>
    </div>
  );
};
