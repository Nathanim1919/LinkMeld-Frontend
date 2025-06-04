import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon, FolderSearchIcon, StarsIcon, BrainCircuitIcon, ZapIcon } from "lucide-react";

const EmptyNoteView = () => {
  // Define suggestions internally
  const suggestions = [
    {
      id: "tags",
      icon: <SparklesIcon className="w-5 h-5" />,
      title: "Explore Smart Tags",
      description: "Discover patterns in your notes with AI-generated tags",
      colorClass: "bg-purple-500 border-purple-500",
      action: () => console.log("Navigating to smart tags") // Replace with actual navigation
    },
    {
      id: "favorites",
      icon: <StarsIcon className="w-5 h-5" />,
      title: "View Favorites",
      description: "Revisit your most important saved insights",
      colorClass: "bg-amber-500 border-amber-500",
      action: () => console.log("Navigating to favorites")
    },
    {
      id: "folders",
      icon: <FolderSearchIcon className="w-5 h-5" />,
      title: "Check Smart Folders",
      description: "Let AI organize related content automatically",
      colorClass: "bg-blue-500 border-blue-500",
      action: () => console.log("Navigating to smart folders")
    }
  ];

  // Optional: Add a subtle animation to the brain icon
  const brainVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 md:p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl w-full mx-auto"
      >
        <div className="relative inline-block mb-6">
          <motion.div
            variants={brainVariants}
            animate="pulse"
          >
            <BrainCircuitIcon className="w-16 h-16 text-primary-500 opacity-90" />
          </motion.div>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-primary-500 blur-xl -z-10"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 mb-3">
          Welcome to Your Knowledge Hub
        </h1>
        
        <p className="text-base md:text-lg opacity-80 mb-8 md:mb-10 max-w-lg mx-auto">
          Capture, organize, and discover insights with AI-enhanced note taking.
          Start by saving content or exploring your existing knowledge.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-xl cursor-pointer transition-all ${suggestion.colorClass} bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm border border-opacity-20 shadow-lg`}
              onClick={suggestion.action}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white bg-opacity-10">
                  {suggestion.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-base md:text-lg font-semibold">{suggestion.title}</h3>
                  <p className="text-xs md:text-sm opacity-80 mt-1">{suggestion.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 md:mt-12 flex items-center justify-center gap-2 text-sm opacity-70"
        >
          <ZapIcon className="w-4 h-4" />
          <span>Tip: Use our AI search to find connections across your notes</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmptyNoteView;