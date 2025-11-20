import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  // baseURL: "https://api.deepen.live/api/auth",
  baseURL: "https://deepen-api.onrender.com/api/auth", // Uncomment for local development
});
