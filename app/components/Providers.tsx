"use client";

import type { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/app/context/AuthContext";
import { UserProvider } from "@/app/context/UserContext";

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "DUMMY_CLIENT_ID";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
