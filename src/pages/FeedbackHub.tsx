import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LnkdFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFeedback("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Header with Lnkd Logo */}
      <header className="pt-16 pb-12 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Lnkd
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-medium tracking-tight mb-3"
        >
          Help us improve Lnkd.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto"
        >
          Share your thoughts, ideas, or issues. We read every submission.
        </motion.p>
      </header>

      {/* Main Feedback Area */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 px-6 max-w-3xl mx-auto w-full"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What’s on your mind? Suggestions, bugs, or general feedback..."
              className={`
                w-full min-h-[200px] p-6 rounded-xl
                bg-gray-900/50 backdrop-blur-md
                border border-gray-800/50 focus:border-blue-500/30
                text-gray-100 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500/20
                resize-none
                transition-all
              `}
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-500">
              {feedback.length}/500
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!feedback.trim() || isSubmitting}
              className={`
                px-6 py-3 rounded-full font-medium
                bg-gradient-to-r from-blue-600 to-purple-600
                hover:from-blue-500 hover:to-purple-500
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all
                ${isSubmitting ? "opacity-80" : ""}
              `}
            >
              {isSubmitting ? "Sending..." : "Send Feedback"}
            </motion.button>
          </div>
        </form>
      </motion.main>

      {/* Submission Confirmation */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800/90 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700/50 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-green-400"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Thank you for your feedback!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-900 mt-12">
        <p>All feedback is anonymized. <a href="#" className="underline hover:text-gray-300">Privacy Policy</a></p>
      </footer>
    </div>
  );
};

export default LnkdFeedback;