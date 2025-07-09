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

export const CaptureDetail = () => {
  const params = useParams({ strict: false });
  console.log("Params are: ", params);
  const { captureId } = useParams({ strict: false });
  const { setSelectedCapture } = useCaptureContext();
  const [capture, setCapture] = useState<Capture | null>(null);
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

  if (loading) return <div className="w-[60%] mx-auto mt-6">
    <NoteHeaderSkeleton/>
    <NoteSummarySkeleton/>
    <NoteMetaBoxSkeleton/>
  </div>;

  return capture ? <NoteView capture={capture} /> : <EmptyNoteView />;
};
