import React, { useEffect, useMemo, useState, type JSX } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useCaptureContext } from "../context/CaptureContext";
import type { Capture } from "../types/Capture";
import { FaFolder, FaFolderOpen } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { TbCaptureFilled } from "react-icons/tb";
import { CiBookmark, CiStickyNote } from "react-icons/ci";
import { useFolderContext } from "../context/FolderContext";
import { motion, AnimatePresence } from "framer-motion";
import { NoteListSkeleton } from "./skeleton/NoteSkeleton";

interface NotesListProps {
  filter?: "all" | "bookmarks" | "folder" | "source";
  folderId?: string;
  sourceId?: string;
}

const filterLabels: Record<NonNullable<NotesListProps["filter"]>, string> = {
  all: "All Captures",
  bookmarks: "Bookmarks",
  folder: "Folder Notes",
  source: "Source Notes",
};

const filterIcons: Record<
  NonNullable<NotesListProps["filter"]>,
  JSX.Element
> = {
  all: <TbCaptureFilled className="text-blue-400" />,
  bookmarks: <CiBookmark className="text-amber-400" />,
  folder: <FaFolderOpen className="text-green-400" />,
  source: <FaHashtag className="text-purple-400" />,
};

const NotesList: React.FC<NotesListProps> = ({
  filter = "all",
  folderId,
  sourceId,
}) => {
  const { captures, setSelectedCapture, fetchCaptures, bookmarkCapture } =
    useCaptureContext();
  const { selectedFolder } = useFolderContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const activeCaptureId = location.pathname.split("/").pop();

  const targetId = folderId || sourceId || null;

  useEffect(() => {
    const loadCaptures = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchCaptures(filter, targetId);
      } catch (err) {
        console.error("Error loading notes:", err);
        setError("Could not load notes.");
      } finally {
        setLoading(false);
      }
    };
    loadCaptures();
  }, [filter, targetId, fetchCaptures]);

  const safeCaptures = useMemo(() => {
    if (!Array.isArray(captures)) return [];

    return captures.map((note) => {
      const timestamp = new Date(note.metadata.capturedAt);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      return {
        ...note,
        _id: note._id.toString(),
        title: note?.title || "Untitled Capture",
        description: note.metadata?.description || "",
        timeAgo:
          days > 0
            ? `${days}d`
            : hours > 0
            ? `${hours}h`
            : minutes > 0
            ? `${minutes}m`
            : `${seconds}s`,
        formattedDate: timestamp.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });
  }, [captures]);

  const buildLink = (id: string) => {
    if (filter === "folder" && folderId)
      return `/in/folders/${folderId}/captures/${id}`;
    if (filter === "source" && sourceId)
      return `/in/sources/${sourceId}/captures/${id}`;
    if (filter === "bookmarks") return `/in/bookmarks/captures/${id}`;
    return `/in/captures/${id}`;
  };

  if (loading) return <NoteListSkeleton />;
  if (error) return <div className="text-red-400 p-4 text-sm">{error}</div>;
  if (!safeCaptures.length)
    return (
      <div className="text-gray-500 p-4 text-sm text-center">
        No captures found
      </div>
    );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-3 py-3 border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          {filterIcons[filter]}
          <h3 className="text-sm font-medium text-gray-300">
            {filterLabels[filter]}
          </h3>
          {selectedFolder && filter === "folder" && (
            <span className="ml-2 text-xs font-medium text-green-400 bg-green-900/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <FaFolder className="text-xs" />
              {selectedFolder.name.length > 15
                ? selectedFolder.name.slice(0, 15) + "..."
                : selectedFolder.name}
            </span>
          )}
          {sourceId && filter === "source" && (
            <span className="ml-2 text-xs font-medium text-purple-400 bg-purple-900/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <FaHashtag className="text-xs" />
              {sourceId.length > 15 ? sourceId.slice(0, 15) + "..." : sourceId}
            </span>
          )}
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
        <AnimatePresence>
           {safeCaptures.map((note) => (
            <motion.div
              key={note._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to={buildLink(note._id)}
                onClick={() => setSelectedCapture(note as Capture)}
                className={`block rounded-lg p-3 transition-all duration-200 ${
                  activeCaptureId === note._id
                    ? "bg-gray-800/50 border-l-2 border-blue-400 shadow-lg"
                    : "hover:bg-gray-800/30"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CiStickyNote
                        className={`flex-shrink-0 ${
                          activeCaptureId === note._id
                            ? "text-blue-400"
                            : "text-gray-500"
                        }`}
                      />
                      <h3
                        className={`text-sm font-medium truncate ${
                          activeCaptureId === note._id
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {note.title}
                      </h3>
                    </div>

                    {note.metadata.favicon && (
                      <div className="flex items-center gap-1.5 mb-2">
                        <img
                          src={note.metadata.favicon}
                          className="w-3 h-3 rounded-sm"
                          alt=""
                        />
                        <span className="text-xs text-gray-500 truncate">
                          {note.metadata.siteName || "Unknown Source"}
                        </span>
                      </div>
                    )}

                    <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                      {note.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs ${
                          activeCaptureId === note._id
                            ? "text-blue-300"
                            : "text-gray-500"
                        }`}
                      >
                        {note.timeAgo}
                      </span>
                      <span className="text-xs text-gray-500">
                        {note.formattedDate}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      bookmarkCapture?.(note._id);
                    }}
                    className={`ml-2 p-1 rounded-md transition-colors ${
                      note.bookmarked
                        ? "text-amber-400 hover:bg-amber-900/20"
                        : "text-gray-500 hover:bg-gray-700/50 hover:text-gray-300"
                    }`}
                  >
                    <CiBookmark
                      className={`w-4 h-4 transition-transform ${
                        note.bookmarked ? "scale-110" : ""
                      }`}
                    />
                  </button>
                </div>
              </Link>
            </motion.div>
          ))} 
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotesList;