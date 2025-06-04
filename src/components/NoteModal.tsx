import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface NoteModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  note?: {
    id: string;
    title: string;
    content: string;
    date: string;
    link?: string;
    tags?: string[];
  };
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, note }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FaTimes size={18} />
            </button>

            {/* Note Content */}
            <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{note.date}</p>

            <div className="text-base text-gray-700 whitespace-pre-line mb-4">
              {note.content}
            </div>

            {note.link && (
              <a
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-indigo-600 hover:underline"
              >
                View Source <FaExternalLinkAlt className="ml-1" />
              </a>
            )}

            {/* Tags */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {note.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteModal;
