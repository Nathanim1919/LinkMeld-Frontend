// components/context-selector/CapturesPicker.tsx
import { Check, FileText, Globe, Image as ImageIcon, StickyNote } from "lucide-react"
import { useBrainStore } from "../../../stores/brain-store"

type Capture = {
  id: string
  title: string
  type: "pdf" | "note" | "web" | "image"
}

// TEMP mock data
const MOCK_CAPTURES: Capture[] = [
  { id: "d1", title: "Startup Pitch Deck.pdf", type: "pdf" },
  { id: "d2", title: "Product Vision Notes", type: "note" },
  { id: "d3", title: "OpenAI Blog – RAG", type: "web" },
  { id: "d4", title: "Architecture Diagram", type: "image" },
  { id: "d5", title: "Startup Pitch Deck.pdf", type: "pdf" },
  { id: "d6", title: "Product Vision Notes", type: "note" },
  { id: "d7", title: "OpenAI Blog – RAG", type: "web" },
  { id: "d8", title: "Architecture Diagram", type: "image" },
  { id: "d9", title: "Startup Pitch Deck.pdf", type: "pdf" },
  { id: "d10", title: "Product Vision Notes", type: "note" },
  { id: "d11", title: "OpenAI Blog – RAG", type: "web" },
  { id: "d12", title: "Architecture Diagram", type: "image" },
  { id: "d13", title: "Startup Pitch Deck.pdf", type: "pdf" },
  { id: "d14", title: "Product Vision Notes", type: "note" },
  { id: "d15", title: "OpenAI Blog – RAG", type: "web" },
  { id: "d16", title: "Architecture Diagram", type: "image" },
  { id: "d17", title: "Startup Pitch Deck.pdf", type: "pdf" },
  { id: "d18", title: "Product Vision Notes", type: "note" },
  { id: "d19", title: "OpenAI Blog – RAG", type: "web" },
  { id: "d20", title: "Architecture Diagram", type: "image" },
  { id: "d21", title: "Startup Pitch Deck.pdf", type: "pdf" },
  { id: "d22", title: "Product Vision Notes", type: "note" },
  { id: "d23", title: "OpenAI Blog – RAG", type: "web" },
  { id: "d24", title: "Architecture Diagram", type: "image" },
  { id: "d25", title: "Startup Pitch Deck.pdf", type: "pdf" },
  { id: "d26", title: "Product Vision Notes", type: "note" },
  { id: "d27", title: "OpenAI Blog – RAG", type: "web" },
]

const iconForType = (type: Capture["type"]) => {
  switch (type) {
    case "pdf":
      return <FileText size={18} className="opacity-30" />
    case "note":
      return <StickyNote size={18} className="opacity-30" />
    case "web":
      return <Globe size={18} className="opacity-30" />
    case "image":
      return <ImageIcon size={18} className="opacity-30" />
  }
}

export const CapturesPicker = () => {
  const {
    draft,
    toggleCapture
  } = useBrainStore()

  return (
    <div className="flex flex-col">
      {MOCK_CAPTURES.map(capture => {
        const selected = draft.captures.has(capture.id)

        return (
          <button
            key={capture.id}
            onClick={() => toggleCapture(capture.id)}
            className={`flex items-center hover:bg-black/5 dark:hover:bg-white/5 justify-between border-b border-gray-200 dark:border-[#131212] cursor-pointer px-3 py-2 text-left transition
            `}
          >
            <div className="flex items-center gap-3">
              {iconForType(capture.type)}
              <span className="text-sm font-medium text-black dark:text-white">
                {capture.title}
              </span>
            </div>

            {selected && (
              <Check size={18} className="text-purple-500" />
            )}
          </button>
        )
      })}
    </div>
  )
}
