// components/context-selector/ContextSelectorOverlay.tsx
import { X } from "lucide-react"
import { useUIStore } from "../../../stores/ui-store"
import { CollectionsPicker } from "./CollectionsPicker"
import { CapturesPicker } from "./CapturesPicker"
import { ModelsPicker } from "./ModelsPicker"

export const ContextSelectorOverlay = () => {
  const {
    contextSelectorOpen,
    contextSelectorMode,
    closeContextSelector
  } = useUIStore()

  if (!contextSelectorOpen || !contextSelectorMode) return null

  return (
    <div
      className="fixed inset-0 z-1500 flex items-center justify-center bg-black/10 backdrop-blur-sm"
      onClick={closeContextSelector}
    >
      <div
        className="w-[80%] md:w-[60%] max-w-md overflow-hidden rounded-xl bg-[#faf7f7]/50 dark:bg-[#141416]/50 shadow-sm dark:shadow-2xl backdrop-blur-xl border border-gray-100 dark:border-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-900 px-4 py-2 bg-white dark:bg-[#141416]">
          <h2 className="text-sm font-semibold text-black dark:text-white capitalize">
            {contextSelectorMode}
          </h2>
          <button
            onClick={closeContextSelector}
            className="rounded-md p-1 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto bg-gray-100 dark:bg-[#141416]">
          {contextSelectorMode === "collections" && <CollectionsPicker />}
          {contextSelectorMode === "models" && <ModelsPicker />}
          {contextSelectorMode === "captures" && <CapturesPicker />}
        </div>
      </div>
    </div>
  )
}
