import { FaExternalLinkAlt } from "react-icons/fa";
import type { Capture } from "../types/Capture";
import { PDFViewer } from "./PdfViewer";
import { NoteHeader } from "./noteview/NoteHeader";
import { NoteSummary } from "./noteview/NoteSummary";
import { NoteMainText } from "./noteview/NoteMainContent";
import { NoteMetaBox } from "./noteview/NoteMetaAccordion";
import { NoteActionBar } from "./noteview/NoteSmartActions";
import { CiBookmark } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Share2 } from "lucide-react";

interface NoteViewProps {
  capture: Capture | null;
}

export const NoteView: React.FC<NoteViewProps> = ({ capture }) => {
  return (
    <div className="p-4 w-[80%] mx-auto flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-screen">
      <NoteActionBar />
      <div className="flex items-center justify-between mb-4">
        <div>
          <a
            href={capture?.metadata.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt className="w-4 h-4 cursor-pointer text-gray-500 hover:text-white" />
          </a>
        </div>
        <div className="flex self-end items-center justify-between gap-3 relative z-100">
          <CiBookmark className="w-4 h-4 cursor-pointer text-gray-500 hover:text-white" />
          <RiDeleteBin6Line className="w-4 h-4 cursor-pointer text-gray-500 hover:text-white" />
          <Share2 className="w-4 h-4 cursor-pointer text-gray-500 hover:text-white" />
        </div>
      </div>
      <NoteHeader
        title={capture?.metadata.title || "Untitled Note"}
        tags={
          capture?.metadata.keywords
            ? // this is not array but a string with comma separated values
              capture.metadata.keywords.split(",").map((tag) => tag.trim())
            : []
        }
        capturedAt={capture?.timestamp}
        sentiment={"neutral"}
      />
      <NoteSummary
        summary={capture?.mainText.slice(0, 200) ?? null}
        loading={!capture?.mainText}
        onRefresh={() => {
          // maybe call your backend to regenerate summary
        }}
      />

      <NoteMainText text={capture?.mainText || ""} />
      <p className="text-white bg-red-500 p-4">{capture?.metadata.keywords}</p>
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
