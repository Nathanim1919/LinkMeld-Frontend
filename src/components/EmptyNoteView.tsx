import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiUser } from "react-icons/fi";
import type { User } from "better-auth/types";
import { authClient } from "../lib/auth-client";
import { CiStickyNote } from "react-icons/ci";

const captures = [
  "Team Meeting Notes - Q3 Planning",
  "Startup Ideas - AI Productivity Tools",
  "Inspirational Quotes from Founders",
  "UI Design Patterns - Mobile Dashboard",
  "GPT-4 Prompt Engineering Techniques",
  "Dream Journal - August Entries",
  "Book Highlights - Atomic Habits",
];

const EmptyNoteView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradientPos, setGradientPos] = useState(0);

  const [authInfo, setAuthInfo] = useState<User>();

  useEffect(() => {
    async function getUserInfo() {
      const auth = await authClient.getSession();
      setAuthInfo(auth?.data?.user);
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPos((prev) => (prev + 0.005) % 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const time = new Date().getHours();
  const greeting =
    time < 12 ? "Good morning" : time < 18 ? "Good afternoon" : "Good evening";

  const filtered = captures.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center px-6 relative overflow-hidden">
      {/* Abstract gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(40,40,255,0.08)_0%,transparent_60%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,40,150,0.05)_0%,transparent_60%)] opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(80,80,80,0.02)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNSIgLz48L3N2Zz4=')] opacity-[0.02]" />
      </div>

      {/* App branding with subtle glow */}
      <div className="w-full pt-10 pb-6">
        <h1 className="text-4xl font-light tracking-tighter text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
            Lnkd
          </span>
          <span className="text-white/20">.</span>
        </h1>
      </div>

      {/* Content area */}
      <div className="w-full max-w-xl mt-4 z-10">
        {/* Personalized greeting */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <FiUser className="text-white/60" />
          </div>
          <div>
            <p className="text-white/60 text-sm">{greeting}</p>
            <p className="font-medium capitalize">{authInfo?.name}</p>
          </div>
        </div>

        {/* Primary prompt */}
        <motion.h2
          className="text-3xl font-bold mb-8 leading-tight max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #def916, #122aff, #dc2626)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textFillColor: "transparent",
          }}
        >
          What knowledge would you like to uncover today?
        </motion.h2>

        {/* Animated gradient input */}
        <motion.div
          className="relative mb-12 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="absolute inset-0 rounded-xl p-px"
            style={{
              background: `linear-gradient(
                90deg,
                rgba(255,255,255,0.3) 0%,
                rgba(100,200,255,0.6) ${gradientPos * 100}%,
                rgba(255,100,200,0.6) ${(gradientPos + 0.3) * 100}%,
                rgba(255,255,255,0.3) 100%
              )`,
              backgroundSize: "200% 200%",
            }}
          />
          <div className="relative before:absolute shadow-amber-500 before:top-0 before:left-0 rounded-2xl overflow-hidden before:transform before:rotate-12 duration-1000 before:w-full before:h-full before:bg-gradient-to-b before:from-orange-400 before:to-violet-600 p-1">
            <div
              className="relative flex items-center bg-[#0a0a0a] rounded-[calc(0.75rem-1px)]
          "
            >
              <FiSearch className="absolute left-4 text-white/40 group-hover:text-white/60 transition-colors" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search across all your notes, bookmarks, and captured ideas..."
                className="w-full bg-transparent rounded-[calc(0.75rem-1px)] py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:placeholder-white/20 text-base"
                autoComplete="off"
              />
            </div>
          </div>
        </motion.div>

        {/* Dynamic results */}
        {searchTerm && (
          <motion.div
            className=" bg-black space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item}
                  className="p-1 flex cursor-pointer gap-1 items-center backdrop-blur-lg rounded-lg transition-all hover:text-white/55 group"
                >
                  {" "}
                  <CiStickyNote className={`text-gray-500 flex-shrink-0`} />
                  <p className="text-white/90 hover:text-white/45 group-hover:text-white">
                    {item.split(" - ")[0]}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-white/40">No results for "{searchTerm}"</p>
                <p className="text-white/20 text-sm mt-1">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Subtle helper text */}
      <motion.div
        className="absolute bottom-8 text-white/20 text-xs flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span>Press ⌘K to search</span>
        <span>•</span>
        <span>{filtered.length} knowledge items</span>
      </motion.div>
    </div>
  );
};

export default EmptyNoteView;
