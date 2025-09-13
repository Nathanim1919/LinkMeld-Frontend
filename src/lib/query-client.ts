// src/lib/query-client.ts

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes
            retry: (failerCount, error) => {
                // Don't retry on 4xx errors (client errors)
                if (error.status >= 400 && error.status < 500) return false;
                return failerCount < 3;
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff (up to 30 seconds). e.g. 1s, 2s, 4s, 8s, 16s, 30s
            refetchOnWindowFocus: import.meta.env.DEV, // Only in development
            refetchOnReconnect: true, // Refetch when network reconnects
            refetchOnMount: true, // Refetch when component mounts
        },
    },
})