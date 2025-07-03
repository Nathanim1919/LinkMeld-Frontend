import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import NoteView from "../components/NoteView";
import EmptyNoteView from "../components/EmptyNoteView";
import { getCaptureById } from "../api/capture.api";
import type { Capture } from "../types/Capture";

export const CaptureDetail = () => {
    const params = useParams({ strict: false });
    console.log("Params are: ", params);
  const { captureId } = useParams({ strict: false });
  const [capture, setCapture] = useState<Capture | null>(null);
  const [loading, setLoading] = useState(true);
  

  
  useEffect(() => {
    if (!captureId) {
      setCapture(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getCaptureById(captureId)
      .then((data) => {
        console.log("Fetched capture data: ", data);
        setCapture(data);
      })
      .finally(() => setLoading(false));
  }, [captureId]);

  console.log("The rendered capture is: ", capture);

  if (loading) return <div>Loading capture...</div>;

  return capture ? <NoteView capture={capture} /> : <EmptyNoteView />;
};
