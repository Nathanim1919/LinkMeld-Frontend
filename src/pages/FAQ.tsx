import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export const FAQ = () => {
  const faqs = [
    {
      question: "How does CanvasFlow differ from other design tools?",
      answer:
        "CanvasFlow reimagines collaborative design with real-time multi-user editing, AI-powered design suggestions, and seamless integration across all your devices. Unlike traditional tools, it maintains pixel-perfect precision while enabling true teamwork.",
    },
    {
      question: "What platforms does CanvasFlow support?",
      answer:
        "CanvasFlow is available on macOS, Windows, iPadOS, and through any modern web browser. Our iOS and Android apps allow for reviewing and light editing on mobile devices.",
    },
    {
      question: "How does CanvasFlow protect my design files?",
      answer:
        "All files are encrypted in transit and at rest with enterprise-grade security. We offer version history with unlimited undo and optional blockchain-based timestamping for intellectual property protection.",
    },
    {
      question: "Can I use CanvasFlow offline?",
      answer:
        "Yes. CanvasFlow automatically syncs your work when you reconnect. All core functionality is available offline, with cloud features becoming available once connection is restored.",
    },
    {
      question: "What collaboration features does CanvasFlow include?",
      answer:
        "Teams enjoy live cursors with avatar identification, threaded comments, change tracking, and presentation mode with remote control handoff. Enterprise plans include dedicated team workspaces with advanced permissions.",
    },
    {
      question: "How often does CanvasFlow receive updates?",
      answer:
        "We release meaningful updates every month with new features, performance improvements, and quality refinements. All updates are included with your subscription at no additional cost.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative isolate py-24 sm:py-32 bg-black overflow-hidden">
      {/* Subtle dark grid background */}
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%)]">
        <div className="absolute inset-0 [background:linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [background-position:calc(50%-1.75rem)_calc(50%-1.75rem)]" />
      </div>
      
      {/* Very subtle blue tint overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-900/5 to-gray-900" />

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Clean, typography-focused header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-gray-50 sm:text-5xl">
            CanvasFlow FAQs
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Quick answers to common questions about our design platform.
          </p>
        </motion.div>

        {/* Minimalist FAQ items with Apple-like precision */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
          className="space-y-1 divide-y divide-gray-800"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 1, y: 0 }
              }}
              className="group"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-start justify-between text-left py-6 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-lg"
              >
                <span className="text-lg font-medium text-gray-100 group-hover:text-blue-300 transition-colors duration-200">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full group-hover:bg-gray-800 transition-colors duration-200"
                >
                  <FiChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-300 transition-colors duration-200" />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: "auto",
                      transition: { 
                        opacity: { duration: 0.15 },
                        height: { duration: 0.25, ease: [0.33, 1, 0.68, 1] }
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: { 
                        opacity: { duration: 0.1 },
                        height: { duration: 0.2, ease: [0.33, 1, 0.68, 1] }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-6 text-gray-400 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Understated CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-6 text-lg">
            Need more detailed information?
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
          >
            <span>Contact CanvasFlow Support</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};