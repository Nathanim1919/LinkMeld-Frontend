import { useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { SendHorizonal } from 'lucide-react';

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage } = useChat();

  const handleSend = () => {
    if (message.trim()) {
      addMessage({
        role: "user",
        content: message.trim(),
        references: [],
      });
      setMessage("");
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="px-5 py-4 border-t border-gray-700/50 bg-gray-900/30 backdrop-blur-2xl">
      {/* Suggested Prompts */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
        {["Explain like I'm 5", "Give me examples", "Related concepts"].map(
          (prompt) => (
            <button
              key={prompt}
              className="text-xs bg-gray-800 text-gray-300 px-3.5 py-2 rounded-full whitespace-nowrap flex-shrink-0 hover:bg-gray-700 active:bg-gray-600 transition-colors duration-150"
              onClick={() => {
                setMessage(prompt);
                textareaRef.current?.focus();
              }}
            >
              {prompt}
            </button>
          )
        )}
      </div>

      {/* Text Input */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700/30 text-white py-3 px-5 pr-14 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500 text-sm leading-5 transition-all duration-200 scrollbar-hide"
          placeholder="Ask about the current concept..."
          rows={1}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          className={`absolute right-2 bottom-3 p-2 rounded-full transition-all ${
            message.trim() 
              ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700" 
              : "bg-gray-700 text-gray-500"
          }`}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          <SendHorizonal className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
};