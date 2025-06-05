import { FaExternalLinkAlt } from "react-icons/fa";
import type { Capture } from "../types/Capture";
import { PDFViewer } from "./PdfViewer";
import { NoteHeader } from "./noteview/NoteHeader";
import { NoteSummary } from "./noteview/NoteSummary";
import { NoteMainText } from "./noteview/NoteMainContent";
import { NoteMetaBox } from "./noteview/NoteMetaAccordion";
import { NoteActionBar } from "./noteview/NoteSmartActions";

interface NoteViewProps {
  capture: Capture | null;
}

export const NoteView: React.FC<NoteViewProps> = ({ capture }) => {
  return (
    <div className="p-4 w-[80%] mx-auto flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-screen">
      <NoteActionBar />

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
      {/* <NoteSummary
        summary={capture?.mainText.slice(0, 200) ?? null}
        loading={!capture?.mainText}
        onRefresh={() => {
          // maybe call your backend to regenerate summary
        }}
      /> */}

      <NoteMainText text={capture?.mainText || ""} />
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
