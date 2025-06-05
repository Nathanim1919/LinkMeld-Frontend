import EmptyNoteView from "../components/EmptyNoteView";
import NotesList from "../components/NotesList";
import NoteView from "../components/NoteView";
import Sidebar from "../components/Sidebar";
import { IoSearch } from "react-icons/io5";
import { useCaptureContext } from "../context/CaptureContext";
import { useUI } from "../context/UIContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = () => {
  const { selectedCapture } = useCaptureContext();
  const {collapsed} = useUI();
  return (
    <section className={`grid text-white bg-black
      ${collapsed ? "lg:grid-cols-[_.0fr_.3fr_1fr]" : "lg:grid-cols-[_.1fr_.4fr_1fr]"}
     h-full w-full overflow-hidden`}>
      <Sidebar />
      <div className="bg-[#131413] overflow-hidden h-screen grid gap-2">
        <div className="flex relative rounded-full pl-2 mt-2  bg-[#1d1f1d] items-center justify-between w-[90%] mx-auto">
          <IoSearch />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full  p-2  text-sm outline-0"
          />
        </div>
        <NotesList />
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
