import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useChat } from '../../context/ChatContext';
import { useUI } from '../../context/UIContext';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';
import { LLMRenderer } from '../LLMRenderer';

type NoteSummaryProps = {
  summary: string | null;
  captureId?: string;
};

const parseSummarySections = (markdown: string) => {
  // Extract Suggested Questions section
  const questionsMatch = markdown.match(/# Suggested Questions\n([\s\S]+)/i);
  const questions = questionsMatch
    ? questionsMatch[1]
        .trim()
        .split('\n')
        .filter((q) => q.trim().length > 0 && /^[-*•]/.test(q))
        .map((q) => q.replace(/^[-*•]\s*/, '').trim())
    : [];

  // Remove Suggested Questions section from main content
  const mainContent = questionsMatch
    ? markdown.replace(/# Suggested Questions\n([\s\S]+)/i, '').trim()
    : markdown;

  return {
    mainContent: mainContent || null,
    questions,
  };
};

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export const NoteSummary: React.FC<NoteSummaryProps> = ({ summary, captureId }) => {
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
    : { mainContent: null, questions: [] };


  return (
    <div className="max-w-3xl mx-aut rounded-lg shadow-sm space-y-6">
      {/* Main Content */}
      <AnimatePresence>
        {sections.mainContent && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            className="text-base"
          >
            <LLMRenderer markdown={summary}/>
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
            className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4"
          >
            <motion.h2
              className="text-2xl font-semibold text-gray-900 dark:text-white"
              variants={fadeInVariants}
            >
              Explore Further
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sections.questions.map((question, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleQuestionClick(question)}
                  variants={listItemVariants}
                  className="text-left p-4 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Ask: ${question}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                      {question}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};