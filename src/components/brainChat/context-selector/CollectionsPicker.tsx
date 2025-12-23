// components/context-selector/CollectionsPicker.tsx
import { Check, Folder } from "lucide-react"
import { useBrainStore } from "../../../stores/brain-store"

type Collection = {
  id: string
  name: string
  documentCount?: number
}

// TEMP mock (replace later)
const MOCK_COLLECTIONS: Collection[] = [
  { id: "c1", name: "Personal Notes", documentCount: 12 },
  { id: "c2", name: "Work Docs", documentCount: 34 },
  { id: "c3", name: "Research Papers", documentCount: 8 }
]

export const CollectionsPicker = () => {
  const {
    draft,
    toggleCollection
  } = useBrainStore()

  return (
    <div className="flex flex-col">
      {MOCK_COLLECTIONS.map(collection => {
        const selected = draft.collections.has(collection.id)

        return (
          <button
            key={collection.id}
            onClick={() => toggleCollection(collection.id)}
            className={`flex items-center hover:bg-black/5 dark:hover:bg-white/5 justify-between border-b border-gray-200 dark:border-[#131212] cursor-pointer px-3 py-2 text-left transition  
            `}
          >
            <div className="flex items-center gap-2">
              <Folder size={18} className="text-gray-500 dark:text-gray-600"/>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-black dark:text-white">
                  {collection.name}
                </span>
                {collection.documentCount !== undefined && (
                  <span className="text-xs text-gray-500">
                    {collection.documentCount} documents
                  </span>
                )}
              </div>
            </div>

            {selected && (
              <Check
                size={18}
                className="text-purple-500"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
