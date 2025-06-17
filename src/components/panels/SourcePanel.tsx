// src/components/panels/SourcePanel.tsx
import React from "react";
import { useSourceContext } from "../../context/sourceContext";
import { Link } from "@tanstack/react-router";

const SourcePanel: React.FC = () => {
  const { sources, setSelectedSource } = useSourceContext();

  if (!sources || sources.length === 0) {
    return <div className="p-4 text-gray-500">No sources found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Sources</h2>
      <ul className="space-y-2 flex flex-col">
        {sources.map((source: string) => (
          <Link
            key={source}
            to={`/in/sources/${source}`}
            // onClick={() => setSelectedSource(source)}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            {source}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SourcePanel;
