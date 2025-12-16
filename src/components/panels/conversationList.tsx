import { Ellipsis, PanelRightOpen, SquarePen } from "lucide-react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useStore } from "../../context/StoreContext";
import type { UIStore } from "../../stores/types";
import { Link } from "@tanstack/react-router";

const ConversationList: React.FC = () => {
    const sampleData = [
        { id: 1, title: "Planning our weekend trip" },
        { id: 2, title: "Ideas for the new project" },
        { id: 3, title: "Can you review this code?" },
        { id: 4, title: "Birthday gift suggestions" },
        { id: 5, title: "Lunch tomorrow?" },
        { id: 6, title: "Meeting follow-up" },
        { id: 7, title: "Funny memes to share" },
        { id: 8, title: "Movie night plans" },
        { id: 9, title: "Daily standup notes" },
        { id: 10, title: "Weekend workout routine" },
        { id: 11, title: "Travel itinerary ideas" },
        { id: 12, title: "Homework help needed" },
        { id: 13, title: "Coffee catch-up" },
        { id: 14, title: "Project deadline approaching" },
        { id: 15, title: "Favorite music playlists" },
        { id: 16, title: "Book recommendations" },
        { id: 17, title: "Dinner recipes to try" },
        { id: 18, title: "Tech news updates" },
        { id: 19, title: "Weekend getaway photos" },
        { id: 20, title: "Funny work stories" },
        { id: 21, title: "Team brainstorming session" },
        { id: 22, title: "Random thoughts" },
        { id: 23, title: "Shopping list for the week" },
        { id: 24, title: "Gardening tips" },
        { id: 25, title: "Concert tickets available" },
    ];
    
    const { middlePanelCollapsed, setMiddlePanelCollapsed } = useStore()
    .ui as UIStore;
    return (
        <div className="h-full flex flex-col overflow-hidden relative bg-[#faf7f7] dark:bg-[#141416]">
            <div className="flex justify-end items-center px-2 py-4 border-b border-gray-100 dark:border-zinc-800/50">
                {/* <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                    BRAIN
                </h2> */}
                <div
                    className="z-1000 opacity-50 flex items-center justify-center gap-4 rounded-full cursor-pointer hover:bg-transparent text-2xl  dark:text-gray-200 text-[#333]  top-1  right-0"
                   
                >

                    <Link to="/in/brain"
                    className="hover:opacity-45"
                    >
                    <SquarePen size={18} />
                    </Link>

                   
                <PanelRightOpen size={18} 
                className="hover:opacity-45"
                onClick={() => setMiddlePanelCollapsed(!middlePanelCollapsed)}
                />
      </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                {sampleData.map((item) => (
                    <Link to={`/in/brain/${item.id}`} 
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
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ConversationList;