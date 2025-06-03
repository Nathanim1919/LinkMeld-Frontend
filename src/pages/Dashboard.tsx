import { useEffect, useState } from "react";
import { getCaptures } from "../api/capture.api";
import type { Capture } from "../types/Capture";

export const Dashboard: React.FC = () => {
    const [captures, setCaptures] = useState<Capture[]>([]);
   useEffect(() => {
    getCaptures().then((captures) => {
      console.log("Fetched captures:", captures);
        setCaptures(captures);
    }).catch((error) => {
      console.error("Error fetching captures:", error);
    });
   }, []); 
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-emerald-600 mb-4">Dashboard</h1>
     <div>
        <h2 className="text-2xl font-semibold mb-2">Recent Captures</h2>
        <ul className="space-y-4 grid grid-cols-4 gap-4">
          {captures.map((capture) => (
            <li key={capture._id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium text-gray-900">{capture.metadata.title}</h3>
              <p className="text-gray-600">{capture.metadata.description}</p>
              <a href={capture.url} className="text-blue-500 hover:underline">
                View Capture
              </a>
            </li>
          ))}
        </ul>
     </div>
    </div>
  );
};
