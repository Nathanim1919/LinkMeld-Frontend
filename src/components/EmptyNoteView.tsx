import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiUser } from "react-icons/fi";
import type { User } from "better-auth/types";
import type { Capture } from "../types/Capture";
import { authClient } from "../lib/auth-client";
import { CaptureService } from "../api/capture.api";
import debounce from "lodash.debounce";
import { SearchResultCard } from "./cards/searchResultCard";

const EmptyNoteView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [authInfo, setAuthInfo] = useState<User>();
  const [loading, setLoading] = useState(false);
  const cache = useRef<Map<string, Capture[]>>(new Map());

  // 🌐 Debounced search handler
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setCaptures([]);
        return;
      }

      if (cache.current.has(term)) {
        setCaptures(cache.current.get(term)!);
        return;
      }

      try {
        setLoading(true);
        const results = await CaptureService.search(term);
        cache.current.set(term, results);
        setCaptures(results);
      } catch (error) {
        console.error("Error fetching captures:", error);
        setCaptures([]);
      } finally {
        setLoading(false);
      }
    }, 400),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    async function getUserInfo() {
      const auth = await authClient.getSession();
      setAuthInfo(auth?.data?.user);
    }
    getUserInfo();
  }, []);

  const time = new Date().getHours();
  const greeting =
    time < 12 ? "Good morning" : time < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center px-6 relative overflow-hidden">
      {/* Abstract gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(40,40,255,0.08)_0%,transparent_60%)] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,40,150,0.05)_0%,transparent_60%)] opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(80,80,80,0.02)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuNSIgLz48L3N2Zz4=')] opacity-[0.02]" />
      </div>

      {/* App branding */}
      <div className="w-full pt-10 pb-6">
        <h1 className="text-4xl font-light tracking-tighter text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
            Deepen.
          </span>
          <span className="text-white/20">.</span>
        </h1>
      </div>

      {/* Content area */}
      <div className="w-full max-w-xl mt-4 z-10">
        {/* Greeting */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <FiUser className="text-white/60" />
          </div>
          <div>
            <p className="text-white/60 text-sm">{greeting}</p>
            <p className="font-medium capitalize">{authInfo?.name}</p>
          </div>
        </div>

        {/* Prompt */}
        <motion.h2
          className="text-3xl font-bold mb-8 leading-tight max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            backgroundImage:
              "linear-gradient(90deg, #06d1ff, #efff12, #ffffff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textFillColor: "transparent",
          }}
        >
          What knowledge would you like to uncover today?
        </motion.h2>

        {/* Input */}
        <motion.div
          className="relative mb-12 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-0 rounded-xl p-px" />
          <div className="relative before:absolute shadow-amber-500 before:top-0 before:left-0 rounded-[10px] overflow-hidden before:opacity-100 before:transform before:rotate- duration-1000 before:w-full before:h-full before:bg-gradient-to-b before:from-orange-400 before:to-violet-600 p-[.8px]">
            <div className="relative shadow-2xl flex items-center bg-[#0a0a0a] rounded-[calc(0.75rem-1px)]">
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

        {/* Results */}
        {searchTerm && (
          <SearchResultCard
            captures={captures}
            searchTerm={searchTerm}
            loading={loading}
          />
        )}
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 text-white/20 text-xs flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span>{captures.length} knowledge items•</span>
      </motion.div>
    </div>
  );
};

export default EmptyNoteView;
