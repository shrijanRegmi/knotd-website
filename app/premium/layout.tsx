"use client";

import type { ReactNode } from "react";
import AuthGuard from "@/app/components/AuthGuard";

export default function PremiumLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
