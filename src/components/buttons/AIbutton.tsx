import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { RiGeminiFill } from "react-icons/ri";
import { useCaptureContext } from "../../context/CaptureContext";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

interface AIbuttonProps {
  generateCaptureSummary: (captureId: string) => void;
  hasApiKey: boolean;
  loadingSummary: boolean;
  handleOpenChat: () => void;
}

export const AIbuttons: React.FC<AIbuttonProps> = ({
  generateCaptureSummary,
  hasApiKey,
  loadingSummary,
  handleOpenChat,
}) => {
  const { selectedCapture } = useCaptureContext();
  const navigate = useNavigate();

  const handleGenerateSummary = () => {
    if (hasApiKey) {
      generateCaptureSummary?.(selectedCapture?._id || "");
    } else {
      toast.error("Please add an API key to generate summaries.");
      navigate({ to: "/profile" });
      return;
    }
  };

  return (
    <div className="my-8">
      <div className="flex flex-wrap items-center gap-4">
        {/* 🔮 Generate Summary */}
        <motion.button
          onClick={handleGenerateSummary}
          disabled={loadingSummary}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.985 }}
          className={`
            relative z-0 group inline-flex items-center justify-center gap-2
            px-5 py-2.5 rounded-xl text-sm font-medium tracking-tight
            transition-all duration-300 ease-out
            shadow-md overflow-hidden select-none
            backdrop-blur-md border border-violet-500/20
            ${
              loadingSummary
                ? "bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-400 cursor-wait"
                : "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white hover:from-violet-900 hover:to-zinc-800"
            }
            ${
              loadingSummary
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer"
            }
            focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50
          `}
          aria-busy={loadingSummary}
          aria-label="Generate AI Summary"
        >
          {/* Soft shimmer effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition duration-700 animate-shimmer rounded-xl" />

          {/* Loading pulse aura */}
          {loadingSummary && (
            <span className="absolute w-24 h-24 bg-violet-400/10 blur-2xl rounded-full animate-burst z-0" />
          )}

          <Sparkles className="w-4 h-4 z-10" />
          <span className="z-10">
            {loadingSummary
              ? "Generating…"
              : selectedCapture?.ai.summary
              ? "Regenerate Summary"
              : "Generate Summary"}
          </span>
        </motion.button>

        {/* 🧠 Ask AI */}
        <motion.button
          onClick={handleOpenChat}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.985 }}
          className={`
            relative z-0 hover:bg-violet-400 cursor-pointer group inline-flex items-center justify-center gap-2
            px-5 py-2.5 rounded-xl text-sm font-medium tracking-tight
            transition-all duration-300 ease-out
            bg-gradient-to-tr from-purple-700 to-violet-800 text-white
            hover:from-purple-600 hover:to-violet-700
            border border-violet-400/20 shadow-md overflow-hidden select-none
            focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50
          `}
          aria-label="Ask AI"
        >
          {/* Glow shimmer on hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer rounded-xl" />
          <RiGeminiFill className="w-4 h-4 z-10" />
          <span className="z-10">Ask AI</span>
        </motion.button>
      </div>
    </div>
  );
};
