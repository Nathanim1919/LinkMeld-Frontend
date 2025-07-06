import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { FeedbackService } from "../api/feedback.api";


const AppleActivityIndicator = ({ size = 20 }: { size?: number }) => (
  <motion.svg
    width={size}
    height={size}
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

// Toast configuration for consistent styling
const showToast = {
  info: (message: string) =>
    toast(message, {
      position: "top-center",
      duration: 2500,
      style: {
        background: "rgba(28, 28, 30, 0.92)",
        border: "1px solid rgba(72, 72, 74, 0.6)",
        color: "white",
        fontSize: "14px",
        padding: "12px 20px",
        borderRadius: "12px",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      },
    }),
  success: (message: string) =>
    toast.success(message, {
      position: "top-center",
      duration: 2500,
      style: {
        background: "rgba(28, 28, 30, 0.92)",
        border: "1px solid rgba(48, 209, 88, 0.5)",
        color: "white",
        fontSize: "14px",
        padding: "12px 20px",
        borderRadius: "12px",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      },
    }),
  error: (message: string) =>
    toast.error(message, {
      position: "top-center",
      duration: 2500,
      style: {
        background: "rgba(28, 28, 30, 0.92)",
        border: "1px solid rgba(255, 59, 48, 0.5)",
        color: "white",
        fontSize: "14px",
        padding: "12px 20px",
        borderRadius: "12px",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      },
    }),
};

const LnkdFeedback = () => {
  const [formData, setFormData] = useState({
    feedback: "",
    name: "",
    profession: "",
  });
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(async () => {
    if (!formData.feedback.trim()) {
      showToast.info("Please share your feedback before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      await FeedbackService.submit({
        feedback: formData.feedback,
        ...(formData.name && { name: formData.name }),
        ...(formData.profession && { profession: formData.profession }),
      });

      showToast.success("Thank you for your feedback!");
      setFormData({ feedback: "", name: "", profession: "" });
      setShowOptionalFields(false);
    } catch (error) {
      console.error("Feedback submission error:", error);
      showToast.error("Couldn't send feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const toggleOptionalFields = () => {
    setShowOptionalFields(!showOptionalFields);
  };

  return (
    <div className="min-h-screen relative z-1000 bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Header with Apple-style gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="text-center"
        >
          <motion.h1
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
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            className="text-gray-500 text-sm"
          >
            Help us improve your experience
          </motion.p>
        </motion.div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          className="space-y-5"
        >
          {/* Feedback Textarea */}
          <div className="relative">
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What can we improve?"
              className={`
                w-full min-h-[150px] p-0
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
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />
          </div>

          {/* Optional Fields Toggle */}
          <motion.button
            type="button"
            onClick={toggleOptionalFields}
            whileTap={{ scale: 0.98 }}
            className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
          >
            {showOptionalFields
              ? "Hide optional fields"
              : "+ Add name & profession (optional)"}
          </motion.button>

          {/* Optional Fields */}
          <AnimatePresence>
            {showOptionalFields && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="relative">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name (optional)"
                    className={`
                      w-full bg-transparent text-gray-100
                      placeholder-gray-600 focus:outline-none
                      text-base leading-relaxed
                      border-b border-gray-700 pb-1
                    `}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="relative">
                  <input
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Your profession (optional)"
                    className={`
                      w-full bg-transparent text-gray-100
                      placeholder-gray-600 focus:outline-none
                      text-base leading-relaxed
                      border-b border-gray-700 pb-1
                    `}
                    disabled={isSubmitting}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          className="flex justify-center pt-4"
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            whileHover={{
              backgroundColor: !isSubmitting
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(255, 255, 255, 0.8)",
            }}
            onClick={handleSubmit}
            disabled={!formData.feedback.trim() || isSubmitting}
            className={`
              relative px-7 py-2.5 rounded-full
              text-sm font-medium tracking-wide
              bg-white text-black
              transition-all duration-200
              ${!formData.feedback.trim() ? "opacity-60" : ""}
              overflow-hidden
              flex items-center justify-center
              min-w-[180px]
            `}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <AppleActivityIndicator size={16} />
                  Sending...
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
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          className="pt-8 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ color: "rgba(155, 155, 155, 1)" }}
            className="text-[11px] text-gray-500 underline underline-offset-3"
          >
            Your feedback is anonymized. Privacy Policy
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default LnkdFeedback;
