import React from "react";
import { motion } from "framer-motion";
import { FiPlus, FiBookmark } from "react-icons/fi";

const EmptyNoteView = () => {
  const time = new Date().getHours();
  const greeting =
    time < 12 ? "Good morning" : time < 18 ? "Good afternoon" : "Good evening";
  const narrative =
    time < 12
      ? "Capture your morning inspiration"
      : time < 18
      ? "Refine your afternoon thoughts"
      : "Preserve your evening reflections";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Premium Dark Background with Subtle Texture */}
      <div className="absolute inset-0 z-0">
        {/* Deep Black Base */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        
        {/* Subtle Radial Gradient */}
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
        
        {/* Ultra-subtle Noise Texture */}
        <div className="absolute inset-0 opacity-5 [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNSIgLz48L3N2Zz4=')]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl w-full space-y-16">
        {/* Typography Section with Apple-like Precision */}
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-lg text-gray-400 tracking-widest font-medium"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {greeting}
          </motion.p>

          <motion.h1
            className="text-5xl font-medium text-white tracking-tight leading-[1.1]"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {narrative}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400/90 max-w-lg mx-auto leading-relaxed font-light tracking-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Tap <span className="text-gray-300">+</span> to create your first note
          </motion.p>
        </motion.div>

        {/* Apple-style Floating Action Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg flex items-center justify-center relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Core */}
            <div className="absolute inset-0 rounded-full bg-white opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
            
            {/* Subtle Glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 [box-shadow:0_0_20px_5px_rgba(255,255,255,0.15)]" />
            
            {/* Plus Icon */}
            <FiPlus className="w-6 h-6 text-gray-900" />
            
            {/* Micro-interaction Indicator */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white/10"
              initial={{ scale: 1 }}
              whileTap={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>

        {/* Ultra-subtle Hint */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <p className="text-xs text-gray-500/60 tracking-wider">
            YOUR NOTES WILL APPEAR HERE
          </p>
        </motion.div>
      </div>

      {/* Apple-style Status Bar (simulated) */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-between px-6 pt-6 text-xs text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span>9:41</span>
        <div className="flex space-x-2">
          <span>5G</span>
          <span>100%</span>
        </div>
      </motion.div>

      {/* Premium Bottom Branding */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <p className="text-xs text-gray-500/50 tracking-wider">
          Designed with intention in California
        </p>
      </motion.div>
    </div>
  );
};

export default EmptyNoteView;