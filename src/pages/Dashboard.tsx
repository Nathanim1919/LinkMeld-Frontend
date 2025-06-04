import { useEffect, useState } from "react";
import { getCaptures } from "../api/capture.api";
import type { Capture } from "../types/Capture";

export const Dashboard: React.FC = () => {
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

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }

  function getSiteNameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch (error) {
      console.error("Invalid URL:", url, error);
      return "Unknown Site";
    }
  }
  return (
    <div className="p-4 text-black">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Recent Captures</h2>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {captures.map((capture) => (
            <div
              key={capture._id}
              className="p-2 relative border h-full grid place-items-center w-full border-gray-400 bg-white rounded-lg shadow"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-bold text-gray-900">
                  {capture.metadata.title.slice(0, 50)}...
                </h3>
                <p className="text-gray-600">
                  {capture.metadata.description?.slice(0, 80)}...
                </p>
                <div className="self-end flex flex-col">
                  <span className="text-gray-500 text-sm m-0">
                    {capture.timestamp ? formatTimeAgo(capture.timestamp) : "Unknown"}
                  </span>
                <span className="text-gray-400 text-sm m-0">
                  {formatDate(capture.timestamp)}
                </span>
                </div>
              </div>
              <div className="flex flex-col mt-4 w-full">
                <div className="flex items-center m-0">
                  <img
                    src={capture.metadata.favicon}
                    alt="Favicon"
                    className="w-6 h-6 inline-block mr-2"
                  />
                  <h3 className="text-black m-0">
                    {getSiteNameFromUrl(capture.metadata.url)}
                  </h3>
                </div>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={capture.metadata.url}
                  className="text-blue-500 hover:underline"
                >
                  {capture.metadata.url.slice(0, 30)}...
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
