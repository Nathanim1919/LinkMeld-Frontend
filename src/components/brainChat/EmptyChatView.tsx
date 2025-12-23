import { Bookmark, Brain, FolderPlus, Plus, Send } from "lucide-react";
import type { UIStore } from "../../stores/types";
import { useStore } from "../../context/StoreContext";
import { Link } from "@tanstack/react-router";
import { useBrainStore } from "../../stores/brain-store";

export const EmptyChatView = () => {
    const { middlePanelCollapsed, openContextSelector } = useStore().ui as UIStore;
    const { toggleBookmark, toggleBrain, isBrainActive, isBookmarkActive } = useBrainStore();
    return (
        <div className="h-full w-full bg-[#faf7f7] dark:bg-[#141416]">
            <div className="flex flex-col relative h-full w-full items-center justify-center">
                <div className="flex flex-col items-center mb-4">
                    <Brain className="w-80 h-80 absolute top-[10%] left-1/2 -translate-x-1/2 text-black dark:text-white opacity-2" />
                    <h1 className="text-2xl font-bold text-center text-black dark:text-white">Deepen.</h1>
                </div>
                <div className={`p-1 ${middlePanelCollapsed ? "w-[60%]" : "w-[70%]"} grid place-items-center rounded-3xl relative
                before:content-[''] before:absolute before:top-0 before:left-0  before:w-[40%] before:h-[50%] before:bg-gradient-to-r before:from-red-500 before:to-purple-500 before:rounded-3xl before:blur-3xl
                after:content-[''] after:absolute after:bottom-0 after:right-0 after:animate-gradient-shift after:w-[40%] after:h-[50%] after:bg-gradient-to-r after:from-red-500 after:to-violet-500 after:rounded-3xl after:blur-3xl
                `}>

                    <div className="border-1 relative z-100 grid gap-2 bg-[#faf7f7] dark:bg-[#141416] border-gray-300 dark:border-gray-800 rounded-3xl p-2 focus:border-blue-500 w-full">

                        <div className="border-0 p-2 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent">
                            <textarea
                                rows={6}    
                                className="w-full h-full resize-none focus:outline-none text-black dark:text-white"
                                placeholder="Start a new conversation..." />
                        </div>
                        <div className="grid grid-cols-[1fr_auto]">
                            <div className="flex items-center gap-2 w-full">
                                <div
                                    onClick={() => openContextSelector("captures")}
                                    className="text-lg   dark:bg-[#1e1d1d] bg-[#e7e3e3] p-2 rounded-full cursor-pointer hover:opacity-100 grid place-items-center  font-medium text-black dark:text-white"><Plus /></div>
                                <div
                                    onClick={toggleBrain}
                                    className={`flex cursor-pointer hover:opacity-100 text-sm font-medium text-black dark:text-white items-center gap-1 opacity-50 dark:bg-[#1e1d1d] bg-[#e7e3e3] p-2 rounded-full ${isBrainActive() ? "opacity-100" : "opacity-50"}`}>
                                    <Brain className={isBrainActive() ? "text-blue-500" : ""} />
                                </div>

                                <div
                                    onClick={() => openContextSelector("collections")}
                                    className="flex items-center gap-1 opacity-50 cursor-pointer hover:opacity-100 text-sm font-medium text-black dark:text-white dark:bg-[#1e1d1d] bg-[#e7e3e3] px-4 py-2 rounded-full">
                                    <FolderPlus size={16} />
                                    Collections
                                </div>
                                <div
                                    onClick={toggleBookmark}
                                    className={`flex items-center gap-1  cursor-pointer hover:opacity-100 text-sm font-medium px-4 py-2 rounded-full
                                     ${isBookmarkActive() ? "text-blue-500 dark:bg-[#9575ff]/10 bg-[#e7e3e3]" : "dark:bg-[#1e1d1d] bg-[#e7e3e3] text-black dark:text-white opacity-50"}`}>
                                    <Bookmark size={16} />
                                    Bookmarks
                                </div>
                                <div
                                    onClick={toggleBookmark}
                                    className={`flex items-center gap-1  cursor-pointer hover:opacity-100 text-sm font-medium px-4 py-2 rounded-full
                                     ${isBookmarkActive() ? "text-blue-500 dark:bg-[#9575ff]/10 bg-[#e7e3e3]" : "dark:bg-[#1e1d1d] bg-[#e7e3e3] text-black dark:text-white opacity-50"}`}>
                                    <Bookmark size={16} />
                                    gpt-5.1
                                </div>
                            </div>
                            <div className="flex items-center p-1 group justify-center w-12 h-12 rounded-full overflow-hidden border-1 border-gray-300 dark:border-gray-800">
                                <Link to="/in/brain/new" className="bg-gradient-to-r hover:transform hover:rotate-30 transition-all duration-300 from-red-500 to-purple-500 text-white w-full h-full rounded-full  cursor-pointer grid place-items-center p-1"><Send /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};