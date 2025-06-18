import { CallToAction } from "../pages/CallToAction";
import { Features } from "../pages/features";
import { Footer } from "../pages/footer";
import HeroPage from "../pages/hero";

export const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroPage />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  );
};
