// src/layout/MainShell.tsx
import { Outlet } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";

export const MainShell = () => {
  return (
    <div className="h-screen w-screen bg-black text-white grid grid-cols-[auto_1fr]">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Right: Everything else (context panel + main view) */}
      <div className="overflow-hidden h-full">
        <Outlet />
      </div>
    </div>
  );
};
