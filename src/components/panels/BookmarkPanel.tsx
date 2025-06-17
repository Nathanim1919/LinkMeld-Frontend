// src/components/panels/BookmarkPanel.tsx
import React from "react";
import { useCaptureContext } from "../../context/CaptureContext";
import NotesList from "../NotesList";

const BookmarkPanel: React.FC = () => {
  const { bookmarkCapture } = useCaptureContext();

  if (!bookmarkCapture || bookmarkCapture.length === 0) {
    return <div className="p-4 text-gray-500">No bookmarks found.</div>;
  }

  // Here we assume NotesList can accept a list of captures directly (customize if needed)
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Bookmarked Notes</h2>
      <NotesList filter="bookmarks"/>
    </div>
  );
};

export default BookmarkPanel;
