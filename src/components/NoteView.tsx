import type { Capture } from "../types/Capture";
import { NoteHeader } from "./noteview/NoteHeader";
import { NoteMainText } from "./noteview/NoteMainContent";
import { NoteMetaBox } from "./noteview/NoteMetaAccordion";
import { NoteActionBar } from "./noteview/NoteSmartActions";
import { CiBookmark } from "react-icons/ci";
import { Share2 } from "lucide-react";
import { useUI } from "../context/UIContext";
import { FaFolderPlus } from "react-icons/fa6";
import { FolderList } from "./cards/FolderList";
import { FaFolder } from "react-icons/fa6";
import { CiStickyNote } from "react-icons/ci";
import { FiChevronRight, FiMoreHorizontal } from "react-icons/fi";

interface NoteViewProps {
  capture: Capture | null;
}

export const NoteView: React.FC<NoteViewProps> = ({ capture }) => {
  const {
    collapsed,
    middlePanelCollapsed,
    setIsFolderListOpen,
    isFolderListOpen,
    setOpenActionBar,
    openActionBar,
  } = useUI();

  if (!capture) {
    return (
      <div className="p-4 mx-auto flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-screen">
        <h2 className="text-xl font-semibold text-gray-300">
          No Note Selected
        </h2>
        <p className="text-gray-500">
          Please select a note to view its content.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-screen`}
    >
      <NoteActionBar />
      <FolderList />
      <div className="flex border-b py-3 border-gray-800 items-center justify-around sticky top-0  z-999 bg-[#1A1A1C]">
        <div className="relative">
          {/* Visual folder path indicator */}
          <div className="flex items-center gap-1 rounded-lg  border-gray-700 w-fit">
            {capture.collection?.name && (
              <FaFolder className="text-blue-500 dark:text-blue-400" />
            )}
            {capture.collection?.name && (
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {capture?.collection?.name.length > 20
                  ? capture.collection?.name.slice(0, 17) + "..."
                  : capture.collection?.name}
              </span>
            )}
            {capture.collection?.name && (
              <FiChevronRight className="text-gray-400 mx-1" />
            )}
            <div className="flex items-center gap-1">
              <CiStickyNote className="text-amber-500 dark:text-amber-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {capture.title.length > 50
                  ? capture.title.slice(0, 47) + "..."
                  : capture.title}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full">
          {/* Bookmark */}
          <button
            className="p-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            title="Bookmark"
          >
            <CiBookmark className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-blue-500" />
          </button>

          {/* Share */}
          <button
            className="p-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            title="Share"
            data-testid="share-button"
          >
            <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-purple-500" />
          </button>

          {/* Folder */}
          <button
            className="p-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsFolderListOpen?.(!isFolderListOpen)}
            title="Add to folder"
            data-testid="add-folder-button"
          >
            <FaFolderPlus className="w-4 h-4 text-gray-600 dark:text-gray-300 hover:text-green-500" />
          </button>

          {/* More options (three dots) */}
          <button
            onClick={() => setOpenActionBar?.(!openActionBar)}
            className="p-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            title="More options"
          >
            <FiMoreHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      <div
        className={`mx-auto ${
          collapsed && middlePanelCollapsed
            ? "w-[60%]"
            : collapsed || middlePanelCollapsed
            ? "w-[70%]"
            : "w-[80%]"
        }`}
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
              ? // this is not array but a string with comma separated values
                capture.metadata.keywords.map((tag) => tag.trim())
              : []
          }
          capturedAt={capture.metadata.capturedAt}
        />
        {/* <NoteSummary
          summary={capture.content.clean.slice(0, 200) ?? null}
          loading={!capture.content}
          onRefresh={() => {
            // maybe call your backend to regenerate summary
          }}
        /> */}

        <NoteMainText text={capture.content.clean || ""} />
        <NoteMetaBox
          domain="dev.to"
          savedAt="2025-06-01T08:15:00Z"
          wordCount={1024}
          tags={["productivity", "web3", "reading"]}
        />
      </div>
    </div>
  );
};

export default NoteView;
