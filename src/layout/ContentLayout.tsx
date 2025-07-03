import { Outlet, useLocation } from "@tanstack/react-router";
import { CaptureDetail } from "../components/CaptureDetail";
import { useUI } from "../context/UIContext";
import clsx from "clsx";

export const ContentLayout = () => {
  const { middlePanelCollapsed } = useUI();
  const location = useLocation();

  const isSearchRoute = location.pathname === "/in";

  const gridCols = isSearchRoute
    ? "grid-cols-[1fr]"
    : middlePanelCollapsed
    ? "grid-cols-[0fr_1fr]"
    : "grid-cols-[0.3fr_1fr]";

  return (
    <div
      className={clsx(
        "h-full grid transition-all duration-300 ease-in-out",
        gridCols
      )}
    >
      {!isSearchRoute && <Outlet />}
      <CaptureDetail />
    </div>
  );
};
