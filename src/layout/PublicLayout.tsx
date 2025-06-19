import { Outlet } from "@tanstack/react-router";
import { CallToAction } from "../pages/CallToAction";
import { Footer } from "../pages/footer";
import HeroPage from "../pages/hero";
import { Header } from "../pages/header";

export const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <HeroPage />
      <Outlet />
      <CallToAction />
      <Footer />
    </div>
  );
};
