import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden isolate">
      {/* === Divine Background Elements === */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-1/3 left-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,#7F5AF0_0%,transparent_70%)] opacity-[0.03] blur-[200px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('/sacred-grid.svg')] opacity-[0.015]" />
      </div>

      {/* === Floating Celestial Orbs === */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-violet-600/10 backdrop-blur-sm"
          style={{
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* === Registration Portal === */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative"
      >
        {/* Divine Glow Effect */}
        <div className="absolute -inset-4 bg-violet-600/10 rounded-2xl blur-xl -z-10" />

        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          {/* Portal Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400">
              Create Divine Account
            </h2>
            <p className="text-zinc-400 text-sm">
              Begin your ascension to higher knowledge
            </p>
          </motion.div>

          {/* Sacred Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Celestial Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                Sacred Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-zinc-500" />
                </div>
                <input
                  id="name"
                  type="text"
                  className="bg-[#111111] border border-white/5 w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-white placeholder-zinc-500 transition-all"
                  placeholder="Enter your divine name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Ethereal Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                Celestial Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-zinc-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="bg-[#111111] border border-white/5 w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-white placeholder-zinc-500 transition-all"
                  placeholder="your@cosmic.address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Mystical Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                Arcane Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-zinc-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="bg-[#111111] border border-white/5 w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-white placeholder-zinc-500 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                At least 8 celestial characters
              </p>
            </div>

            {/* Divine Submission */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-500/30 transition-all"
            >
              Complete Ascension <FiArrowRight />
            </motion.button>
          </motion.form>

          {/* Sacred Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#0A0A0A] px-3 text-sm text-zinc-500">
                OR CONTINUE WITH
              </span>
            </div>
          </div>

          {/* Celestial Social Auth */}
          <div className="grid grid-cols-2 gap-4">
            {['Google', 'GitHub'].map((provider) => (
              <motion.button
                key={provider}
                whileHover={{ y: -2 }}
                className="flex items-center justify-center gap-2 bg-[#111111] border border-white/5 py-3 px-4 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <img 
                  src={`/${provider.toLowerCase()}-icon.svg`} 
                  alt={provider} 
                  className="w-5 h-5"
                />
                {provider}
              </motion.button>
            ))}
          </div>

          {/* Portal Footer */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center text-sm text-zinc-500"
          >
            Already ascended?{' '}
            <Link 
              to="/login" 
              className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
            >
              Enter the portal
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};