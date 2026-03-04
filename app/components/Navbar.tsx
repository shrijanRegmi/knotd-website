"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Crown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "Subscriptions", href: "/#subscriptions" },
  { label: "About Us", href: "/#about" },
  { label: "Safety", href: "/#safety" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-rose-100/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logos/knotd-logo.png"
              alt="Knotd logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain rounded-lg"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark-light hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/auth"
              className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 transition-all hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Crown className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span className="relative z-10">Go Premium</span>
            </a>
            <a
              href="/#download"
              className="gradient-bg inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
            >
              Download App
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-dark"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-rose-100/60">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-dark-light hover:text-primary transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/auth"
              onClick={() => setMobileOpen(false)}
              className="group flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg mt-2"
            >
              <Crown className="w-4 h-4" />
              Go Premium
            </a>
            <a
              href="/#download"
              onClick={() => setMobileOpen(false)}
              className="gradient-bg block text-center rounded-full px-6 py-2.5 text-sm font-semibold text-white"
            >
              Download App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
