import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  link?: string;
  tags?: string[];
  isFavorite?: boolean;
}

const dummyNotes: Note[] = [
  {
    id: "1",
    title: "OpenAI GPT-4.5 Launch",
    content: "OpenAI has officially launched GPT-4.5 with enhanced capabilities for reasoning...",
    date: "June 1, 2025",
    link: "https://openai.com/gpt-4-5",
    tags: ["AI", "Launch"],
    isFavorite: true,
  },
  {
    id: "2",
    title: "Design Systems at Scale",
    content: "Learn how to scale your design system for enterprise products...",
    date: "May 29, 2025",
    tags: ["Design", "UX"],
  },
  // Add more dummy notes if needed
];

const NotesList = () => {
  return (
    <div className="space-y-6">
      {/* Notes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-5">
        {dummyNotes.map((note) => (
          <div
            key={note.id}
            className="rounded-xl shadow-md p-4 hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-white">{note.title}</h3>
              <FiMoreVertical className="text-gray-500" />
            </div>
            <p className="text-sm text-gray-300 mt-2 line-clamp-3">{note.content}</p>

            {note.link && (
              <a
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 flex items-center mt-3 hover:underline"
              >
                Visit source <FaExternalLinkAlt className="ml-1" />
              </a>
            )}

            <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
              <span>{note.date}</span>
              <div className="flex gap-2 items-center">
                {note.isFavorite && <FaStar className="text-yellow-400" />}
                {note.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 px-2 py-1 rounded-full text-[10px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
