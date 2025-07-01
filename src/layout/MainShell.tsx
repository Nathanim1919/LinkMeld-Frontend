// src/layout/MainShell.tsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { VscLoading } from "react-icons/vsc";
import { Toaster } from "sonner";
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
                  <Toaster
                    position="top-right"
                    theme="dark"
                    richColors
                    closeButton
                    visibleToasts={3}
                    toastOptions={{
                      duration: 3000,
                      unstyled: true,
                      classNames: {
                        toast: `
                            w-full 
                            backdrop-blur-lg
                            flex
                            items-center
                            p-2
                            gap-2
                            bg-[#161618]
                            border border-[#2b2b2e]
                            shadow-lg
                            rounded-xl
                            overflow-hidden
                            pointer-events-auto
                            transition-all
                            data-[swipe=cancel]:translate-x-0
                            data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
                            data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
                            data-[swipe=move]:transition-none
                          `,
                                            title: `
                            text-sm
                            font-medium
                            text-gray-100
                          `,
                                            description: `
                            text-xs
                            text-gray-400
                          `,
                                            closeButton: `
                            absolute
                            right-2
                            top-2
                            rounded-sm
                            p-1
                            text-gray-400/70
                            hover:text-gray-100
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-gray-400/30
                            transition-colors
                          `,
                                            success: `
                            [--toast-icon-theme:theme(colors.emerald.500)]
                            border-emerald-800/50
                            [--toast-icon:theme(colors.emerald.500)]
                          `,
                                            error: `
                            [--toast-icon-theme:theme(colors.rose.500)]
                            border-rose-800/50
                            [--toast-icon:theme(colors.rose.500)]
                          `,
                                            warning: `
                            [--toast-icon-theme:theme(colors.amber.500)]
                            border-amber-800/50
                            [--toast-icon:theme(colors.amber.500)]
                          `,
                                            info: `
                            [--toast-icon-theme:theme(colors.blue.500)]
                            border-blue-800/50
                            [--toast-icon:theme(colors.blue.500)]
                          `,
                      },
                    }}
                  />
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
