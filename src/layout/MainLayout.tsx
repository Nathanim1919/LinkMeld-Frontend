import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <section className="flex flex-col h-screen  bg-black text-white overflow-hidden">
      <Header />
      <main className="grid lg:grid-cols-[_.1fr_1fr] h-full">
        <Sidebar />
        {children}
      </main>
    </section>
  );
};
export default MainLayout;
