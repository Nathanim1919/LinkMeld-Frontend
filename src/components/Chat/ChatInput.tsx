import { useRef, useState } from "react";

export const ChatInput = () => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
  
    const handleSend = () => {
      if (message.trim()) {
        // Send logic here
        setMessage('');
        textareaRef.current?.focus();
      }
    };
  
    return (
      <div className="px-6 py-4 border-t border-gray-800 bg-black/50 backdrop-blur-lg">
        {/* Suggested Prompts */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          {['Explain like I\'m 5', 'Give me examples', 'Related concepts'].map((prompt) => (
            <button
              key={prompt}
              className="text-xs bg-gray-800/70 text-gray-300 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0"
              onClick={() => setMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
  
        {/* Text Input */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-800/70 backdrop-blur-md rounded-xl border border-gray-700/50 text-white py-3 px-4 pr-12 resize-none focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-transparent"
            placeholder="Ask about the current concept..."
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            className={`absolute right-3 bottom-3 p-1 rounded-full transition-all ${message.trim() ? 'bg-blue-500' : 'bg-gray-700'}`}
            onClick={handleSend}
            disabled={!message.trim()}
          >
            {/* <PaperAirplaneIcon className="h-4 w-4 text-white" /> */}
          </button>
        </div>
      </div>
    );
  };