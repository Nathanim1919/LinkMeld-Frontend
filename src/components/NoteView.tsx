import type { Capture } from "../types/Capture";
import { NoteHeader } from "./noteview/NoteHeader";
import { NoteMetaBox } from "./noteview/NoteMetaAccordion";
import { NoteActionBar } from "./noteview/NoteSmartActions";
import { CiBookmark } from "react-icons/ci";
import { useUI } from "../context/UIContext";
import { FaFolderPlus } from "react-icons/fa6";
import { FolderList } from "./cards/FolderList";
import { FaFolder } from "react-icons/fa6";
import { CiStickyNote } from "react-icons/ci";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "@tanstack/react-router";
import { useFolderContext } from "../context/FolderContext";
import { useCaptureContext } from "../context/CaptureContext";
import { NoteSummary } from "./noteview/NoteSummary";
import { RiGeminiFill } from "react-icons/ri";
import { AIChatContainer } from "./Chat/AIChatContainer";

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
  const { setSelectedFolder } = useFolderContext();
  const { bookmarkCapture } = useCaptureContext();
  const {openAiChat, setOpenAiChat} = useUI();

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
      {/* <NoteActionBar /> */}
      <AIChatContainer />
      <FolderList />
      <div className="flex border-b py-3 border-gray-800 items-center justify-around sticky top-0  z-999 bg-[#1A1A1C]">
        <div className="relative">
          {/* Visual folder path indicator */}
          <div className="flex items-center gap-1 rounded-lg  border-gray-700 w-fit">
            {capture.collection?.name && (
              <FaFolder className="text-blue-500 dark:text-blue-400" />
            )}
            {capture.collection?.name && (
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
                className="font-medium hover:text-violet-600 hover:underline text-gray-700 dark:text-gray-300"
              >
                {capture?.collection?.name.length > 20
                  ? capture.collection?.name.slice(0, 17) + "..."
                  : capture.collection?.name}
              </Link>
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
        <div className="flex items-center gap-2 text-2xl rounded-full">
          {/* Bookmark */}
          <button
            onClick={(e) => {
              e.preventDefault();
              bookmarkCapture?.(capture._id);
            }}
            className={`p-1 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors
            ${
              capture.bookmarked
                ? "bg-blue-500/10 text-violet-500"
                : "text-gray-600 dark:text-gray-300"
            }
              `}
            title="Bookmark"
          >
            <CiBookmark
              className={`w-4 h-4 ${
                capture.bookmarked
                  ? "text-blue-500"
                  : "text-gray-600 dark:text-gray-300"
              } hover:text-blue-500`}
            />
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
          summary={capture.ai.summary ?? null}
          loading={!capture.content}
        />

        {/* <NoteMainText text={capture.content.clean || ""} /> */}
        <NoteMetaBox
          domain="dev.to"
          savedAt="2025-06-01T08:15:00Z"
          wordCount={1024}
          tags={["productivity", "web3", "reading"]}
        />
      </div>
      <button
        onClick={() => setOpenAiChat?.(!openAiChat)}
        className="p-1 fixed z-1001 bottom-4 right-4 rounded-full grid place-items-center cursor-pointer bg-[#1b1a1a] transition-colors"
        title="More options"
      >
        <RiGeminiFill className="w-8 h-8 text-violet-600" />
      </button>
    </div>
  );
};

export default NoteView;
