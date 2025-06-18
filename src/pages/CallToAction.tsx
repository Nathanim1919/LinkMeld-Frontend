import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";

export const CallToAction = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden py-32 px-6 bg-[linear-gradient(135deg,#0F0F0F_0%,#050505_100%)] border-t border-b border-white/5"
    >
      {/* === Stellar Background Elements === */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
      </div>

      {/* === Pulsing Cosmic Ring === */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square border border-white/5 rounded-full pointer-events-none"
      />

      <div className="max-w-5xl mx-auto text-center relative">
        {/* === Headline with Stellar Impact === */}
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FFFFFF_30%,#A78BFA_70%)]">
            Launch your ideas into 
          </span> <br />
          <span className="italic text-violet-400">hyperspace</span>
        </motion.h2>

        {/* === Subtext with Galactic Whisper === */}
        <motion.p 
          className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Capture light-speed thoughts before they escape the event horizon. 
          <span className="text-violet-300"> Zero inertia.</span>
        </motion.p>

        {/* === Warp-Speed Buttons === */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="#install"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-4 rounded-xl shadow-lg hover:shadow-violet-500/30 transition-all duration-300"
            >
              <FiDownload className="text-lg" />
              Install Quantum Extension
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/signup"
              className="flex items-center gap-2 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl transition-all duration-300"
            >
              Warp to Sign Up
              <FiArrowUpRight className="text-lg" />
            </Link>
          </motion.div>
        </motion.div>

        {/* === Microcopy with Anti-Matter Glow === */}
        <motion.p 
          className="mt-8 text-sm text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          No dark matter required • 37-second setup • Works across 11 dimensions
        </motion.p>
      </div>
    </motion.section>
  );
};