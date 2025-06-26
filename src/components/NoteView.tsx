import { FaExternalLinkAlt } from "react-icons/fa";
import type { Capture } from "../types/Capture";
import { NoteHeader } from "./noteview/NoteHeader";
import { NoteSummary } from "./noteview/NoteSummary";
import { NoteMainText } from "./noteview/NoteMainContent";
import { NoteMetaBox } from "./noteview/NoteMetaAccordion";
import { NoteActionBar } from "./noteview/NoteSmartActions";
import { CiBookmark } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Share2 } from "lucide-react";
import { useUI } from "../context/UIContext";
import { FaFolderPlus } from "react-icons/fa6";
import { FolderList } from "./cards/FolderList";
import { FaFolder } from "react-icons/fa6";
import { CiStickyNote } from "react-icons/ci";
import { FiChevronRight } from "react-icons/fi";

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
  } = useUI();

  console.log("Rendering NoteView with capture:", capture);

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
      <div className="flex border-b border-gray-800 items-center justify-around sticky top-0  z-1000 bg-[#1A1A1C] py-2 px-4">
        <div className="relative">
          {/* Visual folder path indicator */}
          <div className="flex items-center gap-1 px-3 py-2 rounded-lg  dark:border-gray-700 w-fit">
           {capture.collection?.name && <FaFolder className="text-blue-500 dark:text-blue-400" />}
            {capture.collection?.name && <span className="font-medium text-gray-700 dark:text-gray-300">
              {capture?.collection?.name.length > 20
                ? capture.collection?.name.slice(0, 17) + "..."
                : capture.collection?.name}
            </span>}
          {capture.collection?.name &&  <FiChevronRight className="text-gray-400 mx-1" />}
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
        <div className="flex self-end items-center justify-between gap-3 relative z-100">
          <CiBookmark className=" cursor-pointer text-gray-300 w-6 h-6 p-1 bg-gray-800 relative z-100  hover:text-white" />
          <RiDeleteBin6Line className=" cursor-pointer text-gray-300 w-6 h-6 p-1 bg-gray-800 relative z-100  hover:text-white" />
          <Share2
            onClick={() => setOpenActionBar?.(true)}
            data-testid="share-button"
            className=" cursor-pointer text-gray-300 w-6 h-6 p-1 bg-gray-800 relative z-100  hover:text-white"
          />
          <FaFolderPlus
            onClick={() => setIsFolderListOpen?.(!isFolderListOpen)}
            data-testid="add-folder-button"
            className=" cursor-pointer text-gray-300 w-6 h-6 p-1 bg-gray-800 relative z-100  hover:text-white"
          />
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
        <NoteSummary
          summary={capture.content.clean.slice(0, 200) ?? null}
          loading={!capture.content}
          onRefresh={() => {
            // maybe call your backend to regenerate summary
          }}
        />

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
