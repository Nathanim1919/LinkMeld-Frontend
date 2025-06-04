import EmptyNoteView from "../components/EmptyNoteView";
import NotesList from "../components/NotesList";
import Sidebar from "../components/Sidebar";
import { IoSearch } from "react-icons/io5";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <section className="grid text-white bg-gray-500 lg:grid-cols-[_.2fr_.35fr_1fr] h-full w-full overflow-hidden">
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
        <EmptyNoteView />
      </div>
    </section>
  );
};
export default MainLayout;
