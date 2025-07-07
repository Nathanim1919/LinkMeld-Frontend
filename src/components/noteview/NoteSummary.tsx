import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "../../context/ChatContext";
import { useUI } from "../../context/UIContext";

type NoteSummaryProps = {
  summary: string | null;
  captureId?: string;
  onGenerateSummary?: (captureId: string) => Promise<void>;
  loading?: boolean;
  error?: Error | null;
  className?: string;
};

const parseSummarySections = (markdown: string) => {
  const contextMatch = markdown.match(/# Context\n([\s\S]+?)(?=\n# Overview)/i);
  const overviewMatch = markdown.match(/# Overview\n([\s\S]+?)(?=\n# Takeaways)/i);
  const takeawaysMatch = markdown.match(/# Takeaways\n([\s\S]+?)(?=\n# Suggested Questions|\n$)/i);
  const questionsMatch = markdown.match(/# Suggested Questions\n([\s\S]+)/i);

  return {
    context: contextMatch?.[1]?.trim() || null,
    overview: overviewMatch?.[1]?.trim() || null,
    takeaways: takeawaysMatch?.[1]?.trim()?.split('\n').filter(line => line.trim()) || [],
    questions: questionsMatch?.[1]?.trim()?.split('\n')
      ?.filter(q => q.trim().length > 0 && /^[-*•]/.test(q))
      ?.map(q => q.replace(/^[-*•]\s*/, '').trim()) || []
  };
};

export const NoteSummary: React.FC<NoteSummaryProps> = ({
  summary,
  captureId,
  onGenerateSummary,
  loading: parentLoading = false,
  error: parentError = null,
  className = "",
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<Error | null>(null);
  const {addMessage, setUserMessage} = useChat()
  const {setOpenAiChat} = useUI()


  const handleQuestionClick = (question: string) => {
    setOpenAiChat?.(true);
    if (!captureId) return;
    setUserMessage(question);
    addMessage(captureId);
  };

  const handleGenerateSummary = async () => {
    if (!captureId || !onGenerateSummary) return;
    try {
      setLocalLoading(true);
      setLocalError(null);
      await onGenerateSummary(captureId);
    } catch (err) {
      setLocalError(err as Error);
    } finally {
      setLocalLoading(false);
    }
  };

  const sections = summary ? parseSummarySections(summary) : {
    context: null,
    overview: null,
    takeaways: [],
    questions: []
  };

  const isLoading = parentLoading || localLoading;
  const error = parentError || localError;

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="space-y-4">
          {/* Context Loader */}
          <div className="h-5 w-1/4 bg-gray-800 rounded-full animate-pulse"></div>

          {/* Overview Loader */}
          <div className="space-y-3">
            <div className="h-6 w-1/3 bg-gray-800 rounded-full"></div>
            <div className="h-4 w-full bg-gray-800 rounded-full"></div>
            <div className="h-4 w-5/6 bg-gray-800 rounded-full"></div>
          </div>

          {/* Takeaways Loader */}
          <div className="space-y-3 pt-2">
            <div className="h-5 w-1/3 bg-gray-800 rounded-full"></div>
            <div className="space-y-2 pl-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-700"></div>
                  <div
                    className="h-3 flex-1 bg-gray-800 rounded-full"
                    style={{ width: `${80 - i * 10}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
          <p className="text-red-300 font-medium">Summary Error</p>
          <p className="text-red-400/90 text-sm mt-1">{error.message}</p>
          {captureId && onGenerateSummary && (
            <button
              onClick={handleGenerateSummary}
              className="mt-2 text-sm bg-red-800/30 hover:bg-red-800/40 text-red-200 px-3 py-1 rounded-md"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {/* Context */}
      {sections.context && (
        <div className="text-gray-400 text-sm italic px-1">
          <ReactMarkdown>{sections.context}</ReactMarkdown>
        </div>
      )}

      {/* Overview */}
      {sections.overview && (
        <div className="space-y-3">
          <h2 className="text-white font-semibold text-lg tracking-tight">Overview</h2>
          <div className="text-gray-300 leading-relaxed">
            <ReactMarkdown>{sections.overview}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Takeaways */}
      {sections.takeaways.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-white font-semibold text-lg tracking-tight">Key Insights</h2>
          <ul className="space-y-2 pl-1">
            {sections.takeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300">
                <span className="text-gray-500 mt-1.5">•</span>
                <ReactMarkdown>{takeaway.replace(/^[-*•]\s*/, '')}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Questions */}
      {sections.questions.length > 0 && (
        <div className="border-t border-gray-800 pt-5 space-y-3">
          <h2 className="text-white font-semibold text-lg tracking-tight">Explore Further</h2>
          <div className="flex flex-wrap gap-2">
            {sections.questions.map((question, i) => (
              <button
                key={i}
                onClick={() => handleQuestionClick?.(question)}
                className="text-sm bg-violet-700/10 hover:underline cursor-pointer border border-violet-600/20 text-violet-600 px-2 py-1 rounded-lg transition-colors duration-150"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {/* {!summary && !error && (
        <div className="text-center py-12 text-gray-500 space-y-4">
          <p>No summary available</p>
          {captureId && onGenerateSummary ? (
            <button
              onClick={handleGenerateSummary}
              disabled={isLoading}
              className={`text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              {isLoading ? 'Generating...' : 'Generate Summary'}
            </button>
          ) : (
            <p className="text-sm">Content will appear here</p>
          )}
        </div>
      )} */}

      {/* Regenerate Button (when summary exists) */}
      {summary && captureId && onGenerateSummary && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerateSummary}
            disabled={isLoading}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
          >
            {isLoading ? 'Regenerating...' : 'Regenerate'}
          </button>
        </div>
      )}
    </div>
  );
};