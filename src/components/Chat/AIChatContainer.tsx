// import { ChatView } from "./ChatView";
// import { SourcesView } from "./SourcesView";
import { useUI } from "../../context/UIContext";
import { motion, AnimatePresence } from "framer-motion";
import { BsStars } from "react-icons/bs";
import { X, ChevronDown } from "lucide-react";
// import { useChat } from "../../context/ChatContext";
// import { useState } from "react";
import { ChatView } from "./ChatView";
import { SourcesView } from "./SourcesView";
import { useChat } from "../../context/ChatContext";

export const AIChatContainer = () => {
  // const [activeTab, setActiveTab] = useState<"chat" | "sources">("chat");
  const { openAiChat, setOpenAiChat } = useUI();

  const { clearMessages } = useChat();

  return (
    <AnimatePresence>
      {openAiChat && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", damping: 25, stiffness: 300 },
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.95,
            transition: { duration: 0.15 },
          }}
          className="fixed shadow-2xl flex flex-col overflow-hidden right-2 md:right-4 bottom-4 top-4 rounded-2xl w-[90%] md:w-[450px] border border-gray-300 dark:border-gray-800/50 z-[1000] bg-white dark:bg-[#161618] backdrop-blur-3xl text-black dark:text-gray-200"
          style={{
            transformOrigin: "bottom right",
          }}
        >
          {/* Header with Apple-style materials */}
          <motion.header
            className="px-5 py-3 border-b border-gray-800/50 flex justify-between items-center"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-2">
              <BsStars className="text-violet-500 dark:text-blue-400/90" size={18} />
              <h1 className="text-sm font-medium tracking-tight dark:text-gray-200">
                AI Assistant
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <motion.div className="flex rounded-full bg-gray-200 dark:bg-[#1a1818]">
                <button
                  className={`px-3 cursor-pointer py-1.5 text-xs dark:text-white dark:bg-gray-700/50 rounded-l-full`}
                  // onClick={() => setActiveTab("chat")}
                >
                  Chat
                </button>
                {/* <button
                  className={`px-3 cursor-pointer py-1.5 text-xs ${
                    activeTab === "sources"
                      ? "text-white bg-gray-700/50"
                      : "text-gray-400"
                  } rounded-r-full`}
                  onClick={() => setActiveTab("sources")}
                >
                  Sources
                </button> */}
                <button
                  className={`px-3 cursor-pointer py-1.5 text-xs
                     text-gray-400 rounded-r-full`}
                  onClick={() => clearMessages()}
                >
                  Clear
                </button>
              </motion.div>

              <motion.button
                onClick={() => setOpenAiChat?.(false)}
                className="p-1.5 rounded-full text-gray-400 cursor-pointer hover:text-gray-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            </div>
          </motion.header>

          {/* Dynamic Content Area with subtle parallax effect */}
          <motion.main
            className="flex-1 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                // key={activeTab}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                <ChatView />
                {/* {activeTab === "chat" ? <ChatView /> : <SourcesView />} */}
              </motion.div>
            </AnimatePresence>
          </motion.main>

          {/* Subtle Apple-style resize handle */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-2 flex justify-center cursor-ns-resize"
            whileHover={{ opacity: 1 }}
            initial={{ opacity: 0.3 }}
          >
            <ChevronDown className="text-gray-500" size={16} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
