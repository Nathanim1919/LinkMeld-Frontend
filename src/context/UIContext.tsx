// context/SidebarContext.tsx
import { createContext, useState, useContext } from "react";

type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  middlePanelCollapsed: boolean;
  setMiddlePanelCollapsed: (collapsed: boolean) => void;
  mainContentCollapsed: boolean;
  setMainContentCollapsed: (collapsed: boolean) => void;
  openGlobalSearch?: boolean;
  setOpenGlobalSearch?: (open: boolean) => void;
  isFolderListOpen?: boolean;
  setIsFolderListOpen?: (isOpen: boolean) => void;
  openActionBar?: boolean;
  setOpenActionBar?: (open: boolean) => void;
};

const UIContext = createContext<SidebarContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [middlePanelCollapsed, setMiddlePanelCollapsed] = useState(true);
  const [mainContentCollapsed, setMainContentCollapsed] = useState(true);
  const [openGlobalSearch, setOpenGlobalSearch] = useState(false);
  const [isFolderListOpen, setIsFolderListOpen] = useState(false);
  const [openActionBar, setOpenActionBar] = useState(false);

  return (
    <UIContext.Provider
      value={{
        collapsed,
        setCollapsed,
        middlePanelCollapsed,
        setMiddlePanelCollapsed,
        mainContentCollapsed,
        setMainContentCollapsed,
        openGlobalSearch,
        setOpenGlobalSearch,
        isFolderListOpen,
        setIsFolderListOpen,
        openActionBar,
        setOpenActionBar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};
