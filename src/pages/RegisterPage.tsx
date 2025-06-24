import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { useCallback, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { authClient } from "../lib/auth-client";
import { VscLoading } from "react-icons/vsc";
export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegistration = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await authClient.signUp.email(
        {
          ...formData,
          callbackURL: "/in",
        },
        {
          onRequest(context) {
            console.log("Registration request initiated", context);
            setLoading(true);
          },
          onSuccess(context) {
            console.log("Registration successful", context);
            setLoading(false);
            setFormData({ name: "", email: "", password: "" });
          },
          onError(error) {
            console.error("Registration failed", error);
            setLoading(false);
          },
        }
      );
    },
    [formData]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a20] via-[#1a0a30] to-[#0a0a20] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <Link
        to={"/"}
        className="absolute top-6 left-6 text-violet-400 hover:text-violet-300 transition-colors"
      >
        <FaArrowLeftLong className="w-6 h-6" />
      </Link>
      {/* === Cosmic Background Elements === */}
      <div className="absolute inset-0 -z-20">
        {/* Violet nebula glow */}
        <div className="absolute top-1/3 left-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,#7F5AF0_0%,transparent_70%)] opacity-[0.15] blur-[120px] animate-pulse-slow" />

        {/* Distant stars */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* === Floating Space Particles === */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-violet-500/20 backdrop-blur-sm"
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* === Register Container === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative"
      >
        {/* Cosmic Glow Effect */}
        <div className="absolute -inset-4 bg-violet-600/20 rounded-2xl blur-xl -z-10" />

        {/* Main Card */}
        <div className="bg-[#0a0a20]/80 backdrop-blur-lg border border-violet-500/20 rounded-xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-300">
              Join Our Community
            </h2>
            <p className="text-violet-200/80">Create your account in seconds</p>
          </motion.div>

          {/* Register Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
            onSubmit={handleRegistration}
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-violet-100 mb-2"
              >
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-violet-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-[#0d0a25]/70 border border-violet-500/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-400/50 text-white placeholder-violet-400/50 transition-all"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-violet-100 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-violet-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-[#0d0a25]/70 border border-violet-500/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-400/50 text-white placeholder-violet-400/50 transition-all"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-violet-100 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-violet-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 bg-[#0d0a25]/70 border border-violet-500/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-400/50 text-white placeholder-violet-400/50 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-violet-400/70 hover:text-violet-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="mt-2 text-xs text-violet-400/50">
                Use 8+ characters with a mix of letters, numbers & symbols
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`w-full bg-gradient-to-r ${
                loading
                  ? "from-violet-400 to-purple-400 cursor-not-allowed"
                  : "from-violet-600 to-purple-600 cursor-pointer"
              } text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-violet-500/30 transition-all`}
            >
              {loading && (
                <VscLoading className="animate-spin w-5 h-5 text-white" />
              )}
              {loading ? "Creating account..." : "Create Account"}{" "}
              {!loading && <FiArrowRight />}
            </motion.button>
          </motion.form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-violet-500/20" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#0a0a20] px-3 text-sm text-violet-400/50">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="block w-full text-center py-3 px-6 rounded-lg font-medium text-violet-300 border border-violet-500/30 hover:bg-violet-500/10 transition-colors"
          >
            Sign In Instead
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
