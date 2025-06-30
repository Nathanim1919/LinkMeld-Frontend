import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { useChat } from "../../context/ChatContext";

export const ChatView = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, isLoading } = useChat();
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    return (
      <div className="h-full bg-[#18181b] flex flex-col">
        {/* Message History */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {messages.map((msg, index) => (
            <MessageBubble 
              key={index}
              role={msg.role}
              content={msg.content}
              references={msg.references}
            />
          ))}
          <div ref={messagesEndRef} />
          {isLoading && (
            <div className="text-gray-500 text-sm italic text-center">
              <p>Thinking...</p>
            </div>
          )}
        </div>
  
        {/* Input Area */}
        <ChatInput />
      </div>
    );
  };