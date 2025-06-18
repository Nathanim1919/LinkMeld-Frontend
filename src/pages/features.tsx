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
    title: "Neural Capture Protocol",
    description: "Save thoughts, articles, and media at synaptic speed with our quantum extension.",
    icon: <FiZap />,
    color: "bg-gradient-to-br from-violet-600 to-fuchsia-500",
    delay: 0.1
  },
  {
    title: "Gravitational Organization",
    description: "Auto-cluster content with AI-powered tags that adapt to your cognitive patterns.",
    icon: <FiFolder />,
    color: "bg-gradient-to-br from-amber-400 to-orange-500",
    delay: 0.2
  },
  {
    title: "Warp Sync Network",
    description: "Instant multi-device sync via our dark matter-powered cloud infrastructure.",
    icon: <FiCloud />,
    color: "bg-gradient-to-br from-cyan-400 to-blue-500",
    delay: 0.3
  },
  {
    title: "Zero-G Focus Mode",
    description: "Anti-distraction field that isolates your content in pure thought space.",
    icon: <FiEye />,
    color: "bg-gradient-to-br from-rose-400 to-pink-500",
    delay: 0.4
  },
];

export const Features = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden py-32 px-6 bg-[linear-gradient(180deg,#0A0A0A_0%,#111111_100%)] border-t border-b border-white/5"
    >
      {/* === Quantum Noise Background === */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')]" />
      </div>

      {/* === Floating Dots === */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: Math.random() * 8 + 2 + 'px',
            height: Math.random() * 8 + 2 + 'px',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 60 - 30],
            x: [0, Math.random() * 60 - 30],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative">
        {/* === Animated Header === */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FFFFFF_20%,#A78BFA_80%)]">
              Cognitive Augmentation
            </span> <br />
            <span className="text-xl md:text-2xl font-medium text-zinc-400 mt-4 inline-block">
              Designed for your <span className="text-violet-400">post-human</span> workflow
            </span>
          </h2>
        </motion.div>

        {/* === Feature Grid === */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: feature.delay }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-[#181818] to-[#121212] p-8 shadow-2xl"
            >
              {/* Gradient Decoration */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${feature.color} opacity-20 blur-3xl -z-10 group-hover:opacity-30 transition-opacity`} />

              <div className="flex items-start gap-6">
                {/* Icon Container */}
                <div className={`flex items-center justify-center rounded-lg ${feature.color} w-14 h-14 flex-shrink-0 shadow-lg`}>
                  <feature.icon.type className="text-white text-2xl" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    {feature.description}
                  </p>
                  <button className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors">
                    Learn more <FiArrowRight className="mt-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* === Microcopy === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20 text-zinc-500 text-sm"
        >
          Compatible with 98.7% of known cognitive architectures • Zero latency • No telepathy required
        </motion.div>
      </div>
    </motion.section>
  );
};