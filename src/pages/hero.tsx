import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Image from "../assets/image.png";

const HeroPage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden isolate">
      {/* Ultra-minimal background with dynamic lighting */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-violet-900/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_0%,transparent_70%)]" />
      </div>

      {/* Content with precise Apple-like spacing */}
      <div className="container mx-auto px-6 flex flex-col items-center justify-center min-h-screen py-4">
        {/* Headline with refined typography */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-light tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="block">Your thoughts,</span>
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200">
              perfectly preserved
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Capture web content with precision. Organize with intelligence. 
            <span className="text-violet-300"> Retrieve with ease.</span>
          </motion.p>
        </motion.div>

        {/* Product showcase with refined animation */}
        <motion.div
          className="w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
        >
          <div className="relative">
            {/* Subtle glow effect */}
            <div className="absolute -inset-4 bg-violet-500/10 rounded-3xl blur-xl -z-10" />
            
            {/* Product image with refined border */}
            <img
              src={Image}
              alt="App interface"
              className="w-full h-auto rounded-2xl border border-white/10 shadow-2xl"
            />
            
            {/* Ultra-subtle floating particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 20 - 10],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: Math.random() * 6 + 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroPage;