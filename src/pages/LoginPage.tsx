import { Link } from "@tanstack/react-router";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaArrowLeft, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { authClient } from "../lib/auth-client";

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
      await authClient.signIn.email({
        ...formData,
        callbackURL: "/in",
      });
    } catch (error) {
      console.error("Login failed", error);
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
      <Link
        to="/"
        className="absolute top-6 left-6 text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
      >
        <FaArrowLeft className="w-5 h-5" />
      </Link>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
            <p className="text-gray-400">Sign in to continue</p>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignIn}
            className={`${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            } w-full flex items-center justify-center gap-3 py-2.5 px-6 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors mb-6`}
          >
            <FaGoogle className="text-blue-400" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                } py-2.5 px-6 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex justify-center items-center`}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-gray-400">
            <Link
              to="/forgot-password"
              className={`hover:text-blue-400 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } transition-colors`}
            >
              Forgot password?
            </Link>
            <span className="mx-2">•</span>
            <Link
              to="/register"
              className={`hover:text-blue-400 ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              } transition-colors`}
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
