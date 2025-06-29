import { useState } from "react";
import { ChatView } from "./ChatView";
import { SourcesView } from "./SourcesView";
import { useUI } from "../../context/UIContext";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";


export const AIChatContainer = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "sources">("chat");
    const {openAiChat} = useUI();

  if (!openAiChat) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
     className="flex absolute flex-col overflow-hidden right-4 h-[97%] mt-2 rounded-2xl max-w-[450px] shadow-2xl border border-[#252323] z-1000 bg-[#151313] text-gray-200">
      {/* Header */}
      <header className="px-4 py-2 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-md font-semibold tracking-tight">
          <BsStars className="inline-block mr-1 text-violet-500" />
          AI Chat
        </h1>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              activeTab === "chat" ? "bg-gray-800 text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              activeTab === "sources"
                ? "bg-gray-800 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("sources")}
          >
            Sources
          </button>
        </div>
      </header>

      {/* Dynamic Content Area */}
      <main className="flex-1 overflow-hidden">
        {activeTab === "chat" ? <ChatView /> : <SourcesView />}
      </main>
    </motion.div>
  );
};
