// src/layout/MainShell.tsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { VscLoading } from "react-icons/vsc";

import Sidebar from "../components/Sidebar";

import { CaptureProvider } from "../context/CaptureContext";
import { UIProvider } from "../context/UIContext";
import { FolderProvider } from "../context/FolderContext";
import { SourceProvider } from "../context/sourceContext";

import { authClient } from "../lib/auth-client";
import type { Session, User } from "better-auth/types";
import { ChatProvider } from "../context/ChatContext";

export const MainShell = () => {
  const [session, setSession] = useState<{
    session: Session;
    user: User;
  } | null>(null);
  const [error, setError] = useState<{
    code?: string;
    message?: string;
    status: number;
    statusText: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data, error } = await authClient.getSession();
        if (error) {
          setError(error);
        } else {
          setSession(data);
        }
      } catch (err) {
        console.error("Unexpected error loading session:", err);
        setError(
          err as {
            code?: string;
            message?: string;
            status: number;
            statusText: string;
          }
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  useEffect(() => {
    if (!isLoading && !session) {
      navigate({ to: "/login" });
    }
  }, [session, isLoading, navigate]);

  if (isLoading) {
    return <CenteredLoader message="Loading session..." />;
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-red-500">
        <p>Error loading session: {error.message || "Unknown error"}</p>
      </div>
    );
  }

  if (!session) return null; // wait for redirect

  return (
    <CaptureProvider>
      <UIProvider>
        <ChatProvider>
          <FolderProvider>
            <SourceProvider>
              <div className="h-screen w-screen bg-black text-white grid grid-cols-[auto_1fr]">
                <Sidebar user={session.user} />
                <main className="overflow-hidden h-full">
                  <Outlet />
                </main>
              </div>
            </SourceProvider>
          </FolderProvider>
        </ChatProvider>
      </UIProvider>
    </CaptureProvider>
  );
};

// Small reusable component for centralized loading feedback
const CenteredLoader = ({ message }: { message: string }) => (
  <div className="h-screen w-screen bg-black flex items-center justify-center">
    <div className="flex flex-col items-center">
      <VscLoading className="animate-spin w-8 h-8 text-white" />
      <p className="text-white mt-4">{message}</p>
    </div>
  </div>
);
