import { useFolderContext } from "../../context/FolderContext";
import { FaFolderOpen } from "react-icons/fa";

export const FolderList = () => {
  const { folders, loading } = useFolderContext();
  return (
    <div className="flex absolute top-[8%] border border-white/20 z-999 p-2 rounded-lg right-[15%] flex-col items-center justify-center bg-black shadow-lg ">
      <h1 className="text-2xl font-bold mb-4">Folders</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : folders.length === 0 ? (
        <p className="text-gray-600">No folders available.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {folders.map((folder) => (
            <div
              key={folder._id}
              className="folder-item border-b border-white/10 cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <FaFolderOpen className="text-gray-500 w-4 h-4" />
                <h3 className="text-[13px] capitalize">{folder.name}</h3>
              </div>
              <p>{folder.captures.length}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
