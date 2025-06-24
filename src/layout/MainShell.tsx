// src/layout/MainShell.tsx
import { Outlet, useNavigate } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";
import { CaptureProvider } from "../context/CaptureContext";
import { UIProvider } from "../context/UIContext";
import { FolderProvider } from "../context/FolderContext";
import { SourceProvider } from "../context/sourceContext";
import { authClient } from "../lib/auth-client";
import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";

export const MainShell = () => {
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await authClient.getSession();
        if (error) {
          setError(error);
        } else {
          setSession(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <VscLoading className="animate-spin w-8 h-8 text-white mx-auto m-0" />
          <p className="text-white mt-4">Loading session...</p>
        </div>
      </div>
    );
  if (error) return <div>Error loading session</div>;
  if (!session) navigate({ to: "/login" });

  return (
    <CaptureProvider>
      <UIProvider>
        <FolderProvider>
          <SourceProvider>
            <div className="h-screen w-screen bg-black text-white grid grid-cols-[auto_1fr]">
              <Sidebar user={session.user} />
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
