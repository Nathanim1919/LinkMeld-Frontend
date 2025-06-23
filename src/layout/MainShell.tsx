// src/layout/MainShell.tsx
import { Outlet } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";
import { CaptureProvider } from "../context/CaptureContext";
import { UIProvider } from "../context/UIContext";
import { FolderProvider } from "../context/FolderContext";
import { SourceProvider } from "../context/sourceContext";
import { authClient } from "../lib/auth-client";
import { useEffect, useState } from "react";

export const MainShell = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await authClient.getSession();
        if (error) {
          console.error("Error fetching session:", error);
          setError(error);
        } else {
          setSession(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading session</div>;
  if (!session) return <div>Please log in to continue</div>;

  return (
    <CaptureProvider>
      <UIProvider>
        <FolderProvider>
          <SourceProvider>
            <div className="h-screen w-screen bg-black text-white grid grid-cols-[auto_1fr]">
              <Sidebar />
              <div className="overflow-hidden h-full">
                <Outlet />
              </div>
            </div>
          </SourceProvider>
        </FolderProvider>
      </UIProvider>
    </CaptureProvider>
  );
};
