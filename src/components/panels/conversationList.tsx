import { Ellipsis } from "lucide-react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useStore } from "../../context/StoreContext";
import type { UIStore } from "../../stores/types";

const ConversationList: React.FC = () => {
    const sampleData = [
        {
            id: 1,
            title: "Sample Conversation 1",

        },
        {
            id: 2,
            title: "Sample Conversation 2",

        },
        {
            id: 3,
            title: "Sample Conversation 3",

        },
        {
            id: 4,
            title: "Sample Conversation 4",

        },
        {
            id: 5,
            title: "Sample Conversation 5",

        },
        {
            id: 6,
            title: "Sample Conversation 6",

        },
        {
            id: 7,
            title: "Sample Conversation 7",

        },
        {
            id: 8,
            title: "Sample Conversation 8",

        },
        {
            id: 9,
            title: "Sample Conversation 9",

        },
        {
            id: 10,
            title: "Sample Conversation 10",

        },  
        {
            id: 11,
            title: "Sample Conversation 11",

        },
        {
            id: 12,
            title: "Sample Conversation 12",

        },
        {
            id: 13,
            title: "Sample Conversation 13",

        },
        {
            id: 14,
            title: "Sample Conversation 14",

        },
        {
            id: 15,
            title: "Sample Conversation 15",

        },
        {
            id: 16,
            title: "Sample Conversation 16",

        },
        {
            id: 17,
            title: "Sample Conversation 17",

        },
        {
            id: 18,
            title: "Sample Conversation 18",

        },
        {
            id: 19,
            title: "Sample Conversation 19",

        },
        {
            id: 20,
            title: "Sample Conversation 20",

        },
        {
            id: 21,
            title: "Sample Conversation 21",

        },
        {
            id: 22,
            title: "Sample Conversation 22",

        },
        {
            id: 23,
            title: "Sample Conversation 23",

        },
        {
            id: 24,
            title: "Sample Conversation 24",

        },
        {
            id: 25,
            title: "Sample Conversation 25",

        },
    ];
    const { middlePanelCollapsed, setMiddlePanelCollapsed } = useStore()
    .ui as UIStore;
    return (
        <div className="h-full flex flex-col overflow-hidden relative bg-[#faf7f7] dark:bg-[#141416]">
            <div className="flex-none px-4 py-3 border-b border-gray-100 dark:border-zinc-800/50">
                <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                    BRAIN
                </h2>
                <div
        className="w-8 z-1000 h-8 rounded-full cursor-pointer hover:bg-transparent text-2xl grid place-items-center dark:text-gray-200 text-[#333] absolute top-1 hover:opacity-45 right-0"
        onClick={() => setMiddlePanelCollapsed(!middlePanelCollapsed)}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                {sampleData.map((item) => (
                    <div 
                        key={item.id} 
                        className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100/80 dark:hover:bg-zinc-800/80 transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex-1 min-w-0 pr-3">
                            <h3 className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white truncate">
                                {item.title}
                            </h3>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded transition-all text-gray-400 dark:text-gray-500">
                            <Ellipsis className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConversationList;