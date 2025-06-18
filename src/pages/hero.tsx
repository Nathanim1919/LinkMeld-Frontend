import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import Image from "../assets/image.png"

const HeroPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:px-24 relative overflow-hidden isolate">
      {/* === Stellar Background === */}
      <div className="absolute inset-0 overflow-hidden -z-20">
        <div className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,#7F5AF0_0%,transparent_70%)] opacity-20 blur-[100px] animate-pulse-slow" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
      </div>

      {/* === Navigation (Zero-Gravity Float) === */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center mb-24"
      >
        <h1 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-violet-600">
          lnked
        </h1>
        <div className="flex items-center gap-6">
          {['Features', 'Pricing', 'Login'].map((item) => (
            <Link 
              key={item}
              to={`#${item.toLowerCase()}`}
              className="text-sm text-gray-400 hover:text-white transition-all duration-300 hover:scale-[1.02]"
            >
              {item}
            </Link>
          ))}
          <Link 
            to="#get-started" 
            className="text-sm bg-white/90 text-black px-4 py-2 rounded-full hover:bg-white transition-all duration-300 flex items-center gap-1 hover:shadow-glow"
          >
            Get Started <FiArrowRight className="mt-0.5" />
          </Link>
        </div>
      </motion.nav>

      {/* === Hero Content (Warp-Speed Entrance) === */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1 
          className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight"
          style={{
            background: "linear-gradient(90deg, #FFFFFF 30%, #A78BFA 70%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent"
          }}
        >
          Where ideas <span className="italic">ignite</span> like supernovas
        </motion.h1>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          A <span className="text-violet-400">quantum workspace</span> for your thoughts. 
          Dark matter design. Warp-speed organization.
        </p> 
        
        <div className="flex justify-center gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="#get-started" 
              className="bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-violet-500/30 transition-all"
            >
              Begin Cosmic Journey <FiArrowRight />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="#demo" 
              className="text-white/80 hover:text-white border border-white/10 px-8 py-4 rounded-xl font-medium flex items-center gap-2 hover:bg-white/5 transition-all"
            >
              <FiPlay /> Watch Demo
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* === UI Preview (Anti-Gravity Float) === */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 relative"
      >
        <div className="absolute inset-0 bg-violet-600/20 blur-3xl rounded-full -z-10" />
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#111111] to-[#0A0A0A] shadow-2xl w-full max-w-6xl mx-auto">
          <img
            src={Image}
            alt="App UI floating in space"
            className="w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-violet-400/30"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 40 - 20],
              x: [0, Math.random() * 40 - 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HeroPage;