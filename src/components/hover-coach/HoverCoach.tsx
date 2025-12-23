import { motion, AnimatePresence } from "framer-motion"
import { useUIStore } from "../../stores/ui-store"

export const HoverCoach = () => {
  const {
    hoverCoachVisible,
    hoverCoachMode,
    hoverCoachAnchor,
    contextSelectorOpen
  } = useUIStore()

  if (
    !hoverCoachMode ||
    !hoverCoachAnchor ||
    contextSelectorOpen
  ) {
    return null
  }

  const style: React.CSSProperties = {
    position: "fixed",
    top: hoverCoachAnchor.bottom + 24,
    left: hoverCoachAnchor.left - hoverCoachAnchor.width / 2,
    transform: "translateX(-50%)",
    zIndex: 50
  }

  return (
    <AnimatePresence>
      {hoverCoachVisible && (
        <motion.div
          style={style}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{
            duration: 0.18,
            ease: "easeOut"
          }}
          className="max-w-64 rounded-xl bg-[#faf7f7]/50 dark:bg-[#141416]/50 px-3 py-2 text-sm text-black dark:text-white shadow-lg border border-gray-300 dark:border-gray-800/50"
        >
          {hoverCoachMode === "brain" && (
            <div className="flex flex-col gap-2">
                <h1 className="text-md font-bold text-black dark:text-white border-b border-gray-300 dark:border-gray-800/50 pb-2">
                    Use Your Whole Knowledge Base
                </h1>
                <p className="text-sm text-gray-600 dark:text-[#aeaeb2]">
                    Use all your personal memory for deeper responses.
                </p>
            </div>
          )}

          {hoverCoachMode === "collections" && (
            <div className="flex flex-col gap-2">
                <h1 className="text-md font-bold text-black dark:text-white border-b border-gray-300 dark:border-gray-800/50 pb-2">
                   Select Collections
                </h1>
                <p className="text-sm text-gray-600 dark:text-[#aeaeb2]">
                Select a group of documents to guide this chat.
                </p>
            </div>
          )}

          {hoverCoachMode === "bookmarks" && (
            <div className="flex flex-col gap-2">
                <h1 className="text-md font-bold text-black dark:text-white border-b border-gray-300 dark:border-gray-800/50 pb-2">
                    Include Bookmarks
                </h1>
                <p className="text-sm text-gray-600 dark:text-[#aeaeb2]">
                    Include everything you’ve bookmarked.
                </p>
            </div>
          )}

          {hoverCoachMode === "captures" && (
            <div className="flex flex-col gap-2">
                <h1 className="text-md font-bold text-black dark:text-white border-b border-gray-300 dark:border-gray-800/50 pb-2">
                    Choose specific files or notes to chat about.
                </h1>
                <p className="text-sm text-gray-600 dark:text-[#aeaeb2]">
                    Choose specific files or notes to chat about.
                </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
