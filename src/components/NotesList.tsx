import { useCaptureContext } from "../context/CaptureContext";

const NotesList = () => {
  const { captures, setSelectedCapture } = useCaptureContext();

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatTimeAgo(dateString: string): string {
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
  }

  if (!captures || captures.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No notes available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Notes Cards */}
      <div className="flex flex-col h-screen overflow-y-auto">
        {captures.map((note) => (
          <div
            onClick={() => setSelectedCapture(note)}
            key={note._id}
            className="border-b border-white/10 cursor-pointer p-2 transition-all hover:bg-[#1d1f1d]"
          >
            <div className="flex flex-col justify-between items-start">
              <h3 className="text-sm font-semibold text-white">
                {note.metadata.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {note.metadata.description.length > 100
                  ? `${note.metadata.description.slice(0, 100)}...`
                  : note.metadata.description}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
              <span>{formatTimeAgo(note.timestamp)}</span>
              <span>{formatDate(note.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
