
import { PROCESSING_STATUS, type Capture } from "../types/Capture";
import { NoteHeader } from "./noteview/NoteHeader";
import { NoteMetaBox } from "./noteview/NoteMetaAccordion";
import { useStore } from "../context/StoreContext";
import { useFolderContext } from "../context/FolderContext";
import { NoteSummary } from "./noteview/NoteSummary";
import { FolderList } from "./cards/FolderList";
import { motion } from "framer-motion";
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
import type { UIStore } from "../stores/types";
import { useCaptureDetail } from "../hooks/useCaptureManager";

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
    setMiddlePanelCollapsed,
    setCollapsed,
  } = useStore().ui as UIStore;


  const {
    toggleBookmark,
    generateSummary,
    isBookmarking,
    isLoading: loading,           // For reprocess button
    isGeneratingSummary: loadingSummary,  // For AI buttons
    capture: selectedCapture     // For summary display
  } = useCaptureDetail(capture._id);

  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  const { setSelectedFolder } = useFolderContext();
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
      setOpenAiChat(!openAiChat);
      setMiddlePanelCollapsed(true);
      setCollapsed(true);
    }
  };

  const containerWidth = openAiChat
    ? "w-full md:w-[90%]"
    : collapsed && middlePanelCollapsed
      ? "w-[90%] lg:w-[60%]"
      : collapsed || middlePanelCollapsed
        ? "w-[90%] md:w-[70%]"
        : "w-[90%] md:w-[80%]";

  return (
    <div className="flex relative flex-col h-full overflow-hidden bg-gray-100 dark:bg-[#111111]">
      <div className="relative">
        <FolderList />
      </div>

      {/* Header with Apple-inspired design */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-[#1b1a1a] backdrop-blur-xl px-4 py-2 shadow-sm">
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
                  className="flex items-center gap-2 group"
                >
                  <FiFolder className="text-blue-500 flex-shrink-0 w-5 h-5" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-200 group-hover:text-blue-500 truncate max-w-[140px] transition-colors duration-200">
                    {capture.collection.name}
                  </span>
                </Link>
                <FiChevronRight className="text-gray-400 dark:text-gray-500 mx-2 flex-shrink-0 w-4 h-4" />
              </>
            )}
            <div className="flex items-center gap-2">
              <FiFileText className="text-amber-500 flex-shrink-0 w-5 h-5" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                {capture.title}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleBookmark}
              disabled={isBookmarking}
              className={`py-1 px-2 border border-gray-800 rounded-full flex items-center gap-1 transition-all duration-200 ${capture.bookmarked
                ? "bg-amber-100/80 dark:bg-amber-900/30 text-amber-500"
                : "bg-gray-100/80 dark:bg-gray-800/50 text-gray-500 hover:bg-gray-200/80 dark:hover:bg-gray-700/50 cursor-pointer"
                } ${isBookmarking ? "opacity-50 cursor-not-allowed" : ""}`}
              title={capture.bookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <FiBookmark className="w-5 h-5" />
              <span className="text-sm font-medium hidden md:block">
                {capture.bookmarked ? "Bookmarked" : "Bookmark"}
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFolderListOpen?.(!isFolderListOpen)}
              className="py-1 px-2 rounded-full bg-gray-100/80 dark:bg-gray-800/50 border border-gray-800 text-gray-500 hover:bg-gray-200/80 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200 flex items-center gap-1"
              title="Add to folder"
            >
              <FiFolderPlus className="w-5 h-5" />
              <span className="text-sm font-medium hidden md:block">
                Organize
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenChat}
              className="p-1 rounded-full cursor-pointer text-violet-500 hover:bg-violet-800/20 transition-all duration-200"
            >
              <RiGeminiFill className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`mx-auto ${containerWidth} flex-1 overflow-y-auto py-4 md:px-6`}
      >
        {capture.processingStatus === PROCESSING_STATUS.ERROR ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
            <p className="text-red-500 dark:text-red-400 text-sm">
              Something went wrong while processing this capture.
              <br /> Please try again.
            </p>
            <button
              className={`px-4 py-2 font-semibold bg-red-500/80 text-white rounded-xl hover:bg-red-600 transition-all duration-200`}
              onClick={() => generateSummary()}
              disabled={loading}
            >
              {loading ? "Reprocessing..." : "Reprocess"}
            </button>
          </div>
        ) : capture.processingStatus === PROCESSING_STATUS.PROCESSING ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
            <p>
              <span className="animate-pulse text-gray-500 dark:text-gray-400">
                Processing capture... <br />
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Please wait, this may take a moment.
              </span>
            </p>
          </div>
        ) : (
          <>
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
              description={
                capture.metadata.description ||
                capture.ai.summary
                  .match(/# Context\n([\s\S]+?)(?=\n# Overview)/i)?.[1]
                  .trim() ||
                ""
              }
              tags={
                capture.metadata.keywords
                  ? capture.metadata.keywords.map((tag) => tag.trim())
                  : []
              }
              capturedAt={capture.metadata.capturedAt}
            />

            {capture.headings.length > 0 && (
              <HeadingOutline headings={capture.headings} />
            )}

            <AIbuttons
              generateCaptureSummary={generateSummary}
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
          </>
        )}
      </div>
    </div>
  );
};

export default NoteView;
