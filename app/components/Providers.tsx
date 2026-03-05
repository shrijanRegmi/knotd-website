"use client";

import type { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/app/context/AuthContext";
import { UserProvider } from "@/app/context/UserContext";
import { config } from "../lib/config";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={config.google.clientId}>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
