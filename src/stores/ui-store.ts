import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UIStore } from "./types";

export const useUIStore = create<UIStore>()(
    persist(
        (set, get) => ({
            collapsed: false,
            middlePanelCollapsed: false,
            mainContentCollapsed: false,
            openGlobalSearch: false,
            isFolderListOpen: false,
            openActionBar: false,
            openAiChat: false,
            expandAiChat: false,
            theme: "dark",

            // UI Actions
            // Actions
            setCollapsed: (collapsed) => set({ collapsed }),
            setMiddlePanelCollapsed: (middlePanelCollapsed) => set({ middlePanelCollapsed }),
            setMainContentCollapsed: (mainContentCollapsed) => set({ mainContentCollapsed }),
            setOpenGlobalSearch: (openGlobalSearch) => set({ openGlobalSearch }),
            setIsFolderListOpen: (isFolderListOpen) => set({ isFolderListOpen }),
            setOpenActionBar: (openActionBar) => set({ openActionBar }),
            setOpenAiChat: (openAiChat) => set({ openAiChat }),
            setExpandAiChat: (expandAiChat) => set({ expandAiChat }),
            setTheme: (theme) => {
                set({ theme });
                // Apply theme to DOM
                if (typeof document !== "undefined") {
                    document.documentElement.classList.remove("light", "dark");
                    document.documentElement.classList.add(theme);
                }
            },

            // Convenience methods
            toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed })),
            toggleMiddlePanel: () => set((state) => ({ middlePanelCollapsed: !state.middlePanelCollapsed })),
            toggleMainContent: () => set((state) => ({ mainContentCollapsed: !state.mainContentCollapsed })),
            toggleGlobalSearch: () => set((state) => ({ openGlobalSearch: !state.openGlobalSearch })),
            toggleAiChat: () => set((state) => ({ openAiChat: !state.openAiChat })),
            closeAllModals: () => set({ openGlobalSearch: false, isFolderListOpen: false, openActionBar: false, openAiChat: false, expandAiChat: false }),
        }),
        {
            name: "ui-store",  // local storage key
            partialize: (state) => ({
                theme: state.theme,
                collapsed: state.collapsed,
                middlePanelCollapsed: state.middlePanelCollapsed,
                mainContentCollapsed: state.mainContentCollapsed,
                openGlobalSearch: state.openGlobalSearch,
                isFolderListOpen: state.isFolderListOpen,
                openActionBar: state.openActionBar,
                openAiChat: state.openAiChat,
                expandAiChat: state.expandAiChat,
            })
        }
    )
);