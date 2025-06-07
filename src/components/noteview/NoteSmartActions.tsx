import { Sparkles,Wand2, AlarmClock, HelpCircle, Layers, Share2 } from "lucide-react";

type Action = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

const actions: Action[] = [
  {
    icon: <Sparkles className="w-4 h-4" />,
    label: "Summarize",
    onClick: () => console.log("Summarizing..."),
  },
  {
    icon: <AlarmClock className="w-4 h-4" />,
    label: "Remind Me Later",
    onClick: () => console.log("Reminder set..."),
  },
  {
    icon: <HelpCircle className="w-4 h-4" />,
    label: "Ask a Question",
    onClick: () => console.log("Ask a question..."),
  },
  {
    icon: <Layers className="w-4 h-4" />,
    label: "Cluster with Others",
    onClick: () => console.log("Clustering..."),
  },
  {
    icon: <Share2 className="w-4 h-4" />,
    label: "Share",
    onClick: () => console.log("Sharing..."),
  },
  {
    icon: <Wand2 className="w-4 h-4" />,
    label: "Related captures",
    onClick: () => console.log("Performing smart actions..."),
  },
];

export const NoteActionBar = () => {
    return (
        <div className="flex flex-wrap items-center justify-end gap-1 mt-4">
          {actions.map((action, i) => (
            <div key={i} className="relative group">
              <button
                onClick={action.onClick}
                className="flex items-center cursor-pointer justify-center text-zinc-600 dark:text-zinc-300 hover:text-indigo-500 p-2 rounded-md transition"
              >
                {action.icon}
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 bg-zinc-800 text-white text-xs rounded-md px-2 py-1 transition-all duration-150 pointer-events-none whitespace-nowrap z-10">
                {action.label}
              </div>
            </div>
          ))}
        </div>
      );
};
