export const SourcesView = () => {
    // Sample data for sources
    const sources = [
        {
            id: '1',
            title: 'AI Chat Interfaces',
            description: 'An overview of AI-driven chat interfaces and their applications.',
            type: 'Article',
            date: '2023-10-01',
            icon: true,
        },
        {
            id: '2',
            title: 'Understanding AI Concepts',
            description: 'A beginner\'s guide to understanding AI concepts and terminology.',
            type: 'Blog Post',
            date: '2023-09-15',
            icon: true,
        },
        {
            id: '3',
            title: 'Advanced AI Techniques',
            description: 'Exploring advanced techniques in AI and machine learning.',
            type: 'Research Paper',
            date: '2023-08-20',
            icon: true,
        },
        {            id: '4',
            title: 'AI in Everyday Life',
            description: 'How AI is transforming everyday applications and services.',
            type: 'Video',
            date: '2023-07-10',
            icon: true,
        },
    ]
    return (
      <div className="h-full overflow-y-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Available Context</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map(source => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      </div>
    );
  };
  
  const SourceCard = ({ source }) => {
    return (
      <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50">
        <div className="p-4">
          <div className="flex items-start gap-3">
            {source.icon && (
              <div className="bg-gray-800 p-2 rounded-lg">
                {/* <DocumentIcon className="h-5 w-5 text-gray-400" /> */}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-medium text-white">{source.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{source.description}</p>
              <div className="flex items-center mt-3 text-xs text-gray-500 space-x-3">
                <span>{source.type}</span>
                <span>{source.date}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800/50 px-4 py-3 bg-gray-900/30">
          <button className="text-xs text-blue-400 hover:text-blue-300">
            Use in conversation
          </button>
        </div>
      </div>
    );
  };