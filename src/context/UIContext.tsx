// context/SidebarContext.tsx
import { createContext, useState, useContext } from "react";

type SidebarContextType = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const UIContext = createContext<SidebarContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <UIContext.Provider value={{ collapsed, toggleCollapsed }}>
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
