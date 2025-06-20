import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorOpacity = useMotionValue(0);

  // Cyberpunk color scheme
  const colors = {
    primary: "#00f0ff",
    secondary: "#ff00f0",
    bg: "rgba(10, 5, 30, 0.95)",
    text: "#e0e0ff",
    accent: "#00ffa3",
  };

  // Track mouse for cursor effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 15);
      cursorY.set(e.clientY - 15);
      cursorOpacity.set(1);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Custom cursor rotation
  const rotateX = useTransform(cursorY, [0, window.innerHeight], [15, -15]);
  const rotateY = useTransform(cursorX, [0, window.innerWidth], [-15, 15]);

  return (
    <>
      {/* Cyberpunk Cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursorOpacity,
          rotateX,
          rotateY,
          background: `radial-gradient(circle, ${colors.primary}, transparent 70%)`,
        }}
        transition={{ type: "spring", damping: 20 }}
      />

      {/* Main Header */}
      <header
        className={` w-full z-40 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-[rgba(12,12,12,0.98)] border-b border-[rgba(255,0,240,0.1)]"
            : "backdrop-blur-lg bg-[#05030f]"
        }`}
      >
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex items-center justify-around h-24">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/" className="text-2xl font-extrabold tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  lnkd
                </span>
                <span className="text-gray-300">.</span>
              </Link>
            </motion.div>

            {/* Cyber Navigation */}
            <nav className="hidden md:flex items-center gap-12">
              {["HOME", "FEATURES", "PRICING", "FAQs"].map((item, index) => (
                <motion.div
                  key={item}
                  onHoverStart={() => setHovered(item)}
                  onHoverEnd={() => setHovered(null)}
                  className="relative"
                >
                  <Link
                    to={index !== 0 ? `/${item.toLowerCase()}` : "/"}
                    className="text-sm font-bold [&.active]:border-b-2 border-blue-400 tracking-widest uppercase text-gray-300 hover:text-white transition-all duration-300"
                  >
                    {item}
                  </Link>

                  {/* Hover effect */}
                  {hovered === item && (
                    <>
                      <motion.div
                        className="absolute -inset-2 rounded-md bg-[rgba(0,240,255,0.1)] -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Cyber CTA */}
            <motion.div className="hidden md:block relative">
              <Link
                to="/login"
                className="inline-block px-6 py-3 text-sm font-bold tracking-widest uppercase text-white hover:text-violet-500 rounded-full"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className="relative z-10 px-8 py-3 text-sm font-bold tracking-widest uppercase text-black bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full overflow-hidden"
              >
                <span className="relative z-10">GET STARTED</span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute -inset-1 rounded-full blur-md opacity-0 hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from 90deg, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
                  }}
                />
              </Link>
            </motion.div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-gray-300 hover:text-white p-2"
            >
              {mobileOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Cyber Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-[rgba(10,5,30,0.98)] border-t border-[rgba(255,0,240,0.1)]"
            >
              <div className="px-6 py-4 space-y-6">
                {["HOME", "FEATURES", "PRICING", "FAQs", "LOGIN"].map(
                  (item, index) => (
                    <Link
                      key={item}
                      to={index !== 0 ? `/${item.toLowerCase()}` : "/"}
                      className="block text-lg font-bold tracking-widest uppercase text-gray-300 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item}
                    </Link>
                  )
                )}
                <Link
                  to="/register"
                  className="inline-block mt-4 px-6 py-3 text-sm font-bold tracking-widest uppercase text-black bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                >
                  GET STARTED
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
