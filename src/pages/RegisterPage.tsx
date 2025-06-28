import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { FaArrowLeft, FaGoogle } from "react-icons/fa";
import { useState } from "react";
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

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.signUp.email({
        ...formData,
        callbackURL: "/in",
      });
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/in",
    });
    if (data.error) {
      console.error("Google sign-in failed", data.error);
    } else {
      // Handle successful Google sign-in
      console.log("Google sign-in successful", data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
      >
        <FaArrowLeft className="w-5 h-5" />
      </Link>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Create your account</h2>
            <p className="text-gray-400">Join us today</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegistration} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-300 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="name"
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Use 8+ characters with a mix of letters, numbers & symbols
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className={`w-full  py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 ${
                loading
                  ? "bg-blue-600 cursor-not-allowed"
                  : "bg-blue-600 cursor-pointer hover:bg-blue-500"
              } text-white transition-colors shadow-md`}
            >
              {loading ? (
                <>
                  <VscLoading className="animate-spin w-5 h-5" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account <FiArrowRight />
                </>
              )}
            </motion.button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className={`w-full mt-2 flex items-center justify-center gap-3 py-2.5 px-6 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors mb-6 ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <FaGoogle className="text-blue-400" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-700"></div>
            <span
              className={`px-3 text-gray-500 text-sm ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Already registered?
            </span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className={`block w-full ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            } text-center py-2.5 px-6 rounded-lg font-medium text-blue-400 border border-gray-700 hover:bg-gray-700/50 transition-colors`}
          >
            Sign in to your account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
