import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Account & Data Deletion — Knotd",
  description:
    "Request deletion of your Knotd account and associated data. Steps, data we delete or keep, and retention period.",
};

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
