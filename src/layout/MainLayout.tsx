import EmptyNoteView from "../components/EmptyNoteView";
import NotesList from "../components/NotesList";
import Sidebar from "../components/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <section className="grid text-white bg-gray-500 lg:grid-cols-[_.2fr_.4fr_1fr] h-full w-full">
      <Sidebar />
      <div className="bg-[#131413] p-4">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full p-3 rounded-xl border border-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
