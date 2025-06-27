import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export const FAQ = () => {
  const faqs = [
    {
      question: "How does Lnkd differ from traditional knowledge management tools?",
      answer: "Lnkd reimagines knowledge work with neural connections between ideas rather than rigid folders. Our AI surfaces relevant connections as you work, and everything syncs instantly across all your devices with end-to-end encryption."
    },
    {
      question: "What makes Lnkd's privacy approach different?",
      answer: "We built Lnkd on zero-knowledge architecture. Your data is encrypted before it leaves your device, and we never store decryption keys on our servers. Even we can't access your content."
    },
    {
      question: "How does the AI assistant work without compromising privacy?",
      answer: "Our AI processes information locally on your device when possible. For cloud processing, we use homomorphic encryption that allows computation on encrypted data without decryption."
    },
    {
      question: "Can I use Lnkd offline?",
      answer: "Yes. Lnkd works fully offline, with all changes syncing automatically when you reconnect. We use conflict-free replicated data types (CRDTs) to ensure seamless merging of offline edits."
    },
    {
      question: "What platforms does Lnkd support?",
      answer: "Lnkd is available on macOS, Windows, iOS, and Android, with a web version for browsers. All platforms maintain feature parity and real-time sync through our custom protocol."
    },
    {
      question: "How does Lnkd handle team collaboration?",
      answer: "Teams get granular permission controls, live presence indicators, and version history with intelligent merge capabilities. All collaboration happens over encrypted channels with per-user access controls."
    },
    {
      question: "What file types can I work with in Lnkd?",
      answer: "Lnkd natively supports over 200 file types with rich previews, including documents, code, images, videos, and 3D models. You can connect any file to your knowledge graph."
    },
    {
      question: "How often is Lnkd updated?",
      answer: "We ship meaningful updates every two weeks. Our architecture allows seamless updates without downtime or data migration headaches."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative py-24 px-6 bg-black">
      {/* Ultra-subtle background texture */}
      <div className="absolute inset-0 -z-10 opacity-5 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="mx-auto max-w-3xl">
        {/* Precise Apple-style typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-light tracking-tight text-gray-50 mb-4">
            Lnkd
          </h2>
          <div className="w-12 h-px bg-gray-700 mx-auto mb-6" />
          <p className="text-xl text-gray-400 font-light max-w-xl mx-auto">
            Answers to common questions about the future of knowledge work.
          </p>
        </motion.div>

        {/* Minimalist FAQ items with surgical precision */}
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
          className="space-y-1"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 5 },
                visible: { opacity: 1, y: 0 }
              }}
              className="border-b border-gray-800/70"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-start justify-between text-left py-6 focus:outline-none"
              >
                <span className="text-lg text-gray-100 font-light tracking-wide">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 flex h-6 w-6 items-center justify-center"
                >
                  <FiChevronDown className="h-4 w-4 text-gray-500" />
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
                    <div className="pb-6 text-gray-400 font-light leading-relaxed tracking-normal">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Understated Apple-style footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-6 border-t border-gray-800/50 text-center"
        >
          <p className="text-gray-500 text-sm">
            For additional questions, contact <span className="text-gray-400">support@lnkd.design</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};