import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import NoteView from "../components/NoteView";
import EmptyNoteView from "../components/EmptyNoteView";
import { CaptureService } from "../api/capture.api";
import type { Capture } from "../types/Capture";
import { useCaptureContext } from "../context/CaptureContext";
import { NoteHeaderSkeleton } from "./skeleton/NoteHeaderSkeleton";
import { NoteSummarySkeleton } from "./skeleton/NoteSummarySkeleton";
import { NoteMetaBoxSkeleton } from "./skeleton/NoteMetaBoxSkeleton";
import HeadingOutlineSkeleton from "./skeleton/HeadingOutlineSkeleton";
import { useUI } from "../context/UIContext";

export const CaptureDetail = () => {
  const { captureId } = useParams({ strict: false });
  const { setSelectedCapture } = useCaptureContext();
  const [capture, setCapture] = useState<Capture | null>(null);
  const {middlePanelCollapsed} = useUI();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (!captureId) {
      setCapture(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    CaptureService.getById(captureId)
      .then((data) => {
        setCapture(data);
        setSelectedCapture(data);
      })
      .catch(() => {
        setCapture(null);
      })
      .finally(() => setLoading(false));
  }, [captureId, setSelectedCapture]);

  if (loading) return <div className="md:w-[60%] w-[90%] mx-auto mt-6">
    <NoteHeaderSkeleton/>
    <HeadingOutlineSkeleton/>
    <NoteSummarySkeleton/>
    <NoteMetaBoxSkeleton/>
  </div>;

  return (
    <div className={`${middlePanelCollapsed ? "w-full" : "w-0 md:w-[60%]"} h-full overflow-y-auto`}>
      {capture ? <NoteView capture={capture} /> : <EmptyNoteView />}
    </div>
  );
};
