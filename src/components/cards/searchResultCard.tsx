import { motion } from "framer-motion";
import type { Capture } from "../../types/Capture";
import { Link } from "@tanstack/react-router";
import { CiCalendarDate } from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface SearchResultCardProps {
  captures: Capture[];
  searchTerm: string;
  loading: boolean;
  setSelectedCapture: (capture: Capture) => void;
  toggleBookmark: (id: string) => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  captures,
  searchTerm,
  loading,
  setSelectedCapture,
  toggleBookmark,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/5 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/10 shadow-lg"
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/5">
        <h3 className="text-sm font-medium text-white/80">
          {loading ? "Searching..." : `Results for "${searchTerm}"`}
        </h3>
        <p className="text-xs text-white/30 mt-0.5">
          {captures.length} knowledge items
        </p>
      </div>

      {/* Content */}
      <div className="divide-y divide-white/5 max-h-[65vh] overflow-y-auto">
        {loading ? (
          <div className="p-6 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/10 border-t-white/30 rounded-full animate-spin" />
          </div>
        ) : captures.length > 0 ? (
          captures.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className="px-5 py-3 transition-colors"
            >
              <Link
                to={`/in/capture/${item._id}`}
                onClick={() => setSelectedCapture(item)}
                className="block"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {item.metadata.favicon && (
                        <img
                          src={item.metadata.favicon}
                          className="w-3.5 h-3.5 rounded-sm"
                          alt=""
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      )}
                      <span className="text-xs text-white/50 truncate">
                        {item.metadata.siteName || "Unknown Source"}
                      </span>
                    </div>
                    <h4 className="text-white/90 text-sm font-medium leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleBookmark(item._id);
                    }}
                    className="ml-2 p-1 text-white/30 hover:text-amber-400 transition-colors"
                    aria-label="Bookmark"
                  >
                    {item.bookmarked ? (
                      <BsBookmarkFill className="text-amber-400" size={14} />
                    ) : (
                      <BsBookmark size={14} />
                    )}
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-white/30 flex items-center gap-1">
                    <CiCalendarDate size={12} />
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <FiExternalLink size={12} className="text-white/30" />
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-white/50">No results found</p>
            <p className="text-xs text-white/30 mt-1">
              Try different keywords or check your spelling
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};