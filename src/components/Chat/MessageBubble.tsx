import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { LLMRenderer } from "../LLMRenderer";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  references?: { id: string; title: string; url: string }[];
}

export const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  const isUser = role === "user";

  return (
    <motion.div
      className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div
        className={`flex max-w-[90%] md:max-w-[100%] gap-4 ${isUser ? "flex-row-reverse" : "flex-row"
          }`}
      >
        {/* Avatar Section */}
        <div className="flex-shrink-0 flex flex-col items-center">
          {!isUser && <div
            className={`w-8 h-8 rounded-full grid place-items-center border shadow-sm 
             
               "bg-white dark:bg-[#1e1e1e] border-violet-100 dark:border-violet-900/30"
            `}
          >
            {!isUser && (

              <Brain className="w-5 h-5 text-violet-500 animate-pulse-slow" />
            )}
          </div>}
        </div>

        {/* Content Section */}
        <div
          className={`flex flex-col min-w-0 ${isUser ? "items-end" : "items-start"
            }`}
        >
          {/* Name Label (Optional, adds pro feel) */}
          <span className="text-xs text-gray-400 dark:text-gray-500 mb-1 ml-1">
            {isUser ? "" : "Deepen"}
          </span>

          {/* Bubble / Text Area */}
          <div
            className={`relative px-5 py-1 text-[15px] leading-relaxed shadow-sm ${isUser
                ? "bg-[#f4f4f4] dark:bg-[#161616] text-gray-800 dark:text-gray-100 rounded-[20px] rounded-tr-sm border border-transparent dark:border-white/5"
                : "bg-transparent text-gray-800 dark:text-gray-200 w-full pl-0 pt-0" // Assistant looks like a document
              }`}
          >
            <LLMRenderer markdown={content} />
          </div>

          {/* Action Row (Optional: Copy, Regenerate, etc. placeholder) */}
          {!isUser && (
            <div className="flex gap-2 mt-2 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* This is where you would put Copy/Regenerate buttons */}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};