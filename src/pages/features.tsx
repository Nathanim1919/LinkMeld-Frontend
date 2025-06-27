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
    icon: <FiZap className="text-white" />,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    delay: 0.1
  },
  {
    title: "Smart Organization",
    description: "Automatically categorizes your content with AI-powered tags that learn from your behavior.",
    icon: <FiFolder className="text-white" />,
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    delay: 0.2
  },
  {
    title: "Universal Sync",
    description: "Access your library from any device. Changes appear instantly across all platforms.",
    icon: <FiCloud className="text-white" />,
    color: "bg-gradient-to-br from-green-500 to-teal-500",
    delay: 0.3
  },
  {
    title: "Focus Mode",
    description: "Eliminate distractions with a clean reading interface optimized for deep work.",
    icon: <FiEye className="text-white" />,
    color: "bg-gradient-to-br from-orange-500 to-amber-500",
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
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] bg-purple-900/10 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header with Apple-like typography */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            <span className="text-white">A better way to</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              save and organize
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughtfully designed tools that adapt to your workflow.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: feature.delay }}
              viewport={{ once: true, margin: "-50px" }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/70 transition-all">
                <div className="flex items-start gap-6">
                  {/* Icon with gradient background */}
                  <div className={`flex items-center justify-center rounded-xl ${feature.color} w-12 h-12 flex-shrink-0`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <button className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      Learn more <FiArrowRight className="mt-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer microcopy */}
        <motion.div
          className="text-center mt-20 text-sm text-gray-500"
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