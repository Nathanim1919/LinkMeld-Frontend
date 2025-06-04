import { useEffect, useState } from "react";
import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { getCaptures } from "../api/capture.api";
import type { Capture } from "../types/Capture";


const NotesList = () => {
      const [captures, setCaptures] = useState<Capture[]>([]);
      useEffect(() => {
        getCaptures()
          .then((captures) => {
            console.log("Fetched captures:", captures);
            setCaptures(captures);
          })
          .catch((error) => {
            console.error("Error fetching captures:", error);
          });
      }, []);
  return (
    <div className="space-y-6">
      {/* Notes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-5">
        {captures.map((note) => (
          <div
            key={note._id}
            className="rounded-xl shadow-md p-4 hover:shadow-lg transition-all hover:bg-red-500"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-white">{note.metadata.title}</h3>
              <FiMoreVertical className="text-gray-500" />
            </div>
            <p className="text-sm text-gray-300 mt-2 line-clamp-3">{note.metadata.author}</p>

            <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
              <span>{note.timestamp}</span>
              {/* <div className="flex gap-2 items-center">
                {note.metadata.keywords?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 px-2 py-1 rounded-full text-[10px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
