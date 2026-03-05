"use client";

import type { ReactNode } from "react";
import AuthGuard from "@/app/components/AuthGuard";

export default function PaymentLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
