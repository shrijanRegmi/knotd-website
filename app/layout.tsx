import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/app/components/Providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Knotd: Some Knots Don't Untie",
  description:
    "Find meaningful connections that last. Knotd is the dating app designed for people seeking real, lasting relationships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
