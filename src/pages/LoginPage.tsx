import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { toast } from 'sonner';


export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await authClient.signIn.email({
        ...formData,
        callbackURL: "/in",
      });
  
      if (result.error) {
        toast.error(result.error.message || "Invalid credentials");
        return;
      }
  
      toast.success("Signed in successfully");
    } catch (error) {
      toast.error("Error occurred while signing in");
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/in",
      });
      if (data.error) {
        console.error("Google sign-in failed", data.error);
      }
    } catch (error) {
      console.error("Google sign-in error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNSIgLz48L3N2Zz4=')] opacity-5" />
      
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-8 left-8"
      >
        <Link
          to="/"
          className="text-[#2997ff] hover:text-[#64b5ff] transition-colors flex items-center gap-2 group"
        >
          <FiArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </motion.div>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1c1c1e] rounded-2xl p-8 shadow-xl border border-[#2c2c2e] overflow-hidden">
          {/* Header with subtle animation */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f7] to-[#a1a1a6]">
              Welcome Back
            </h1>
            <p className="text-[#aeaeb2] text-sm">Sign in to your account</p>
          </motion.div>

          {/* Google button with hover effect */}
          <motion.button
            onClick={handleGoogleSignIn}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl ${
              loading ? "bg-[#2c2c2e] cursor-not-allowed" : "bg-[#2c2c2e] hover:bg-[#3a3a3c] cursor-pointer"
            } transition-all mb-6 relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity" />
            <FaGoogle className="text-[#4285f4] text-lg" />
            <span className="text-sm font-medium">Continue with Google</span>
          </motion.button>

          {/* Animated divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center my-6"
          >
            <div className="flex-1 border-t border-[#2c2c2e]"></div>
            <span className="px-3 text-[#636366] text-xs">OR</span>
            <div className="flex-1 border-t border-[#2c2c2e]"></div>
          </motion.div>

          {/* Form with field animations */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm text-[#aeaeb2] mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#636366]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-[#2c2c2e] rounded-xl focus:ring-2 focus:ring-[#0071e3] focus:outline-none border border-transparent hover:border-[#3a3a3c] transition-all"
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm text-[#aeaeb2] mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#636366]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-12 pr-11 py-3 bg-[#2c2c2e] rounded-xl focus:ring-2 focus:ring-[#0071e3] focus:outline-none border border-transparent hover:border-[#3a3a3c] transition-all"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#636366] hover:text-[#aeaeb2] transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-1"
            >
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-6 rounded-xl ${
                  loading ? "bg-[#0071e3]/70 cursor-not-allowed" : "bg-[#0071e3] hover:bg-[#2997ff] cursor-pointer"
                } transition-all flex justify-center items-center gap-2 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <span className="font-medium">Sign In</span>
                )}
              </button>
            </motion.div>
          </form>

          {/* Footer links with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center text-sm text-[#636366]"
          >
            <Link
              to="/forgot-password"
              className={`relative z-1000 hover:text-[#2997ff] ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } transition-colors inline-block mx-1`}
            >
              Forgot password?
            </Link>
            <span className="mx-2 text-[#3a3a3c]">•</span>
            <Link
              to="/register"
              className={`relative z-1000 hover:text-[#2997ff] ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } transition-colors inline-block mx-1`}
            >
              Create account
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};