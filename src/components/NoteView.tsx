import { FaExternalLinkAlt } from "react-icons/fa";
import type { Capture } from "../types/Capture";
import { PDFViewer } from "./PdfViewer";

interface NoteViewProps {
  capture: Capture | null;
}

export const NoteView: React.FC<NoteViewProps> = ({ capture }) => {
  return (
    <div className="p-4 w-[80%] mx-auto flex flex-col gap-4 overflow-y-auto overflow-x-hidden h-screen">
      <h1 className="font-bold sticky top-0 backdrop-blur-3xl text-2xl">
        {capture?.metadata.title}
      </h1>
      {capture?.metadata.isPdf && <PDFViewer pdfUrl={capture.metadata.url} />}
      <h3>{capture?.metadata.description}</h3>
      <p className="text-md text-gray-400">{capture?.mainText}</p>
      <div className="flex items-center gap-2">
        <a
          href={capture?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline flex items-center gap-1"
        >
          <span>Open in browser</span>
          <FaExternalLinkAlt className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default NoteView;
