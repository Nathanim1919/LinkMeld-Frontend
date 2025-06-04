import React from "react";
import { motion } from "framer-motion";
import { Brain, ChevronRight, Sparkles, Clock, BookOpen, Link2, Zap } from "lucide-react";

const EmptyNoteView = () => {
  const prompts = [
    {
      text: "Continue reading where I left off",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      text: "What was I researching yesterday?",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      text: "Show related notes about current project",
      icon: <Link2 className="w-4 h-4" />,
    },
    {
      text: "Summarize recent highlights",
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      text: "Install browser extension",
      icon: <Zap className="w-4 h-4" />,
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 text-indigo-500"
      >
        <Brain className="w-14 h-14" />
      </motion.div>
      
      <div className="max-w-md w-full space-y-1">
        <h1 className="text-2xl font-light text-center text-gray-800 dark:text-gray-200 mb-3">
          Your Second Brain
        </h1>
        
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
          Where would you like to start?
        </p>

        <div className="space-y-2">
          {prompts.map((prompt, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 4 }}
              className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => console.log(prompt.text)}
            >
              <span className="mr-3 text-gray-500 dark:text-gray-400">
                {prompt.icon}
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                {prompt.text}
              </span>
              <ChevronRight className="ml-auto w-4 h-4 text-gray-400" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>Try saving your first note or asking about your knowledge</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyNoteView;