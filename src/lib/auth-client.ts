import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: "http://52.156.88.58:3000/api/auth",
});
