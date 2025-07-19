import { PROCESSING_STATUS, type Capture } from "../types/Capture";
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
  FiFileText,
} from "react-icons/fi";
import { Link, useNavigate } from "@tanstack/react-router";
import { RiGeminiFill } from "react-icons/ri";
import { doesUserHasApiKey } from "../utils/profile.util";
import { useEffect, useState } from "react";
import { NoteSummarySkeleton } from "./skeleton/NoteSummarySkeleton";
import React from "react";
import HeadingOutline from "./HeadingOutline";
import { AIbuttons } from "./buttons/AIbutton";
import { toast } from "sonner";

interface NoteViewProps {
  capture: Capture;
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

  const {
    bookmarkCapture,
    selectedCapture,
    generateCaptureSummary,
    loadingSummary,
  } = useCaptureContext();
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const { setSelectedFolder } = useFolderContext();
  const { setMiddlePanelCollapsed, setCollapsed } = useUI();
  const navigate = useNavigate();

  useEffect(() => {
    const checkApiKey = async () => {
      const result = await doesUserHasApiKey();
      setHasApiKey(result);
    };
    checkApiKey();
  }, []);

  const handleOpenChat = () => {
    if (!hasApiKey) {
      toast.error("Please add an API key to use AI features.");
      navigate({ to: "/profile" });
      return;
    } else {
      setOpenAiChat(true);
      setMiddlePanelCollapsed(true);
      setCollapsed(true);
    }
  };

  const containerWidth =
    collapsed && middlePanelCollapsed
      ? "w-[90%] md:w-[60%]"
      : collapsed || middlePanelCollapsed
      ? "w-[90%] md:w-[70%]"
      : "w-[90%] md:w-[80%]";

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]">
      <AnimatePresence>{openAiChat && <AIChatContainer />}</AnimatePresence>
      <FolderList />

      {/* Header with refined design */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-[#0a0a0a] backdrop-blur-2xl px-6 md:py-2">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center overflow-hidden">
            {capture.collection?.name && (
              <>
                <Link
                  to={`/in/collections/${capture.collection._id}`}
                  onClick={() => {
                    setSelectedFolder({
                      ...capture.collection,
                      captures: [],
                      createdAt: "",
                      updatedAt: "",
                    });
                    setMiddlePanelCollapsed(false);
                  }}
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
              <span className="text-sm font-medium text-gray-900 dark:text-gray-500 truncate max-w-[180px]">
                {capture.title}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center md:gap-2">
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
              <span className="text-xs font-medium hidden md:block">Bookmark</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFolderListOpen?.(!isFolderListOpen)}
              className="p-2 rounded-lg cursor-pointer flex items-center gap-1 text-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all"
              title="Add to folder"
            >
              <FiFolderPlus className="w-4 h-4" />
              <span className="text-xs font-medium hidden md:block">Organize</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`mx-auto ${containerWidth} flex-1 overflow-y-auto py-2 md:px-6`}
      >
        {capture.processingStatus === PROCESSING_STATUS.PROCESSING ? (
          <div className="flex flex-col items-center justify-center z-40 h-full space-y-6 px-4 fixed w-full top-0 left-0 bg-white/80 dark:bg-[#1A1A1C]/80 backdrop-blur-xl">
            {/* Animated gradient orb (subtle floating animation) */}
            <div className="relative">
              {/* <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 animate-[pulse_2.5s_ease-in-out_infinite] shadow-sm shadow-indigo-100/50">
                <div className="absolute inset-4 rounded-full bg-white/30 backdrop-blur-sm border border-white/20"></div>
              </div> */}
              
              {/* Micro-interaction dots (Apple-style) */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-indigo-300/70 animate-bounce"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '1.2s'
                    }}
                  />
                ))}
              </div>
            </div>
        
            {/* Dynamic status text with smooth transitions */}
            <div className="text-center space-y-1 max-w-md">
              <h3 className="text-lg font-medium text-gray-800 tracking-tight">
                Processing your capture...
              </h3>
              <p className="text-sm text-gray-500 font-light tracking-wide transition-all duration-300">
                {['Extracting key concepts', 'Identifying main arguments', 'Structuring insights'][Math.floor(Date.now() / 1000) % 3]}
                <span className="dot-flashing ml-1.5 inline-block relative h-2 w-2">
                  <span className="absolute top-0 w-1 h-1 rounded-full bg-gray-400"></span>
                </span>
              </p>
            </div>


                <span>Please refresh the page...</span>
          </div>
        )
          : (
          <NoteHeader
          collection={
            capture.collection
              ? {
                  name: capture.collection.name,
                  id: capture.collection._id,
                }
              : { name: "Uncategorized", id: "uncategorized" }
          }

          isPdf={capture.metadata.isPdf || false}
          title={capture.title}
          url={capture.url || ""}
          description={capture.metadata.description || capture.ai.summary.match(/# Context\n([\s\S]+?)(?=\n# Overview)/i)?.[1].trim() || ""}
          tags={
            capture.metadata.keywords
              ? capture.metadata.keywords.map((tag) => tag.trim())
              : []
          }
          capturedAt={capture.metadata.capturedAt}
        />
        )}

        {capture.headings.length > 0 && (
          <HeadingOutline headings={capture.headings} />
        )}

        <AIbuttons
          generateCaptureSummary={generateCaptureSummary}
          hasApiKey={hasApiKey}
          loadingSummary={loadingSummary}
          handleOpenChat={handleOpenChat}
        />

        {loadingSummary ? (
          <NoteSummarySkeleton />
        ) : (
          <NoteSummary
            summary={selectedCapture?.ai.summary || null}
            captureId={capture._id}
          />
        )}
        <NoteMetaBox
          domain={capture.metadata.siteName || "Unknown"}
          savedAt={capture.metadata.capturedAt}
          wordCount={capture.content.clean?.length || 0}
        />
      </div>

      {/* Floating AI Button - Refined design */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenChat}
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
