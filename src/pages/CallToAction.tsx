import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiDownload, FiArrowUpRight } from "react-icons/fi";

export const CallToAction = () => {
  return (
    <motion.section 
      className="relative overflow-hidden py-28 px-6 bg-gradient-to-b from-[#000000] to-[#050505]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Subtle gradient elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] bg-indigo-900/10 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative">
        {/* Headline */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-300">
            Transform how you capture ideas
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p 
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Save web content instantly with our intuitive extension. Organize, retrieve, 
          and <span className="text-violet-300 font-medium">never lose inspiration</span> again.
        </motion.p>

        {/* Buttons */}
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
              className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium px-8 py-4 rounded-lg shadow-lg hover:shadow-violet-500/20 transition-all"
            >
              <FiDownload className="text-lg" />
              Add to Browser
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/signup"
              className="flex items-center gap-3 border border-gray-700 hover:border-violet-400/30 bg-gray-900/50 hover:bg-gray-800/50 text-white px-8 py-4 rounded-lg transition-all"
            >
              Learn More
              <FiArrowUpRight className="text-lg" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Microcopy */}
        <motion.p 
          className="mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Free forever • One-click install • No account required
        </motion.p>
      </div>
    </motion.section>
  );
};