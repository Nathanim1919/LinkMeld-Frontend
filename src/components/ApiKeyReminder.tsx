// ApiKeyReminder.tsx
import React from 'react';

interface ApiKeyReminderProps {
  onAddKey: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

export const ApiKeyReminder: React.FC<ApiKeyReminderProps> = ({
  onAddKey,
  title = "Enhanced AI Experience Available",
  description = "Add your API key to unlock full functionality",
  buttonText = "Add API Key",
  className = "",
}) => {
  return (
    <div className={`w-full bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-b border-gray-700 ${className}`}>
      <div className="text-center md:text-left">
        <h2 className="text-gray-100 font-medium text-sm md:text-base">
          {title}
        </h2>
        <p className="text-gray-400 text-xs mt-1">
          {description}
        </p>
      </div>
      <button
        className="bg-gradient-to-r from-violet-600 to-violet-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:from-violet-500 hover:to-violet-400 transition-all duration-200 shadow-sm hover:shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50"
        onClick={onAddKey}
      >
        {buttonText}
      </button>
    </div>
  );
};