import { motion, AnimatePresence } from "framer-motion";
import { useBrainStore } from "../../stores/brain-store";

export const ContextSummaryBar = () => {
  const { draft, toggleCollection, toggleCapture } = useBrainStore();

  // Build active contexts
  const activeContexts = [
    ...Array.from(draft.collections).map(id => ({ id, label: `Collection ${id}`, type: "collection" })),
    ...Array.from(draft.captures).map(id => ({ id, label: `Capture ${id}`, type: "capture" }))
  ];

  if (draft.brainEnabled) activeContexts.unshift({ id: "brain", label: "Brain", type: "brain" });
  if (draft.bookmarksEnabled) activeContexts.unshift({ id: "bookmark", label: "Bookmarks", type: "bookmark" });

  if (activeContexts.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto py-1 px-2">
      <AnimatePresence>
        {activeContexts.map(ctx => (
          <motion.div
            key={ctx.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
              ctx.type === "brain" ? "bg-blue-500 text-white" :
              ctx.type === "bookmark" ? "bg-purple-500 text-white" :
              "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
            }`}
          >
            {ctx.label}
            {ctx.type === "collection" || ctx.type === "capture" ? (
              <button
                className="ml-1 text-xs hover:text-red-500"
                onClick={() => ctx.type === "collection" ? toggleCollection(ctx.id) : toggleCapture(ctx.id)}
              >
                ×
              </button>
            ) : null}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
