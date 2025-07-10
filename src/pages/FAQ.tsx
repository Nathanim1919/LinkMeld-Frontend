import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, BrainCircuit, Lock, Cpu, Smartphone, Users, FileStack, RefreshCw } from "lucide-react";

export const FAQ = () => {
  const faqs = [
    {
      icon: <BrainCircuit className="w-5 h-5 text-blue-400" />,
      question: "How does Deepen differ from traditional knowledge tools?",
      answer: "Deepen creates neural connections between ideas rather than forcing rigid hierarchies. Our AI surfaces relevant insights contextually, with end-to-end encrypted sync across all devices."
    },
    {
      icon: <Lock className="w-5 h-5 text-blue-400" />,
      question: "What makes your privacy approach special?",
      answer: "Zero-knowledge architecture means your data is encrypted before leaving your device. We never store decryption keys—not even we can access your content."
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      question: "How does the AI work privately?",
      answer: "On-device processing when possible. For cloud tasks, we use homomorphic encryption to compute on encrypted data without decryption."
    },
    {
      icon: <Smartphone className="w-5 h-5 text-blue-400" />,
      question: "Is offline use supported?",
      answer: "Fully functional offline. Changes sync automatically when reconnected using CRDTs for seamless merging."
    },
    {
      icon: <Users className="w-5 h-5 text-blue-400" />,
      question: "How does team collaboration work?",
      answer: "Granular permissions, live presence, and version history with intelligent merging—all over encrypted channels."
    },
    {
      icon: <FileStack className="w-5 h-5 text-blue-400" />,
      question: "What file types are supported?",
      answer: "200+ formats with rich previews: documents, code, media, 3D models—all connectable to your knowledge graph."
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-blue-400" />,
      question: "Update frequency?",
      answer: "Meaningful updates every two weeks. Our architecture enables seamless upgrades without migrations."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative py-24 px-6 bg-[#050505] overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-900/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-900/5 blur-3xl" />
      </div>
      
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header with precision typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0, 0.67, 0] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400 mb-4">
            Understanding Deepen
          </h2>
          <motion.div 
            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <p className="text-xl text-gray-400 font-light max-w-xl mx-auto">
            Clear answers about your cognitive workspace
          </p>
        </motion.div>

        {/* Interactive FAQ with physics-based animations */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="space-y-2"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 300,
                    damping: 15
                  }
                }
              }}
              className="overflow-hidden rounded-xl bg-[#0f0f0f] border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
              >
                <div className="flex items-start gap-4">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    {faq.icon}
                  </div>
                  <span className="text-lg font-medium text-gray-100 tracking-tight">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="ml-4 flex h-6 w-6 items-center justify-center"
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
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
                        opacity: { duration: 0.2 },
                        height: { 
                          type: "spring", 
                          stiffness: 200,
                          damping: 15
                        }
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: { 
                        opacity: { duration: 0.15 },
                        height: { duration: 0.2 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 -mt-2 text-gray-400 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Minimalist footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 pt-8 border-t border-gray-800/50 text-center"
        >
          <p className="text-gray-500 text-sm tracking-wider">
            Need more clarity? <span className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">Contact our team</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};