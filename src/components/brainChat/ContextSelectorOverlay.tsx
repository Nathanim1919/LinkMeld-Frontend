// components/context-selector/ContextSelectorOverlay.tsx
import { X } from "lucide-react"
import { useUIStore } from "../../stores/ui-store"

export const ContextSelectorOverlay = () => {
  const {
    contextSelectorOpen,
    contextSelectorMode,
    closeContextSelector
  } = useUIStore()

  if (!contextSelectorOpen || !contextSelectorMode) return null

  return (
    <div
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={closeContextSelector}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#faf7f7] dark:bg-[#141416] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <h2 className="text-sm font-semibold text-black dark:text-white capitalize">
            {contextSelectorMode}
          </h2>
          <button
            onClick={closeContextSelector}
            className="rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {contextSelectorMode === "collections" && <CollectionsPicker />}
          {contextSelectorMode === "bookmarks" && <BookmarksPicker />}
          {contextSelectorMode === "captures" && <CapturesPicker />}
        </div>
      </div>
    </div>
  )
}


const CollectionsPicker = () => (
    <div className="text-sm text-gray-600 dark:text-gray-300">
      Collections picker (coming next)
    </div>
  )
  
  const BookmarksPicker = () => (
    <div className="text-sm text-gray-600 dark:text-gray-300">
      Bookmarks picker (coming next)
    </div>
  )
  
  const CapturesPicker = () => (
    <div className="text-sm text-gray-600 dark:text-gray-300">
      Captures picker (coming next)
    </div>
  )
  