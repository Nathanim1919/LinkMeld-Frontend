import React from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "../../context/ChatContext";
import { useUI } from "../../context/UIContext";
import { motion, AnimatePresence } from "framer-motion";

type NoteSummaryProps = {
  summary: string | null;
  captureId?: string;
};

const parseSummarySections = (markdown: string) => {
  const contextMatch = markdown.match(/# Context\n([\s\S]+?)(?=\n# Overview)/i);
  const overviewMatch = markdown.match(
    /# Overview\n([\s\S]+?)(?=\n# Takeaways)/i
  );
  const takeawaysMatch = markdown.match(
    /# Takeaways\n([\s\S]+?)(?=\n# Suggested Questions|\n$)/i
  );
  const questionsMatch = markdown.match(/# Suggested Questions\n([\s\S]+)/i);

  return {
    context: contextMatch?.[1]?.trim() || null,
    overview: overviewMatch?.[1]?.trim() || null,
    takeaways:
      takeawaysMatch?.[1]
        ?.trim()
        ?.split("\n")
        .filter((line) => line.trim()) || [],
    questions:
      questionsMatch?.[1]
        ?.trim()
        ?.split("\n")
        ?.filter((q) => q.trim().length > 0 && /^[-*•]/.test(q))
        ?.map((q) => q.replace(/^[-*•]\s*/, "").trim()) || [],
  };
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export const NoteSummary: React.FC<NoteSummaryProps> = ({
  summary,
  captureId,
}) => {
  const { addMessage, setUserMessage } = useChat();
  const { setOpenAiChat } = useUI();

  const handleQuestionClick = (question: string) => {
    setOpenAiChat?.(true);
    if (!captureId) return;
    setUserMessage(question);
    addMessage(captureId);
  };

  const sections = summary
    ? parseSummarySections(summary)
    : {
        context: null,
        overview: null,
        takeaways: [],
        questions: [],
      };

  return (
    <div className="space-y-6">
      {/* Context */}
      <AnimatePresence>
        {sections.context && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="text-gray-400 text-sm italic px-1"
          >
            <ReactMarkdown>{sections.context}</ReactMarkdown>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overview */}
      <AnimatePresence>
        {sections.overview && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="space-y-3"
          >
            <motion.h2
              className="text-white font-semibold text-lg tracking-tight"
              variants={fadeInVariants}
            >
              Overview
            </motion.h2>
            <motion.div
              className="text-gray-300 leading-relaxed"
              variants={fadeInVariants}
            >
              <ReactMarkdown>{sections.overview}</ReactMarkdown>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Takeaways */}
      <AnimatePresence>
        {sections.takeaways.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-3"
          >
            <motion.h2
              className="text-white font-semibold text-lg tracking-tight"
              variants={fadeInVariants}
            >
              Key Insights
            </motion.h2>
            <motion.ul className="space-y-2 pl-1">
              {sections.takeaways.map((takeaway, i) => (
                <motion.li
                  key={i}
                  variants={listItemVariants}
                  className="flex items-start gap-2 text-gray-300"
                >
                  <span className="text-gray-500 mt-1.5">•</span>
                  <ReactMarkdown>
                    {takeaway.replace(/^[-*•]\s*/, "")}
                  </ReactMarkdown>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested Questions */}
      <AnimatePresence>
        {sections.questions.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="border-t border-gray-800 pt-5 space-y-3"
          >
            <motion.h2
              className="text-white font-semibold text-lg tracking-tight"
              variants={fadeInVariants}
            >
              Explore Further
            </motion.h2>
            <motion.div className="flex flex-wrap gap-2">
              {sections.questions.map((question, i) => (
                <motion.button
                  key={i}
                  variants={listItemVariants}
                  onClick={() => handleQuestionClick?.(question)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-sm bg-violet-700/10 hover:bg-violet-700/20 cursor-pointer border border-violet-600/20 text-violet-400 px-3 py-1.5 rounded-lg transition-all duration-150"
                >
                  {question}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
