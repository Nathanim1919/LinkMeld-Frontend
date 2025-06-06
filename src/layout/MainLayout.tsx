import EmptyNoteView from "../components/EmptyNoteView";
import NoteView from "../components/NoteView";
import Sidebar from "../components/Sidebar";
import { IoSearch } from "react-icons/io5";
import { useCaptureContext } from "../context/CaptureContext";
import { useUI } from "../context/UIContext";
import { MiddlePanel } from "../components/MiddlePanel";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = () => {
  const { selectedCapture } = useCaptureContext();
  const { collapsed } = useUI();
  return (
    <section
      className={`grid text-white bg-black
      ${
        collapsed
          ? "lg:grid-cols-[_.0fr_.3fr_1fr]"
          : "lg:grid-cols-[_.1fr_.3fr_1fr]"
      }
     h-full w-full overflow-hidden`}
    >
      <Sidebar />
      <div className="bg-[#131413] overflow-hidden h-screen flex flex-col">
        <div className="flex relative rounded-full pl-2 mt-2 self-start   bg-[#1d1f1d] items-center justify-between w-[90%] mx-auto">
          <IoSearch />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full  p-2  text-sm outline-0"
          />
        </div>
        <MiddlePanel />
      </div>
      <div className="bg-[#1d1f1d]">
        {!selectedCapture ? (
          <EmptyNoteView />
        ) : (
          <NoteView capture={selectedCapture} />
        )}
      </div>
    </section>
  );
};
export default MainLayout;
