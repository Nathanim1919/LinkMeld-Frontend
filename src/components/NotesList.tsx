import type React from "react";
import { useCaptureContext } from "../context/CaptureContext";
import { Link, useParams } from "@tanstack/react-router";
import type { Capture } from "../types/Capture";
import { FaFolderClosed } from "react-icons/fa6";
import { FaHashtag } from "react-icons/fa";
import { TbCaptureFilled } from "react-icons/tb";
import { useEffect, useMemo, useState, type JSX } from "react";

interface NoteListProps {
  filter?: "all" | "bookmarks" | "folder" | "source";
}

const filterLabels: Record<NonNullable<NoteListProps["filter"]>, string> = {
  all: "All Captures",
  bookmarks: "Bookmarks",
  folder: "Folder Notes",
  source: "Source Notes",
};

const filterIcons: Record<NonNullable<NoteListProps["filter"]>, JSX.Element> = {
  all: <TbCaptureFilled className="text-purple-500" />,
  bookmarks: <TbCaptureFilled className="text-purple-500" />,
  folder: <FaFolderClosed className="text-yellow-500" />,
  source: <FaHashtag className="text-blue-400" />,
};

const NotesList: React.FC<NoteListProps> = () => {
  const { captures, setSelectedCapture, fetchCaptures } = useCaptureContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useParams({ strict: false });
  const activeCaptureId = params?.captureId;

  // Safely determine filter
  const filter = useMemo(() => {
    if (params.folderId) return "folder";
    if (params.source) return "source";
    if (location.pathname.startsWith("/bookmarks")) return "bookmarks";
    return "all";
  }, [params]);

  const id = useMemo(() => params.folderId || params.source, [params]);

  useEffect(() => {
    const loadCaptures = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchCaptures(filter, id);
      } catch (err) {
        console.error("Failed to fetch captures:", err);
        setError("Failed to load notes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCaptures();
  }, [fetchCaptures, filter, id]);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
      if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    } catch {
      return "";
    }
  };

  // Safely handle captures data
  const safeCaptures = useMemo(() => {
    console.log("Captures data:", captures);
    if (!captures) return [];
    if (!Array.isArray(captures)) {
      console.warn("Captures is not an array:", captures);
      return [];
    }
    return captures.map((note) => ({
      ...note,
      _id: note._id?.toString() || "",
      metadata: {
        ...note.metadata,
        title: note.metadata?.title || "Untitled",
        description: note.metadata?.description || "",
      },
      formattedDate: formatDate(note.timestamp),
      timeAgo: formatTimeAgo(note.timestamp),
    }));
  }, [captures]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-8">
        <p className="text-gray-500">Loading notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!safeCaptures.length) {
    return (
      <div className="flex items-center justify-center h-full py-8">
        <p className="text-gray-500">No notes available</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h3 className="text-sm w-full border-b border-white/10 py-2 font-bold text-white mb-1 leading-tight flex items-center gap-2">
        {filterIcons[filter]}
        {filterLabels[filter]}
      </h3>

      <div className="flex flex-col max-h-[80vh] overflow-y-auto space-y-2 pr-1">
        {safeCaptures.map((note) => (
          <Link
            to={
              filter === "folder" && params.folderId
                ? `/folders/${params.folderId}/captures/${note._id}`
                : filter === "source" && params.source
                ? `/sources/${params.source}/captures/${note._id}`
                : filter === "bookmarks"
                ? `/bookmarks/captures/${note._id}`
                : `/captures/${note._id}` // fallback to default
            }
            onClick={() => setSelectedCapture(note as Capture)}
            key={note._id}
            className={`cursor-pointer p-2 border-b transition-all rounded-md border border-transparent group
              ${
                activeCaptureId === note._id
                  ? "bg-[#1d1f1d] border-violet-500/25 text-violet-500"
                  : "hover:bg-[#1d1f1d] hover:border-violet-500/25"
              }`}
          >
            <div className="flex flex-col justify-between items-start">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold group-hover:underline group-hover:text-violet-500">
                  {note.metadata.title.length > 50
                    ? `${note.metadata.title.slice(0, 50)}...`
                    : note.metadata.title}
                </h3>
              </div>

              <p className="text-[12px] text-gray-400 mt-1 group-hover:text-gray-500">
                {note.metadata.description.length > 100
                  ? `${note.metadata.description.slice(0, 100)}...`
                  : note.metadata.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
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
