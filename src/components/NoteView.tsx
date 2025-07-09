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
import { Link, useNavigate } from "@tanstack/react-router";
import { RiGeminiFill } from "react-icons/ri";
import { doesUserHasApiKey } from "../utils/profile.util";
import { useEffect, useState, type JSX } from "react";
import { ApiKeyReminder } from "./ApiKeyReminder";
import { NoteSummarySkeleton } from "./skeleton/NoteSummarySkeleton";
import { NoteMetaBoxSkeleton } from "./skeleton/NoteMetaBoxSkeleton";
import { NoteHeaderSkeleton } from "./skeleton/NoteHeaderSkeleton";
import { Heading, Sparkles } from "lucide-react";
import React from "react";
import HeadingOutline from "./HeadingOutline";

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
    loading,
    loadingSummary,
  } = useCaptureContext();
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const { setSelectedFolder } = useFolderContext();
  const navigate = useNavigate();
  const { setMiddlePanelCollapsed } = useUI();

  useEffect(() => {
    const checkApiKey = async () => {
      const result = await doesUserHasApiKey();
      setHasApiKey(result);
    };
    checkApiKey();
  }, []);

  const containerWidth =
    collapsed && middlePanelCollapsed
      ? "w-[60%]"
      : collapsed || middlePanelCollapsed
      ? "w-[70%]"
      : "w-[80%]";

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

        {capture.headings.length > 0 && (
          <HeadingOutline headings={capture.headings} />
        )}

        <NoteMetaBox
          domain={capture.metadata.siteName || "Unknown"}
          savedAt={capture.metadata.capturedAt}
          wordCount={capture.content.clean?.length || 0}
        />

        {hasApiKey ? (
          <div className="my-6">
            <div className="flex items-center gap-3 mb-4">
              {/* Generate Summary Button */}
              <motion.button
                onClick={() => generateCaptureSummary?.(capture._id)}
                disabled={!hasApiKey || loadingSummary}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className={`
    relative flex items-center justify-center gap-2
    px-5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 ease-out
    shadow-sm backdrop-blur-md
    ${
      loadingSummary
        ? "bg-white/10 text-zinc-400 cursor-wait"
        : "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-700"
    }
    ${!hasApiKey || loadingSummary ? "opacity-60 cursor-not-allowed" : ""}
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/20
  `}
                aria-busy={loadingSummary}
                aria-label="Generate AI Summary"
              >
                {loadingSummary ? (
                  <>
                    <div className="absolute inset-0 bg-white/10 animate-pulse rounded-2xl" />
                    <Sparkles className="w-4 h-4 z-10 animate-pulse" />
                    <span className="z-10">Generating…</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {selectedCapture?.ai.summary
                        ? "Regenerate Summary"
                        : "Generate Summary"}
                    </span>
                  </>
                )}
              </motion.button>

              {/* Ask AI Button */}
              <motion.button
                disabled={!hasApiKey}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 5px 15px -3px rgba(139, 92, 246, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpenAiChat?.(true)}
                className="cursor-pointer relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-500/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg hover:shadow-violet-500/20"
              >
                <RiGeminiFill className="w-4 h-4" />
                Ask AI
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-400/40 to-purple-500/40 rounded-xl blur-sm"></div>
                </span>
              </motion.button>

              {/* Mind Map Button */}
              <motion.button
                disabled={!hasApiKey}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 5px 15px -3px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => console.log("Mind Map")}
                className="cursor-pointer relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-500/90 hover:to-teal-600/90 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20"
              >
                <FiMap className="w-4 h-4" />
                Mind Map
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/40 to-teal-500/40 rounded-xl blur-sm"></div>
                </span>
              </motion.button>
            </div>
          </div>
        ) : (
          <ApiKeyReminder onAddKey={() => navigate({ to: "/profile" })} />
        )}
        {loadingSummary ? (
          <NoteSummarySkeleton />
        ) : (
          <NoteSummary
            summary={selectedCapture?.ai.summary || null}
            captureId={capture._id}
          />
        )}
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
