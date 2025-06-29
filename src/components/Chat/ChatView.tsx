import { useEffect, useRef, useMemo } from "react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

export const ChatView = () => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Sample messages for demonstration
    const messages = useMemo(() => [
        {
            role: 'user',
            content: 'What is the current concept?',
            references: []
        },
        {
            role: 'assistant',
            content: 'The current concept is about AI-driven chat interfaces.',
            references: [
            ]
        },
        {
            role: 'user',
            content: 'Can you explain it like I\'m 5?',
            references: []
        },
        {
            role: 'assistant',
            content: 'Sure! Imagine a robot that can talk to you and answer your questions like a friend.',
            references: []
        },
        {
            role: 'user',
            content: 'What are the benefits of using AI in chat interfaces?',
            references: []
        },
        {
            role: 'assistant',
            content: 'AI chat interfaces can provide quick responses, understand natural language, and learn from interactions to improve over time.',
            references: [
            ]
        },
        {
            role: 'user',
            content: 'Can you give me some examples of AI chat interfaces?',
            references: []
        },
        {
            role: 'assistant',
            content: 'Some popular AI chat interfaces include Google Assistant, Amazon Alexa, and Apple Siri.',
            references: [
            ]
        },
        {
            role: 'user',
            content: 'How do these interfaces learn and improve?',
            references: []
        },
        {
            role: 'assistant',
            content: 'They learn from user interactions, feedback, and by analyzing large datasets to understand language patterns.',
            references: []
        },
        {
            role: 'user',
            content: 'What are some challenges in developing AI chat interfaces?',
            references: []
        },
        {
            role: 'assistant',
            content: 'Challenges include understanding context, handling ambiguous queries, and ensuring privacy and security.',
            references: []
        }
    ], []);
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
  
    return (
      <div className="h-full flex flex-col">
        {/* Message History */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {messages.map((msg, index) => (
            <MessageBubble 
              key={index}
              role={msg.role}
              content={msg.content}
              references={msg.references}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
  
        {/* Input Area */}
        <ChatInput />
      </div>
    );
  };