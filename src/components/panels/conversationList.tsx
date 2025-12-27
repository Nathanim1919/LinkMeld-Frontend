import { Ellipsis, PanelRightOpen, SquarePen } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import type { UIStore } from "../../stores/types";
import { Link } from "@tanstack/react-router";
import { ConversationListSkeleton } from "../skeleton/ConversationListSkeleton";
import { useBrainStore } from "../../stores/brain-store";
import { useEffect } from "react";

const ConversationList: React.FC = () => {
    const { conversationList, conversations, fetchConversations, selectConversation, fetchConversation } = useBrainStore();

    let loading = true;

    const { middlePanelCollapsed, setMiddlePanelCollapsed } = useStore()
        .ui as UIStore;

    if (!loading) return <ConversationListSkeleton />;

    useEffect(() => {
        fetchConversations();
    }, []);

    console.log(conversations);
    return (
        <div className="h-full flex flex-col overflow-hidden relative bg-[#faf7f7] dark:bg-[#141416]">
            <div className="flex justify-end items-center px-2 py-2">
                <div className="z-1000 opacity-50 flex items-center justify-center gap-4 rounded-full cursor-pointer hover:bg-transparent text-2xl  dark:text-gray-200 text-[#333]  top-1  right-0">
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
            <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
                {Object.values(conversationList || {}).map((item) => (
                    <Link
                    onClick={async () => {
                        // Fetch full conversation if not already loaded
                        if (!conversations[item._id || item.id]) {
                            await fetchConversation(item._id || item.id);
                        }
                        selectConversation(item._id || item.id);
                    }}
                    to={`/in/brain/${item._id || item.id}`}
                        key={item._id || item.id}
                        className="group flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-100/80 dark:hover:bg-zinc-800/80 transition-all duration-200 cursor-pointer"
                    >
                        <div className="flex-1 min-w-0 pr-3">
                            <h3 className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white truncate">
                                {item.title || item.lastMessage?.content?.slice(0, 50) + "..." || "New Conversation"}
                            </h3>
                            {item.lastMessage && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                    {item.lastMessage.content}
                                </p>
                            )}
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