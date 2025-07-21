// components/LLMRenderer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import DOMPurify from 'dompurify';

type LLMRendererProps = {
  markdown: string | null;
  className?: string;
};

export const LLMRenderer: React.FC<LLMRendererProps> = ({ markdown, className = '' }) => {
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
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative my-4">
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
        }}
      >
        {DOMPurify.sanitize(markdown)}
      </ReactMarkdown>
    </div>
  );
};
