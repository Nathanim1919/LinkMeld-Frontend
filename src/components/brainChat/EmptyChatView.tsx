import { Bookmark, Bot, Brain, FolderPlus, Plus, Send } from "lucide-react";
import type { UIStore } from "../../stores/types";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "@tanstack/react-router";
import { useBrainStore } from "../../stores/brain-store";
import { ContextSummaryBar } from "./ContextSummaryBar";
import { useState } from "react";
import { toast } from "sonner";

export const EmptyChatView = () => {
    const navigate = useNavigate();
    const { middlePanelCollapsed, openContextSelector, showHoverCoach, hideHoverCoach } = useStore().ui as UIStore;
    const { toggleBookmark, toggleBrain, isBrainActive, isBookmarkActive, selectedModel, startConversation } = useBrainStore();
    const [message, setMessage] = useState("");

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Generate temp ID and navigate immediately for better UX
        const tempId = `temp-${Date.now()}`;

        // Navigate immediately with temp ID
        navigate({ to: `/in/brain/${tempId}` });

        // Start conversation creation in background with tempId
        try {
            await startConversation(message, tempId);
        } catch (error) {
            console.error('Failed to start conversation:', error);
            toast.error('Failed to start conversation');
            navigate({ to: `/in/brain` });
        }
    };


    return (
        <div className="h-full w-full bg-[#f4f0f0] dark:bg-[#111112]">
            <div className="flex flex-col relative h-full w-full items-center justify-center">
                <div className="flex flex-col items-center mb-4">
                    {/* <Brain className="w-80 h-80 absolute top-[10%] left-1/2 -translate-x-1/2 text-black dark:text-white opacity-2" /> */}
                    <h1 className="text-2xl font-bold text-center text-black dark:text-white">Deepen.</h1>
                </div>
                <div className={`p-1 ${middlePanelCollapsed ? "w-full md:w-[80%] lg:w-[60%]" : "w-full md:w-[80%] lg:w-[70%]"} grid place-items-center rounded-3xl relative
                `}>

                    <div className="border-1 bg-[#f6f3f3] dark:bg-[#141414] relative z-100 grid gap-0 border-gray-300 dark:border-[#1b1b1c] rounded-3xl overflow-hidden focus:border-blue-500 w-full">
                        <ContextSummaryBar />

                        <div className="border-0  rounded-t-3xl p-4 outline-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                rows={6}
                                className="w-full h-full resize-none focus:outline-none text-black dark:text-white"
                                placeholder="Start a new conversation..." />
                        </div>
                        <div className="grid grid-cols-[1fr_auto] px-2">
                            <div className="flex items-center gap-2 w-full">
                                <div
                                    onMouseEnter={(e) =>
                                        showHoverCoach("captures", e.currentTarget)
                                    }
                                    onMouseLeave={hideHoverCoach}
                                    onClick={() => openContextSelector("captures")}
                                    className="text-lg   dark:bg-[#1e1d1d] bg-[#e7e3e3] p-2 rounded-full cursor-pointer hover:opacity-100 grid place-items-center  font-medium text-black dark:text-white"><Plus /></div>
                                <div
                                    onMouseEnter={(e) =>
                                        showHoverCoach("brain", e.currentTarget)
                                    }
                                    onMouseLeave={hideHoverCoach}
                                    onClick={toggleBrain}
                                    className={`flex cursor-pointer hover:opacity-100 text-sm font-medium text-black dark:text-white items-center gap-1 opacity-50 dark:bg-[#1e1d1d] bg-[#e7e3e3] p-2 rounded-full ${isBrainActive() ? "opacity-100" : "opacity-50"}`}>
                                    <Brain className={isBrainActive() ? "text-blue-500" : ""} />
                                </div>

                                <div
                                    onMouseEnter={(e) =>
                                        showHoverCoach("collections", e.currentTarget)
                                    }
                                    onMouseLeave={hideHoverCoach}
                                    onClick={() => openContextSelector("collections")}
                                    className="flex items-center gap-1 opacity-50 cursor-pointer hover:opacity-100 text-sm font-medium text-black dark:text-white dark:bg-[#1e1d1d] bg-[#e7e3e3] px-4 py-2 rounded-full">
                                    <FolderPlus size={16} />
                                    Collections
                                </div>
                                <div
                                    onMouseEnter={(e) =>
                                        showHoverCoach("bookmarks", e.currentTarget)
                                    }
                                    onMouseLeave={hideHoverCoach}
                                    onClick={toggleBookmark}
                                    className={`flex items-center gap-1  cursor-pointer hover:opacity-100 text-sm font-medium px-4 py-2 rounded-full
                                     ${isBookmarkActive() ? "text-blue-500 dark:bg-[#9575ff]/10 bg-[#e7e3e3]" : "dark:bg-[#1e1d1d] bg-[#e7e3e3] text-black dark:text-white opacity-50"}`}>
                                    <Bookmark size={16} />
                                    Bookmarks
                                </div>

                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    onClick={() => openContextSelector("models")}
                                    className={`flex items-center gap-2  cursor-pointer hover:opacity-100 text-sm font-medium px-2 py-2 rounded-full
                                    dark:bg-[#1e1d1d] bg-[#e7e3e3] text-black dark:text-white opacity-50`}>
                                    <Bot size={16} />
                                    <span className="text-sm">
                                        {selectedModel?.name?.length && selectedModel?.name?.length > 10 ? selectedModel?.name?.slice(0, 20) + "..." : selectedModel?.name}
                                    </span>
                                </div>
                                <div className="flex items-center p-1 group justify-center w-12 h-12 rounded-full overflow-hidden border-1 border-gray-300 dark:border-gray-800">

                                    <div
                                        onClick={handleSendMessage}
                                        className="bg-gradient-to-r hover:transform hover:rotate-30 transition-all duration-300 from-red-500 to-purple-500 text-white w-full h-full rounded-full cursor-pointer grid place-items-center p-1">
                                        <Send />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};