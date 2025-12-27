import { Ellipsis, Send, Share, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useBrainStore } from "../../stores/brain-store";

export const BrainChatContainer = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { conversationId } = useParams({ strict: false });
    const { conversations, fetchConversation } = useBrainStore();
    const conversation = conversations[conversationId || ''];

    // Handle direct URL navigation - fetch conversation if not in store
    useEffect(() => {
        if (conversationId && !conversation && !isLoading && !conversationId.startsWith('temp-')) {
            setIsLoading(true);
            fetchConversation(conversationId).finally(() => {
                setIsLoading(false);
            });
        }
    }, [conversationId, conversation, fetchConversation, isLoading]);

    // Show loading state while fetching
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="text-gray-500 dark:text-gray-400 mb-2">Loading conversation...</div>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
            </div>
        );
    }

    // Show not found after loading attempt
    if (!conversation && conversationId) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="text-red-500 dark:text-red-400 mb-2">Conversation not found</div>
                    <div className="text-sm text-gray-400">ID: {conversationId}</div>
                </div>
            </div>
        );
    }
    return (
        <div className=" w-full relative bg-[#f6f3f3] dark:bg-[#101010] flex flex-col h-[calc(100vh-0px)]">
            <div className="flex text-black dark:text-white items-center justify-between px-4 py-2 border-b border-[#e2e0e0] dark:border-[#1b1b1c]">
                <div>
                    <h2 className="text-2xl font-bold">Deepen</h2>
                </div>
                <button className="cursor-pointer hover:opacity-50" onClick={() => setShowOptions(!showOptions)}>
                    <Ellipsis size={20} />
                </button>
                {showOptions && (
                    <div className="flex overflow-hidden flex-col text-black dark:text-white shadow-2xl absolute top-10 right-4 bg-white dark:bg-[#101010] border border-gray-300 dark:border-gray-800 rounded-md">
                        <button className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] cursor-pointer">
                            <Share size={16} />
                            Share
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] cursor-pointer">
                            <Trash size={16} />
                            Delete
                        </button>

                    </div>
                )}
            </div>
            <div className="flex flex-col  flex-1 p-4 w-[70%] mx-auto space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
                {conversation?.messages.map((item) => (
                    <div key={item.id} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`text-sm font-medium text-black dark:text-white ${item.role === 'assistant' ? '' : 'bg-gray-200 dark:bg-[#1a1a1a] text-black dark:text-white'} rounded-2xl p-4`}>{item.content}</div>
                    </div>
                ))}
            </div>
            <div className="flex shadow-2xl overflow-hidden pl-4 p-3  items-center  w-[70%] bg-[#f6f3f3] dark:bg-[#101010]  mx-auto justify-center rounded-full border mb-4 border-[#e2e0e0] dark:border-[#1b1b1c]">
                <textarea
                    className="w-full h-full resize-none focus:outline-none text-black dark:text-white"
                    placeholder="Ask anything..."
                    rows={1}
                />
                <button className=" w-8 h-8 grid place-items-center text-black dark:text-white rounded-full cursor-pointer hover:opacity-50">
                    <Send size={22} />
                </button>
            </div>
        </div>
    );
}; 