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

  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-24 max-w-3xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-center mb-8 text-white">
        Frequently asked questions
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-800">
            <button
              onClick={() => toggleQuestion(index)}
              className="flex justify-between items-center w-full text-left py-6 font-medium text-gray-200 hover:text-purple-400 transition-colors"
            >
              <span>{faq.question}</span>
              <motion.div
                animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="h-5 w-5 text-gray-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeQuestion === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 text-gray-400">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
