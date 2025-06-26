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

interface NoteViewProps {
  capture: Capture | null;
}

export const NoteView: React.FC<NoteViewProps> = ({ capture }) => {
  const { collapsed, middlePanelCollapsed, setIsFolderListOpen, isFolderListOpen } = useUI();

  console.log("Rendering NoteView with capture:", capture);

  if (!capture) {
    return (
      <div className="p-4 mx-auto flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-screen">
        <h2 className="text-xl font-semibold text-gray-300">No Note Selected</h2>
        <p className="text-gray-500">Please select a note to view its content.</p>
      </div>
    );
  }

  return (
    <div
      className={`p-4 ${
        collapsed && middlePanelCollapsed
          ? "w-[60%]"
          : collapsed || middlePanelCollapsed
          ? "w-[70%]"
          : "w-[80%]"
      } mx-auto flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-screen`}
    >
      <NoteActionBar />
      <FolderList />
      <div className="flex items-center justify-between mb-4 sticky top-[-1rem]  z-50 backdrop-blur-[15rem] py-2 px-4">
        <div>
          <a
            href={capture.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt className="w-4 h-4 cursor-pointer text-gray-500 hover:text-white" />
          </a>
        </div>
        <div className="flex self-end items-center justify-between gap-3 relative z-100">
          <CiBookmark className=" cursor-pointer text-gray-300 w-6 h-6 p-1 bg-gray-800 relative z-100  hover:text-white" />
          <RiDeleteBin6Line className=" cursor-pointer text-gray-300 w-6 h-6 p-1 bg-gray-800 relative z-100  hover:text-white" />
          <Share2 className=" cursor-pointer text-gray-300 w-6 h-6 p-1 bg-gray-800 relative z-100  hover:text-white" />
          <FaFolderPlus
            onClick={() => setIsFolderListOpen?.(!isFolderListOpen)}
            data-testid="add-folder-button"
            className=" cursor-pointer text-gray-300 w-6 h-6 p-1 bg-gray-800 relative z-100  hover:text-white"
          />
        </div>
      </div>
      <NoteHeader
        // folder={
        //   capture.folder
        //     ? {
        //         name: capture.folder.name,
        //         id: capture.folder._id,
        //       }
        //     : { name: "Uncategorized", id: "uncategorized" }
        // }
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
  );
};

export default NoteView;
