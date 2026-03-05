"use client";

import type { ReactNode } from "react";
import AuthGuard from "@/app/components/AuthGuard";

export default function SubscriptionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
