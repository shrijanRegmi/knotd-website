import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Safety Standards — Knotd",
  description:
    "Knotd's published standards against child sexual abuse and exploitation (CSAE). How we address CSAM and how to report.",
};

export default function ChildSafetyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
