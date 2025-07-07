export const NoteSummarySkeleton: React.FC = () => {
  return (
    <div className={`space-y-6`}>
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
};
