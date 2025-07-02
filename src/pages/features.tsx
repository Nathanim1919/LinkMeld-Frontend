import { motion } from "framer-motion";
import { 
  FiZap, 
  FiFolder, 
  FiCloud, 
  FiEye,
  FiArrowRight 
} from "react-icons/fi";

const features = [
  {
    title: "Instant Capture",
    description: "Save anything from the web with a single click. Our extension works seamlessly across all browsers.",
    icon: <FiZap size={20} />,
    color: "from-blue-500 to-blue-600",
    delay: 0.1
  },
  {
    title: "Smart Organization",
    description: "Automatically categorizes your content with AI-powered tags that learn from your behavior.",
    icon: <FiFolder size={20} />,
    color: "from-purple-500 to-purple-600",
    delay: 0.2
  },
  {
    title: "Universal Sync",
    description: "Access your library from any device. Changes appear instantly across all platforms.",
    icon: <FiCloud size={20} />,
    color: "from-teal-500 to-emerald-500",
    delay: 0.3
  },
  {
    title: "Focus Mode",
    description: "Eliminate distractions with a clean reading interface optimized for deep work.",
    icon: <FiEye size={20} />,
    color: "from-amber-500 to-orange-500",
    delay: 0.4
  },
];

export const Features = () => {
  return (
    <motion.section 
      className="relative py-32 px-6 bg-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Apple-style subtle noise texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjAyIiBudW1PY3RhdmVzPSI1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvc3ZnPg==')] opacity-[0.02] pointer-events-none" />
      
      {/* Precise gradient elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-gradient-to-br from-blue-900/5 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-[25%] right-[20%] w-[300px] h-[300px] bg-purple-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header with Apple typography */}
        <motion.div
          className="text-center mb-24"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 leading-[1.1]">
            <span className="text-white">A better way to</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
              save and organize
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Thoughtfully designed tools that adapt to your workflow.
          </p>
        </motion.div>

        {/* Feature grid - Apple card style */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: feature.delay,
                type: "spring",
                stiffness: 100,
                damping: 10
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="flex items-start gap-6">
                  {/* Icon with gradient background */}
                  <div className={`flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} w-12 h-12 flex-shrink-0`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-300">
                      Learn more <FiArrowRight className="mt-0.5 transition-transform group-hover:translate-x-1 duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer microcopy - Apple style */}
        <motion.div
          className="text-center mt-20 text-sm text-white/40 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          Available on all devices • End-to-end encryption • Free forever
        </motion.div>
      </div>
    </motion.section>
  );
};