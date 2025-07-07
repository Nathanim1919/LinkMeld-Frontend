import React from "react";

export const NoteSummarySkeleton: React.FC = () => {
    return (
      <div className="space-y-8 mt-8 overflow-hidden">
        {/* Context Skeleton - Simulates AI analyzing content */}
        <div className="space-y-3 relative">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500/20 animate-pulse"></div>
            <div className="h-4 w-1/4 rounded-full bg-gradient-to-r from-gray-200/10 via-gray-200/20 to-gray-200/10 animate-gradient"></div>
          </div>
          <div className="h-3 w-3/4 rounded-full bg-gray-200/5 ml-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/10 to-transparent animate-shine w-1/2"></div>
          </div>
        </div>
  
        {/* Overview Skeleton - Simulates AI writing */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-md bg-blue-500/20 animate-pulse"></div>
            <div className="h-6 w-1/3 rounded-full bg-gradient-to-r from-gray-200/15 via-gray-200/30 to-gray-200/15 animate-gradient"></div>
          </div>
          <div className="space-y-2 pl-6">
            {[90, 80, 70].map((width, i) => (
              <div key={i} className="relative h-4 rounded-full bg-gray-200/10 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/15 to-transparent animate-shine"
                  style={{
                    width: `${width}%`,
                    animationDelay: `${i * 0.15}s`
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Key Insights - Simulates AI generating bullet points */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-md bg-blue-500/20 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-6 w-1/4 rounded-full bg-gradient-to-r from-gray-200/15 via-gray-200/30 to-gray-200/15 animate-gradient" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <ul className="space-y-3 pl-6">
            {[...Array(3)].map((_, i) => (
              <li key={i} className="flex gap-3 group">
                <div className="relative mt-1.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500/40 animate-pulse" style={{ animationDelay: `${0.3 + i * 0.1}s` }}></div>
                  <div className="absolute inset-0 h-2 w-2 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="relative h-4 rounded-full bg-gray-200/10 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/15 to-transparent animate-shine"
                      style={{
                        width: `${90 - i * 15}%`,
                        animationDelay: `${0.35 + i * 0.1}s`
                      }}
                    ></div>
                  </div>
                  {i % 2 === 0 && (
                    <div className="relative h-3 rounded-full bg-gray-200/5 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/10 to-transparent animate-shine"
                        style={{
                          width: `${70 - i * 10}%`,
                          animationDelay: `${0.4 + i * 0.1}s`
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Explore Further - Simulates AI generating questions */}
        <div className="space-y-4 pt-6 border-t border-gray-800/10">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-md bg-blue-500/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="h-6 w-1/3 rounded-full bg-gradient-to-r from-gray-200/15 via-gray-200/30 to-gray-200/15 animate-gradient" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="flex flex-wrap gap-3 pl-6">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className="relative h-8 rounded-lg bg-gray-200/5 overflow-hidden"
                style={{ width: `${Math.random() * 40 + 30}%` }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/10 to-transparent animate-shine"
                  style={{
                    animationDelay: `${0.55 + i * 0.1}s`
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
  
        {/* AI Processing Indicator */}
        <div className="pt-6 flex items-center justify-end gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span>Processing insights</span>
          </div>
        </div>
      </div>
    );
  };
  
  // Add to your global CSS:
