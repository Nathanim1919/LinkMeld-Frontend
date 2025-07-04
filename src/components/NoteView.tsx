import type { Capture } from "../types/Capture";
import { NoteHeader } from "./noteview/NoteHeader";
import { NoteMetaBox } from "./noteview/NoteMetaAccordion";
import { useUI } from "../context/UIContext";
import { useFolderContext } from "../context/FolderContext";
import { useCaptureContext } from "../context/CaptureContext";
import { NoteSummary } from "./noteview/NoteSummary";
import { FolderList } from "./cards/FolderList";
import { AIChatContainer } from "./Chat/AIChatContainer";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBookmark,
  FiFolderPlus,
  FiFolder,
  FiChevronRight,
  FiZap,
  FiMap,
  FiFileText,
} from "react-icons/fi";
import { Link } from "@tanstack/react-router";
import { RiGeminiFill } from "react-icons/ri";
import { useState } from "react";

interface NoteViewProps {
  capture: Capture | null;
}

const NoteView: React.FC<NoteViewProps> = ({ capture }) => {
  const {
    collapsed,
    middlePanelCollapsed,
    setIsFolderListOpen,
    isFolderListOpen,
    openAiChat,
    setOpenAiChat,
  } = useUI();

  const { setSelectedFolder } = useFolderContext();
  const { bookmarkCapture, generateCaptureSummary, loading } = useCaptureContext();


  

  if (!capture) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#fafafa] dark:bg-[#0a0a0a]">
        <motion.div
          className="w-16 h-16 rounded-full bg-gray-200/70 dark:bg-gray-800/30 flex items-center justify-center mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <FiFileText className="text-gray-500 text-2xl" />
        </motion.div>
        <motion.h2
          className="text-xl font-medium text-gray-800 dark:text-gray-300 mb-2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          No Note Selected
        </motion.h2>
        <motion.p
          className="text-gray-500 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Select a note from your collection to view its contents
        </motion.p>
      </div>
    );
  }

  const containerWidth =
    collapsed && middlePanelCollapsed
      ? "w-[60%]"
      : collapsed || middlePanelCollapsed
      ? "w-[70%]"
      : "w-[80%]";

  // Apple-inspired action buttons
  const primaryActions = [
    {
      icon: <FiZap className="w-4 h-4" />,
      label: "Summarize",
      action: () => generateCaptureSummary?.(capture._id),
      color: "text-blue-500",
    },
    {
      icon: <RiGeminiFill className="w-4 h-4" />,
      label: "Ask AI",
      action: () => setOpenAiChat?.(true),
      color: "text-purple-500",
    },
    {
      icon: <FiMap className="w-4 h-4" />,
      label: "Mind Map",
      action: () => console.log("Mind Map"),
      color: "text-green-500",
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]">
      <AnimatePresence>{openAiChat && <AIChatContainer />}</AnimatePresence>
      <FolderList />

      {/* Header with refined design */}
      <div className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800/30 bg-white/80 dark:bg-[#1A1A1C]/80 backdrop-blur-2xl px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center overflow-hidden">
            {capture.collection?.name && (
              <>
                <Link
                  to={`/in/folders/${capture.collection._id}`}
                  onClick={() =>
                    setSelectedFolder({
                      ...capture.collection,
                      captures: [],
                      createdAt: "",
                      updatedAt: "",
                    })
                  }
                  className="flex items-center gap-1.5 group"
                >
                  <FiFolder className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 truncate max-w-[120px] transition-colors duration-200">
                    {capture.collection.name}
                  </span>
                </Link>
                <FiChevronRight className="text-gray-400 dark:text-gray-500/70 mx-1 flex-shrink-0" />
              </>
            )}
            <div className="flex items-center gap-1.5">
              <FiFileText className="text-amber-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate max-w-[180px]">
                {capture.title}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                bookmarkCapture?.(capture._id);
              }}
              className={`p-2 cursor-pointer rounded-lg transition-all flex items-center gap-1 ${
                capture.bookmarked
                  ? "bg-amber-100/50 dark:bg-amber-900/10 text-amber-500"
                  : "text-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              }`}
              title={capture.bookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <FiBookmark className="w-4 h-4" />
              <span className="text-xs font-medium">Bookmark</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFolderListOpen?.(!isFolderListOpen)}
              className="p-2 rounded-lg cursor-pointer flex items-center gap-1 text-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all"
              title="Add to folder"
            >
              <FiFolderPlus className="w-4 h-4" />
              <span className="text-xs font-medium">Organize</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`mx-auto ${containerWidth} flex-1 overflow-y-auto py-8 px-6`}
      >
        <NoteHeader
          collection={
            capture.collection
              ? {
                  name: capture.collection.name,
                  id: capture.collection._id,
                }
              : { name: "Uncategorized", id: "uncategorized" }
          }
          title={capture.title}
          description={capture.metadata.description || ""}
          tags={
            capture.metadata.keywords
              ? capture.metadata.keywords.map((tag) => tag.trim())
              : []
          }
          capturedAt={capture.metadata.capturedAt}
        />
        {loading && (
          <div>
            Loading...
          </div>
        )}
       {(capture.ai.summary && !loading) && <NoteSummary
           summary={capture.ai.summary || ""}
           loading={false}
           onQuestionClick={() => console.log("Ask AI")}

        />}

        {/* AI Action Buttons - Apple-style segmented control */}
        <div className="my-6">
          <div className="flex items-center gap-2 mb-4">
            {primaryActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={action.action}
                className={`flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  action.color || "text-gray-700 dark:text-gray-300"
                } bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50`}
              >
                {action.icon}
                {action.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content and Metadata */}
        <NoteMetaBox
          domain={capture.metadata.siteName || "Unknown"}
          savedAt={capture.metadata.capturedAt}
          wordCount={capture.content.clean?.length || 0}
          tags={capture.metadata.keywords || []}
        />
      </div>

      {/* Floating AI Button - Refined design */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpenAiChat?.(!openAiChat)}
        className={`fixed z-30 bottom-6 cursor-pointer right-6 p-3.5 rounded-full shadow-lg ${
          openAiChat
            ? "bg-gray-200/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-700/50 backdrop-blur-md"
            : "bg-gradient-to-br from-blue-500 to-blue-600 backdrop-blur-md"
        } transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        title="AI Assistant"
      >
        <RiGeminiFill
          className={`w-5 h-5 ${
            openAiChat ? "text-gray-700 dark:text-gray-300" : "text-white"
          }`}
        />
        {!openAiChat && (
          <motion.div
            className="absolute inset-0 rounded-full border border-white/30 pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default NoteView;
