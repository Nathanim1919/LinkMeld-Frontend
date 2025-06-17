// src/components/panels/FolderNotesPanel.tsx
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";

interface Note {
  id: string;
  title: string;
  excerpt?: string;
}

interface FolderNotesPanelProps {
  folderId: string;
}

const mockNotesByFolder: Record<string, Note[]> = {
  folder1: [
    { id: "note1", title: "Meeting notes", excerpt: "Discuss project timeline..." },
    { id: "note2", title: "To-do list", excerpt: "Buy groceries, call mom..." },
  ],
  folder2: [
    { id: "note3", title: "Vacation ideas", excerpt: "Beach vs mountains..." },
  ],
  folder3: [],
};

const FolderNotesPanel: React.FC<FolderNotesPanelProps> = ({ folderId }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    // Simulate fetching notes for the folder
    setTimeout(() => {
      setNotes(mockNotesByFolder[folderId] || []);
      setLoading(false);
    }, 600);
  }, [folderId]);

  if (loading) return <div className="p-4 text-gray-400">Loading notes...</div>;

  if (notes.length === 0)
    return <div className="p-4 text-gray-400">No notes found in this folder.</div>;

  return (
    <nav className="flex flex-col gap-2 p-4 overflow-y-auto h-full">
      {notes.map((note) => (
        <Link
          key={note.id}
          to={`/folders/${folderId}/notes/${note.id}`}
          className={`block p-3 rounded-md cursor-pointer transition-colors ${
            router.state.location.pathname === `/folders/${folderId}/notes/${note.id}`
              ? "bg-violet-600 text-white"
              : "hover:bg-violet-100 hover:text-violet-800"
          }`}
          activeOptions={{ exact: true }}
        >
          <h4 className="font-semibold">{note.title}</h4>
          {note.excerpt && <p className="text-sm text-gray-500">{note.excerpt}</p>}
        </Link>
      ))}
    </nav>
  );
};

export default FolderNotesPanel;
