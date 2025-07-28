import { PROCESSING_STATUS, type Capture } from "../types/Capture";
import { NoteHeader } from "./noteview/NoteHeader";
import { NoteMetaBox } from "./noteview/NoteMetaAccordion";
import { useUI } from "../context/UIContext";
import { useFolderContext } from "../context/FolderContext";
import { useCaptureContext } from "../context/CaptureContext";
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
import { CaptureService } from "../api/capture.api";

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
  } = useUI();

  const {
    bookmarkCapture,
    selectedCapture,
    generateCaptureSummary,
    loadingSummary,
    reProcessCapture,
    loading
  } = useCaptureContext();
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
    <div className="flex relative flex-col h-full overflow-hidden bg-[#f7f0f0] dark:bg-[#0a0a0a]">
      <div className="relative">
        <FolderList />
      </div>

      {/* Header with refined design */}
      <div className="sticky top-0 py-2 z-10 dark:bg-[#171717] backdrop-blur-2xl px-6 md:py-2">
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
                  <span className="text-sm font-medium text-black dark:text-gray-300 group-hover:text-blue-500 truncate max-w-[120px] transition-colors duration-200">
                    {capture.collection.name}
                  </span>
                </Link>
                <FiChevronRight className="text-gray-400 dark:text-gray-500/70 mx-1 flex-shrink-0" />
              </>
            )}
            <div className="flex items-center gap-1.5">
              <FiFileText className="text-amber-500 flex-shrink-0" />
              <span className="text-sm font-medium text-black/60 dark:text-gray-500 truncate max-w-[180px]">
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
              <span className="text-xs font-medium hidden md:block">
                Bookmark
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFolderListOpen?.(!isFolderListOpen)}
              className="p-2 rounded-lg cursor-pointer flex items-center gap-1 text-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all"
              title="Add to folder"
            >
              <FiFolderPlus className="w-4 h-4" />
              <span className="text-xs font-medium hidden md:block">
                Organize
              </span>
            </motion.button>
            <motion.button>
              <RiGeminiFill
                onClick={() => setOpenAiChat(!openAiChat)}
                className={`w-5 h-5 text-violet-500 cursor-pointer hover:text-violet-300`}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`mx-auto ${containerWidth} flex-1 overflow-y-auto py-2 md:px-6`}
      >
        {capture.processingStatus === PROCESSING_STATUS.ERROR ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
            <p className="text-red-500 dark:text-red-400 text-sm">
              Something went wrong while processing this capture.
              <br /> Please try again.
            </p>
            <button
              className={`px-4 py-1 font-bold cursor-pointer bg-red-500/60 text-white rounded-lg hover:bg-red-600 transition`}
              onClick={() => reProcessCapture(capture._id)}
            >
             {loading ? "Reprocessing..." : "Reprocess"}
            </button>
          </div>
        ) : capture.processingStatus === PROCESSING_STATUS.PROCESSING ? (
          <div
            className="
flex flex-col items-center justify-center h-full space-y-4 text-center
          "
          >
            <p>
              <span className="animate-pulse text-gray-500 dark:text-gray-400">
                Processing capture... <br />
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
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
          </>
        )}
      </div>
    </div>
  );
};

export default NoteView;
