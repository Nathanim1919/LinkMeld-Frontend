// src/components/NotesList.tsx
import React, { useEffect, useMemo, useState, type JSX } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useCaptureContext } from "../context/CaptureContext";
import type { Capture } from "../types/Capture";

import { FaFolderClosed } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { TbCaptureFilled } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import { NoteListSkeleton } from "./skeleton/NoteListSkeleton";

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

const filterIcons: Record<NonNullable<NotesListProps["filter"]>, JSX.Element> = {
  all: <TbCaptureFilled className="text-purple-500" />,
  bookmarks: <CiBookmark className="text-purple-500" />,
  folder: <FaFolderClosed className="text-yellow-500" />,
  source: <FaHashtag className="text-blue-400" />,
};

const NotesList: React.FC<NotesListProps> = ({ filter = "all", folderId, sourceId }) => {
  const { captures, setSelectedCapture, fetchCaptures, bookmarkCapture } = useCaptureContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const activeCaptureId = location.pathname.split("/").pop(); // naive active highlight

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
      const timestamp = new Date(note.timestamp);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      return {
        ...note,
        _id: note._id.toString(),
        title: note.metadata?.title || "Untitled",
        description: note.metadata?.description || "",
        timeAgo:
          days > 0
            ? `${days} day${days > 1 ? "s" : ""} ago`
            : hours > 0
            ? `${hours} hour${hours > 1 ? "s" : ""} ago`
            : minutes > 0
            ? `${minutes} minute${minutes > 1 ? "s" : ""} ago`
            : `${seconds} second${seconds > 1 ? "s" : ""} ago`,
        formattedDate: timestamp.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });
  }, [captures]);


  console.log("All captures are: ", captures);

  const buildLink = (id: string) => {
    if (filter === "folder" && folderId) return `/in/folders/${folderId}/captures/${id}`;
    if (filter === "source" && sourceId) return `/in/sources/${sourceId}/captures/${id}`;
    if (filter === "bookmarks") return `/in/bookmarks/captures/${id}`;
    return `/in/captures/${id}`;
  };

  if (loading) return <NoteListSkeleton />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!safeCaptures.length)
    return <div className="text-gray-400 p-4">No notes available.</div>;

  return (
    <div className="">
      <h3 className="text-sm flex gap-2 items-center font-bold text-white border-b border-white/10 py-2 mb-1">
        {filterIcons[filter]} {filterLabels[filter]}
      </h3>

      <div className="flex flex-col max-h-[90vh] overflow-y-auto space-y-2 pr-1">
        {safeCaptures.map((note) => (
          <Link
            key={note._id}
            to={buildLink(note._id)}
            onClick={() => setSelectedCapture(note as Capture)}
            className={`cursor-pointer p-2 rounded-md border border-transparent group transition-all
              ${
                activeCaptureId === note._id
                  ? "bg-[#1d1f1d] border-violet-500/25 text-violet-500"
                  : "hover:bg-[#1d1f1d] hover:border-violet-500/25"
              }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold truncate group-hover:underline">
                {note.title.length > 50 ? note.title.slice(0, 50) + "..." : note.title}
              </h3>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  bookmarkCapture?.(note._id);
                }}
                title="Bookmark"
                className={`text-xl hover:bg-violet-500/10 p-1 rounded-md cursor-pointer hover:text-violet-600 ${
                  note.bookmarked ? "text-violet-600 bg-violet-500/10" : "text-gray-400"
                }`}
              >
                <CiBookmark />
              </button>
            </div>
            <p className="text-xs mt-1 text-gray-400 line-clamp-2">{note.description}</p>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span title={note.formattedDate}>{note.timeAgo}</span>
              <span className="italic">{note.formattedDate}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
