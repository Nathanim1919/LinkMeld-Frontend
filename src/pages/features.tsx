import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap,
  FiFolder,
  FiCloud,
  FiSearch,
  FiMessageCircle,
  FiFilter,
  FiArrowRight,
} from "react-icons/fi";

const features = [
  {
    title: "Instant Web Capture",
    description:
      "Clip articles, tweets, and PDFs in a click. Our Chrome extension makes saving effortless.",
    icon: <FiZap size={20} />,
    color: "from-blue-500 to-blue-600",
    delay: 0.1,
  },
  {
    title: "AI Summaries & Key Points",
    description:
      "Quickly grasp what matters most. Our AI distills pages into digestible summaries.",
    icon: <FiSearch size={20} />,
    color: "from-emerald-500 to-teal-500",
    delay: 0.2,
  },
  {
    title: "Chat With Your Content",
    description:
      "Ask questions or brainstorm with AI on any saved page. It remembers context for smarter replies.",
    icon: <FiMessageCircle size={20} />,
    color: "from-purple-500 to-indigo-500",
    delay: 0.3,
  },
  {
    title: "Smart Collections",
    description:
      "Group and organize content by topic, project, or goal. Stay effortlessly structured.",
    icon: <FiFolder size={20} />,
    color: "from-pink-500 to-fuchsia-600",
    delay: 0.4,
  },
  {
    title: "Universal Access",
    description:
      "Sync across devices in real-time. Your brain is always with you — anytime, anywhere.",
    icon: <FiCloud size={20} />,
    color: "from-yellow-400 to-amber-500",
    delay: 0.5,
  },
  {
    title: "Filter by Source",
    description:
      "Narrow down your captured content by domain or type — like having a smart librarian.",
    icon: <FiFilter size={20} />,
    color: "from-gray-500 to-gray-700",
    delay: 0.6,
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
     
      {/* Gradient elements - more precise positioning */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-900/3 to-transparent rounded-full blur-[150px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-purple-900/3 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header - tighter tracking */}
        <motion.div
          className="text-center mb-24"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 12,
          }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-light tracking-tighter mb-6 leading-[1.08]">
            <span className="text-white">Capture once,</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r font-bold from-blue-400 to-blue-500">
              recall forever
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed tracking-tight">
            AI-enhanced memory for modern minds. Organize and interact with your
            web knowledge like never before.
          </p>
        </motion.div>

        {/* Feature Cards - Apple Card-inspired design */}
        <div className="grid gap-6 md:grid-cols-2 w-[90%] mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: feature.delay,
                type: "spring",
                stiffness: 120,
                damping: 12,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.2)]">
                <div className="flex items-start gap-6">
                  {/* Icon container - more refined gradient */}
                  <div
                    className={`flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} w-12 h-12 flex-shrink-0 shadow-inner`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  {/* Content - improved typography */}
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 tracking-tight leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 mb-4 leading-relaxed tracking-tight">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer microcopy - more refined */}
        <motion.div
          className="text-center mt-20 text-sm text-white/50 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Chrome Extension • AI-Powered • Privacy-First • Free to Start
        </motion.div>
      </div>
    </motion.section>
  );
};
