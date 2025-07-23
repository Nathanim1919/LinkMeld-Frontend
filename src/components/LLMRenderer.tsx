import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import DOMPurify from 'dompurify';

type LLMRendererProps = {
  markdown: string | null;
  className?: string;
  onQuestionClick?: (question: string) => void; // Callback for follow-up questions
};

export const LLMRenderer: React.FC<LLMRendererProps> = ({ markdown, className = '', onQuestionClick }) => {
  // Preprocess markdown to remove unintended code block wrappers
  const preprocessMarkdown = (input: string | null): string => {
    if (!input) return '';
    // Remove ```markdown or ``` wrapping if present
    const cleaned = input.replace(/^```(markdown)?\n([\s\S]*?)\n```$/g, '$2').trim();
    return DOMPurify.sanitize(cleaned);
  };

  // Extract follow-up questions from markdown
  const extractFollowUpQuestions = (input: string): string[] => {
    const followUpSection = input.match(/## Follow-Up Questions\n\n([\s\S]*?)(?=\n## |\n$)/);
    if (!followUpSection) return [];
    // Extract list items starting with '*'
    const questions = followUpSection[1]
      .split('\n')
      .filter(line => line.trim().startsWith('*'))
      .map(line => line.replace(/^\*\s*/, '').trim());
    return questions;
  };

  const sanitizedMarkdown = preprocessMarkdown(markdown);
  const followUpQuestions = extractFollowUpQuestions(sanitizedMarkdown);

  // Remove Follow-Up Questions section from markdown to avoid duplication
  const markdownWithoutQuestions = sanitizedMarkdown.replace(/## Follow-Up Questions\n\n([\s\S]*?)(?=\n## |\n$)/, '');

  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>
          ),
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
          ),
          code(props) {
            const { className, children } = props;
            const match = /language-(\w+)/.exec(className || '');
            const isInline = (props as any).inline;
            return !isInline && match ? (
              <div className="relative">
                <button
                  className="absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  onClick={() => navigator.clipboard.writeText(String(children))}
                  aria-label="Copy code"
                >
                  Copy
                </button>
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-md"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-700">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              {children}
            </td>
          ),
        }}
      >
        {markdownWithoutQuestions}
      </ReactMarkdown>

      {followUpQuestions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            Explore More
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {followUpQuestions.map((question, index) => (
              <button
                key={index}
                className="group relative text-sm cursor-pointer flex items-center px-5 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                onClick={() => onQuestionClick?.(question)}
                aria-label={`Explore ${question}`}
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <span className="text-gray-800 dark:text-gray-200 font-medium text-left leading-tight">
                  {question}
                </span>
                <svg
                  className="ml-auto h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};