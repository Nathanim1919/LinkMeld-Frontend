import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Custom Apple-style loading icon (replaces react-icons)
const AppleLoadingIcon = () => (
  <motion.svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    animate={{ rotate: 360 }}
    transition={{
      duration: 1.2,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <motion.circle
      cx="10"
      cy="10"
      r="8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="1, 10"
      strokeDashoffset="0"
      animate={{
        strokeDasharray: ["1, 10", "10, 1", "1, 10"],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.svg>
);

const LnkdFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!feedback.trim()) {
      toast("Please share your thoughts", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "rgba(28, 28, 30, 0.9)",
          border: "1px solid rgba(72, 72, 74, 0.5)",
          color: "white",
          fontSize: "14px",
          padding: "12px 16px",
          borderRadius: "14px",
        },
      });

      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // Success animation
    toast.success("Feedback sent successfully!", {
      position: "top-center",
      duration: 2000,
      style: {
        background: "rgba(28, 28, 30, 0.9)",
        border: "1px solid rgba(10, 132, 255, 0.5)",
        color: "white",
        fontSize: "14px",
        padding: "12px 16px",
        borderRadius: "14px",
      },
    });

    setFeedback("");
    setIsSubmitting(false);
  }, [feedback]);

  return (
    <div className="min-h-screen relative z-1000 bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-10">
        {/* Logo Header with Delightful Motion */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              damping: 15,
              stiffness: 200,
              delay: 0.1,
            },
          }}
          className="text-center"
        >
          <motion.div
            animate={{
              backgroundPositionX: ["0%", "100%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            className="text-5xl font-semibold tracking-tighter bg-clip-text text-transparent bg-[length:200%] bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 mb-1"
          >
            Lnkd
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
            className="text-gray-500 text-sm"
          >
            We're listening. Share your thoughts.
          </motion.p>
        </motion.div>

        {/* Text Input with Apple's Focus Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.2 },
          }}
          className="relative"
        >
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What would make Lnkd better?"
            className={`
              w-full min-h-[180px] p-0
              bg-transparent text-gray-100
              placeholder-gray-600 focus:outline-none
              resize-none text-base leading-relaxed
              tracking-normal font-light
              border-none
            `}
            disabled={isSubmitting}
          />

          <motion.div
            animate={{
              scaleX: isFocused ? 1 : 0.3,
              background: isFocused
                ? "linear-gradient(90deg, transparent, rgba(10, 132, 255, 0.6), transparent)"
                : "linear-gradient(90deg, transparent, rgba(72, 72, 74, 0.3), transparent)",
            }}
            className="absolute bottom-0 left-0 right-0 h-[0.5px]"
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
          />
        </motion.div>

        {/* Submit Button with Apple's Tactile Feel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.4 },
          }}
          className="flex justify-center pt-2"
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{
              backgroundColor: !isSubmitting
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(255, 255, 255, 0.8)",
            }}
            onClick={handleSubmit}
            disabled={!feedback.trim() || isSubmitting}
            className={`
              relative px-7 py-2.5 rounded-full
              text-sm font-medium tracking-wide
              bg-white text-black
              transition-all duration-200
              ${!feedback.trim() ? "opacity-60" : ""}
              overflow-hidden
            `}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <AppleLoadingIcon />
                  <span>Sending...</span>
                </motion.span>
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Submit Feedback
                </motion.span>
              )}
            </AnimatePresence>

            {/* Button Shimmer (Apple's acrylic effect) */}
            {!isSubmitting && (
              <motion.span
                className="absolute inset-0 bg-white/20 opacity-0"
                whileHover={{
                  opacity: 1,
                  x: "100%",
                  transition: { duration: 0.8 },
                }}
              />
            )}
          </motion.button>
        </motion.div>

        {/* Legal Footnote with Micro-Interaction */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.5 },
          }}
          whileHover={{
            color: "rgba(155, 155, 155, 1)",
            transition: { duration: 0.2 },
          }}
          className="block text-[11px] text-gray-500 text-center pt-10 leading-snug underline underline-offset-3"
        >
          Your feedback is anonymized. Privacy Policy
        </motion.a>
      </div>
    </div>
  );
};

export default LnkdFeedback;
