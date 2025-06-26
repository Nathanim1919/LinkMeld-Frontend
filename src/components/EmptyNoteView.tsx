import React from "react";
import { motion } from "framer-motion";
import { FiDownload, FiMousePointer, FiBookmark } from "react-icons/fi";
import { FaChrome } from "react-icons/fa";

const EmptyNoteView = () => {
  // Time-based greeting
  const time = new Date().getHours();
  const greeting = time < 12 ? "Morning" : time < 18 ? "Afternoon" : "Evening";
  const userName = "Nathan"; // Would come from user context in real app

  const steps = [
    {
      icon: <FiDownload className="w-5 h-5 text-blue-500" />,
      text: "Add to Chrome",
      subtext: "One-click install, free forever",
      action: "Install"
    },
    {
      icon: <FiMousePointer className="w-5 h-5 text-purple-500" />,
      text: "Click the capture button",
      subtext: "It appears in your browser toolbar",
      action: "Try it"
    },
    {
      icon: <FiBookmark className="w-5 h-5 text-green-500" />,
      text: "Boom! It's saved",
      subtext: "Access anytime from your library",
      action: "View"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-[#121212]">
      <div className="max-w-md w-full space-y-10">
        {/* Header with greeting */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 mb-2"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring" }}
          >
            <FiBookmark className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          </motion.div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Good {greeting}, {userName}
          </p>
          <h1 className="text-3xl font-light text-gray-900 dark:text-white">
            Ready to capture the web?
          </h1>
        </motion.div>

        {/* Step list */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-0.5 text-sm font-medium">
                {i + 1}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700">
                    {step.icon}
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">{step.text}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-11">{step.subtext}</p>
              </div>
              {i === 0 && (
                <motion.button
                  className="px-3 py-1.5 rounded-lg cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm flex items-center gap-1 shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaChrome className="w-3 h-3" />
                  {step.action}
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Visual indicator */}
        <motion.div 
          className="flex justify-center pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-1.5 w-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmptyNoteView;