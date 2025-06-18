// src/components/panels/SourcePanel.tsx
import React from "react";
import { useSourceContext } from "../../context/sourceContext";
import { Link } from "@tanstack/react-router";
import {MdOutlineLanguage } from "react-icons/md";


const SourcePanel: React.FC = () => {
  const { sources, siteNameCounts } = useSourceContext();

  if (!sources || sources.length === 0) {
    return <div className="p-4 text-gray-500">No sources found.</div>;
  }

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4">Sources</h2>
      <ul className="space-y-2 flex flex-col">
        {sources.map((source: string) => (
          <Link
            key={source}
            to={`/in/sources/${source}`}
            // onClick={() => setSelectedSource(source)}
            className="cursor-pointer flex text-violet-600 hover:underline text-sm p-1"
          >
            <span className="flex items-center gap-2"> <MdOutlineLanguage/>{source
              .length > 20
                ? source.slice(0, 20) + "..."
                : source
            }</span>
            {siteNameCounts[source] !== undefined && (
              <span className="text-sm text-gray-500 ml-2">
               ({siteNameCounts[source]})
              </span>
            )}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SourcePanel;
