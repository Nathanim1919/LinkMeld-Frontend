import type { Capture } from "../types/Capture";
import { NoteHeader } from "./noteview/NoteHeader";
import { NoteMetaBox } from "./noteview/NoteMetaAccordion";
import { CiBookmark } from "react-icons/ci";
import { useUI } from "../context/UIContext";
import { FaFolderPlus, FaFolder } from "react-icons/fa6";
import { FolderList } from "./cards/FolderList";
import { CiStickyNote } from "react-icons/ci";
import { FiChevronRight } from "react-icons/fi";
import { Link, useParams } from "@tanstack/react-router";
import { useFolderContext } from "../context/FolderContext";
import { useCaptureContext } from "../context/CaptureContext";
import { NoteSummary } from "./noteview/NoteSummary";
import { RiGeminiFill } from "react-icons/ri";
import { AIChatContainer } from "./Chat/AIChatContainer";
import { motion, AnimatePresence } from "framer-motion";
import { use, useEffect } from "react";

interface NoteViewProps {
  capture: Capture | null;
}

export const NoteView: React.FC<NoteViewProps> = ({ capture }) => {
  const {
    collapsed,
    middlePanelCollapsed,
    setIsFolderListOpen,
    isFolderListOpen,
    openAiChat,
    setOpenAiChat
  } = useUI();


  console.log(capture)

  const { setSelectedFolder } = useFolderContext();
  const { bookmarkCapture, getCapture } = useCaptureContext();

  
  if (!capture) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#0a0a0a]">
        <motion.div
          className="w-16 h-16 rounded-full bg-gray-800/30 flex items-center justify-center mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <CiStickyNote className="text-gray-500 text-2xl" />
        </motion.div>
        <motion.h2
          className="text-xl font-medium text-gray-300 mb-2"
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

  const containerWidth = collapsed && middlePanelCollapsed 
    ? "w-[60%]" 
    : collapsed || middlePanelCollapsed 
      ? "w-[70%]" 
      : "w-[80%]";

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0a0a0a]">
      <AnimatePresence>
        {openAiChat && <AIChatContainer />}
      </AnimatePresence>
      
      <FolderList />

      {/* Premium Header with Glass Morphism */}
      <div className="sticky top-0 z-10 border-b border-gray-800/30 bg-[#1A1A1C] backdrop-blur-2xl px-6 py-3">
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
                  <FaFolder className="text-blue-400/90 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400/90 truncate max-w-[120px] transition-colors duration-300">
                    {capture.collection.name}
                  </span>
                </Link>
                <FiChevronRight className="text-gray-500/70 mx-1 flex-shrink-0" />
              </>
            )}
            <div className="flex items-center gap-1.5">
              <CiStickyNote className="text-amber-400/90 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-200 truncate max-w-[180px]">
                {capture.title}
              </span>
            </div>
          </div>

          {/* Action Buttons with Micro-interactions */}
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                bookmarkCapture?.(capture._id);
              }}
              className={`p-2 rounded-full transition-all ${
                capture.bookmarked
                  ? "text-amber-400/90 bg-amber-900/10"
                  : "text-gray-400 hover:bg-gray-800/50"
              }`}
              title={capture.bookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <CiBookmark className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFolderListOpen?.(!isFolderListOpen)}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-800/50 transition-all"
              title="Add to folder"
            >
              <FaFolderPlus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content with Perfect Typography */}
      <div className={`mx-auto ${containerWidth} flex-1 overflow-y-auto py-8 px-6`}>
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

        <div className="my-10">
          <NoteSummary
            summary={capture.ai.summary ?? null}
            loading={!capture.content}
            onQuestionClick={() => setOpenAiChat?.(true)}
          />
        </div>

        <NoteMetaBox
          domain={capture.metadata.siteName || "Unknown"}
          savedAt={capture.metadata.capturedAt}
          wordCount={capture.content?.length || 0}
          tags={capture.metadata.keywords || []}
        />
      </div>

      {/* Premium AI Assistant Floating Button */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpenAiChat?.(!openAiChat)}
        className={`fixed z-30 bottom-6 cursor-pointer right-6 p-3.5 rounded-full shadow-xl ${
          openAiChat 
            ? "bg-gray-800/90 border border-gray-700/50 backdrop-blur-md" 
            : "bg-gradient-to-br from-blue-500/90 to-blue-600/90 backdrop-blur-md"
        } transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        title="AI Assistant"
      >
        <RiGeminiFill className={`w-6 h-6 ${
          openAiChat ? "text-gray-300/90" : "text-white"
        }`} />
        {!openAiChat && (
          <motion.div
            className="absolute inset-0 rounded-full border border-blue-400/30 pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default NoteView;