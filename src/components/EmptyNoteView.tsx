import React from "react";
import { motion } from "framer-motion";
import { FiBookmark, FiChevronRight } from "react-icons/fi";

const EmptyNoteView = () => {
  const time = new Date().getHours();
  const narrative =
    time < 12
      ? "Morning ideas, preserved"
      : time < 18
      ? "Afternoon inspiration, captured"
      : "Evening discoveries, saved";

  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center p-6 bg-black relative isolate">
      {/* Gradient Blur Background (Pseudo-element Technique) */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="relative h-full w-full">
          {/* Animated Gradient Layer */}
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,_rgba(59,_130,_246,_0.2)_0%,_transparent_70%)] opacity-30 animate-[pulse_15s_ease-in-out_infinite]" />
          
          {/* Grid Texture */}
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,_255,_255,_0.03)_1px,_transparent_1px),linear-gradient(90deg,_rgba(255,_255,_255,_0.03)_1px,_transparent_1px)] [background-size:24px_24px]" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full space-y-16">
        {/* Typography */}
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.h1
            className="text-6xl font-bold text-white tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {narrative.split(",")[0]},
            <motion.span
              className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {narrative.split(",")[1]}
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Begin by installing the extension—your digital library awaits.
          </motion.p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          className="flex flex-col items-center space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-gray-700">
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
            <motion.div
              className="relative z-10 w-3 h-3 rounded-full bg-blue-500"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>

          <motion.button
            className="flex items-center gap-2 cursor-pointer text-blue-400 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-sm">Install extension</span>
            <FiChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default EmptyNoteView;