import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export const FAQ = () => {
  const faqs = [
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle.",
    },
    {
      question: "Do you offer discounts for students?",
      answer:
        "We offer a 50% discount for verified students. Contact our support team with your academic email for verification.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for enterprise plans.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "The Starter plan is completely free. For Pro features, we offer a 14-day free trial with no credit card required.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel anytime from your account settings. Cancellations take effect at the end of your billing period with no additional charges.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative isolate py-20 sm:py-28 bg-gray-950 overflow-hidden">
      {/* Advanced gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] sm:w-[80%] aspect-square bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Floating grid pattern */}
      <div className="absolute inset-0 -z-20 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
        <div className="absolute inset-0 [background:linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [background-position:calc(50%-1.75rem)_calc(50%-1.75rem)]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Animated header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-purple-300">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about our product and services.
          </p>
        </motion.div>

        {/* FAQ Items with staggered animation */}
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
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="group"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-start justify-between text-left p-6 hover:bg-gray-900/50 transition-all duration-300 rounded-xl border border-gray-800 hover:border-violet-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              >
                <span className="text-lg font-medium text-gray-100 group-hover:text-violet-300 transition-colors duration-200">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 group-hover:bg-violet-500/10 transition-colors duration-200"
                >
                  <FiChevronDown className="h-5 w-5 text-violet-400 group-hover:text-violet-300 transition-colors duration-200" />
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
                        height: { duration: 0.3, ease: "easeInOut" }
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: { 
                        opacity: { duration: 0.15 },
                        height: { duration: 0.25, ease: "easeInOut" }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-300 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6 text-lg">
            Still have questions? We're happy to help.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden px-8 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-violet-500/30"
          >
            <span className="relative z-10">Contact Support</span>
            <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};