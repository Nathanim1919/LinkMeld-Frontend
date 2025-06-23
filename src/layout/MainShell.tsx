// src/layout/MainShell.tsx
import { Outlet } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";
import { CaptureProvider } from "../context/CaptureContext";
import { UIProvider } from "../context/UIContext";
import { FolderProvider } from "../context/FolderContext";
import { SourceProvider } from "../context/sourceContext";

export const MainShell = () => {
  return (
    <CaptureProvider>
      <UIProvider>
        <FolderProvider>
          <SourceProvider>
            <div className="h-screen w-screen bg-black text-white grid grid-cols-[auto_1fr]">
              {/* Left Sidebar */}
              <Sidebar />

              {/* Right: Everything else (context panel + main view) */}
              <div className="overflow-hidden h-full">
                <Outlet />
              </div>
            </div>
          </SourceProvider>
        </FolderProvider>
      </UIProvider>
    </CaptureProvider>
  );
};
