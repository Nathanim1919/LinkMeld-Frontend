import { motion } from "framer-motion";
import type { Capture } from "../../types/Capture";
import { Link } from "@tanstack/react-router";
import { CiCalendarDate, CiStickyNote } from "react-icons/ci";

interface searchResultCardProps {
  captures: Capture[];
  searchTerm: string;
  loading: boolean;
  setSelectedCapture: (capture: Capture) => void;
}

export const SearchResultCard: React.FC<searchResultCardProps> = ({
  captures,
  searchTerm,
  loading,
  setSelectedCapture,
}) => {
  return (
    <div className="relative max-h-[350px] overflow-y-auto -mt-8 before:absolute shadow-amber-500 before:top-0 before:left-0 before:bottom-0 rounded-2xl overflow-hidden before:transform duration-1000 before:w-full before:h-full before:bg-gradient-to-b before:from-orange-400 before:to-violet-600 p-[1px]">
      <motion.div
        className="relative rounded-2xl p-2 bg-[#161618] space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? (
          <div className="text-white/30 text-sm p-4">Searching...</div>
        ) : captures.length > 0 ? (
          captures.map((item) => (
            <Link
              to={`/in/capture/${item._id}`}
              onClick={() => {
                setSelectedCapture(item as Capture);
              }}
              key={item._id}
              className="text-white/50 hover:text-[#525050] py-1 px-2 border border-transparent hover:border-[#232327] hover:bg-[#1c1c1f] flex flex-col cursor-pointer justify-between w-full backdrop-blur-lg rounded-lg transition-all"
            >
              <div className="flex items-center gap-2">
                <CiStickyNote />
                <p className="text-[14px]">
                  {item.title.length > 50
                    ? item.title.slice(0, 50) + "..."
                    : item.title}
                </p>
              </div>
              <div className="flex justify-between items-start text-xs mt-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <img
                    src={item.metadata.favicon}
                    className="w-3 h-3 rounded-sm"
                    alt=""
                  />
                  <span className="text-xs text-[#cfe10a] truncate">
                    {item.metadata.siteName || "Unknown Source"}
                  </span>
                </div>

                <span className="text-[13px] flex items-center self-start gap-1">
                  <CiCalendarDate />{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-white/40">No results for "{searchTerm}"</p>
            <p className="text-white/20 text-sm mt-1">
              Try different keywords or check your spelling
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
