import { useFolderContext } from "../../context/FolderContext";
import { FaFolderOpen } from "react-icons/fa";
import { useUI } from "../../context/UIContext";
import { useCaptureContext } from "../../context/CaptureContext";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useState } from "react";

export const FolderList: React.FC = () => {
  const { folders, loadingStates, addCaptureToFolder } = useFolderContext();
  const { isFolderListOpen, setIsFolderListOpen } = useUI();
  const { selectedCapture } = useCaptureContext();
  const [appendToFolderId, setAppendToFolderId] = useState<string | null>(null);

  if (!isFolderListOpen) return null;

  const setCaptureFolder = async (folderId: string) => {
    if (!selectedCapture) return;
    try {
      await addCaptureToFolder(folderId, selectedCapture._id);
      setIsFolderListOpen?.(false);
    } catch (error) {
      console.error("Error adding capture to folder:", error);
    }
  };

  return (
    <div className="flex absolute top-[8%] border border-[#2f2b2b] overflow-hidden border-b-0 z-999 rounded-lg right-[10%] flex-col items-center justify-center bg-[#201f1f] shadow-lg ">
      {loadingStates.fetch ? (
        <p className="text-gray-600">Loading...</p>
      ) : folders.length === 0 ? (
        <p className="text-gray-600">No folders available.</p>
      ) : (
        <div className="flex flex-col">
        
          {folders.map((folder) => (
            <div
              key={folder._id}
              onClick={() => {
                setAppendToFolderId(folder._id);
                setCaptureFolder(folder._id);
              }}
              data-testid="folder-item"
              className="folder-item hover:bg-white/10 border-b px-2 py-1 border-white/10 cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                {loadingStates.append && appendToFolderId === folder._id ? (
                  <CgSpinnerTwoAlt className="text-gray-500 w-4 h-4 animate-spin" />
                ) : (
                  // Use folder icon if available, otherwise use default folder icon
                  <FaFolderOpen className="text-gray-500 w-4 h-4" />
                )}
                <h3 className="text-[13px] capitalize">
                  {folder.name.length > 15
                    ? folder.name.slice(0, 15) + "..."
                    : folder.name}
                </h3>
              </div>
              <p>{folder.captures.length}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
