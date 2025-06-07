import React, { useState } from "react";
import {
  Sparkles,
  Wand2,
  AlarmClock,
  HelpCircle,
  Layers,
  Share2,
} from "lucide-react";
import clsx from "clsx";
import {
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

type Action = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  content: string;
};

export const NoteActionBar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const actions: Action[] = [
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: "Summarize",
      content: "Welcome to Summarizer",
      onClick: () => {},
    },
    {
      icon: <AlarmClock className="w-4 h-4" />,
      label: "Remind Me Later",
      content: "Set a reminder for this note",
      onClick: () => {},
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: "Ask a Question",
      content: "Ask something about this content",
      onClick: () => {},
    },
    {
      icon: <Layers className="w-4 h-4" />,
      label: "Cluster with Others",
      content: "Grouping this with related notes...",
      onClick: () => {},
    },
    {
      icon: <Share2 className="w-4 h-4" />,
      label: "Share",
      content: "Share this with your team",
      onClick: () => {},
    },
    {
      icon: <Wand2 className="w-4 h-4" />,
      label: "Related captures",
      content: "Discover related notes and ideas",
      onClick: () => {},
    },
  ];

  return (
    <div
      className={clsx(
        "fixed right-0 top-0 z-999 h-full transition-all duration-300 flex",
        activeIndex !== null ? "w-96" : "w-14"
      )}
    >
      {/* Icon Sidebar */}
      <div className="flex flex-col bg-black h-full items-center p-2 gap-2 w-14">
        {actions.map((action, i) => (
          <div key={i} className="relative group flex items-center">
            <button
              onClick={() => setActiveIndex(i === activeIndex ? null : i)}
              className={clsx(
                "flex items-center cursor-pointer justify-center p-2 rounded-md transition",
                i === activeIndex
                  ? "text-violet-500 bg-zinc-800"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              {action.icon}
            </button>

            {/* Tooltip */}
            {activeIndex !== i && (
              <div className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition transform translate-y-1/2 bg-zinc-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
                {action.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content Panel */}
      {activeIndex !== null && (
        <div className="bg-zinc-900 text-white flex-1 p-4 border-l border-zinc-800">
          <button
            className="absolute cursor-pointer top-4 right-4 text-zinc-400 hover:text-white"
            onClick={() => setActiveIndex(null)}
          >
            <MdKeyboardDoubleArrowRight className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold mb-2 text-violet-400">
            {actions[activeIndex].label}
          </h2>
          <p className="text-sm text-zinc-300">
            {actions[activeIndex].content}
          </p>
        </div>
      )}
    </div>
  );
};
