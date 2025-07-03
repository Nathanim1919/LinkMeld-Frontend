import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Features", "Pricing", "Manifesto", "FAQs", "Feedback"];

  return (
    <header className="relative bg-[#030409] w-full z-50">
      {/* Main header with glass effect */}
      <div className={`relative transition-all duration-300 `}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo with subtle gradient */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center"
            >
              <Link to="/" className="text-xl font-medium">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white font-light">lnkd</span>
                <span className="text-blue-400">.</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Apple style */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item}
                  onHoverStart={() => setHoveredItem(item)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className="relative py-1"
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className={`text-md font-medium tracking-wider ${
                      hoveredItem === item ? 'text-white' : 'text-gray-400'
                    } transition-colors duration-200`}
                  >
                    {item}
                  </Link>
                  
                  {/* Apple-style subtle indicator */}
                  {hoveredItem === item && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: '100%' }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    />
                  )}
                </motion.div>
              ))}
            </nav>

            {/* CTA - Apple-style minimal buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/login"
                  className="px-4 py-1.5 text-md font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-md font-medium text-white bg-gradient-to-r from-blue-500/90 to-blue-600/90 rounded-full transition-all hover:shadow-[0_0_15px_-3px_rgba(59,130,246,0.3)]"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>

            {/* Mobile Toggle - Minimal icon */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1 -mr-1 text-gray-400 hover:text-white"
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Dark glass panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-lg border-b border-gray-800/30"
          >
            <div className="px-6 py-3 space-y-5">
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="block py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors border-b border-gray-800/30"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="pt-3 space-y-3">
              <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-1.5 text-sm font-medium text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Link to="/login">
                Sign In
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-full transition-all hover:bg-blue-600"
            >
              <Link to="/register">
                Get Started
              </Link>
            </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};