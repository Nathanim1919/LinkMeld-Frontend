import { motion } from "framer-motion";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ReferenceCard } from "./ReferenceCard";
import { Clipboard, MoreHorizontal } from "lucide-react"; // Added Lucide icon imports
import { RiGeminiFill } from "react-icons/ri";


interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  references?: { id: string; title: string; url: string }[]; // Adjusted type for references
}

export const MessageBubble = ({ role, content, references }: MessageBubbleProps) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <motion.div
        className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className={`relative text-md max-w-[85%] rounded-2xl text-[14px] p-2 ${
          role === 'user' 
            ? 'bg-blue-600/0 rounded-br-none text-gray-400 ' 
            : 'bg-[#161618] rounded-bl-none border text-[#ffffff] border-gray-800/50'
        }`}>
          {/* Added Gemini icon */}
          {
          role === 'assistant' && 
          <span className="absolute -top-2 left-2 text-gray-500">
             <RiGeminiFill className="h-4 w-4 text-violet-500" /> 
          </span>
          }
         
          {/* Message Content */}
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
          
  
          {/* Message Actions (Appear on hover) */}
          {isHovered && (
            <motion.div 
              className="absolute -top-3 right-2 flex space-x-1  rounded-full p-1 shadow-lg"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button className="p-1 cursor-pointer text-gray-300 hover:text-white">
                <Clipboard className="h-3 w-3" /> {/* Replaced icon */}
              </button>
              <button className="p-1 cursor-pointer text-gray-300 hover:text-white">
                <MoreHorizontal className="h-3 w-3" /> {/* Replaced icon */}
              </button>
            </motion.div>
          )}
  
          {/* References */}
          {references && references.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-800/30">
              <p className="text-xs text-gray-400 mb-2">Based on:</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {references.map(ref => (
                  <ReferenceCard key={ref.id} />
                ))}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    );
  };