"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Lock,
  MapPin,
  Sparkles,
  Star,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "You're in control. Choose what you share—hide your active status, age, location, or read receipts. You can even hide your entire profile from discovery for as long as you like. Date on your terms, with full control over your visibility.",
  },
  {
    icon: MapPin,
    title: "Local Discovery",
    description:
      "Find matches near you or explore connections in cities you're planning to visit. Love knows no boundaries.",
  },
  {
    icon: Heart,
    title: "Smart Matching",
    description:
      "Our AI-powered algorithm learns your preferences and suggests compatible partners based on personality, interests, and values.",
  },
  {
    icon: Star,
    title: "Super Likes",
    description:
      "Stand out from the crowd with free super likes every week—no paywall. Let your matches know they caught your eye and start the conversation with a little extra spark.",
  },
  {
    icon: RotateCcw,
    title: "Unlimited Rewinds",
    description:
      "Changed your mind? Rewind as often as you like and give that profile another look. We want you to find the right match, not miss it.",
  },
  {
    icon: MessageCircle,
    title: "Rich Messaging",
    description:
      "Express yourself with text, voice notes, GIFs, and reactions. Break the ice with our curated conversation starters.",
  },
];

const screenshots = [
  {
    src: "/assets/screenshots/swipe_screen.PNG",
    alt: "Explore screen",
    label: "Explore",
    description: "See who's around you and start exploring",
    tiltClass: "animate-tilt-far-left",
    delay: 0,
  },
  {
    src: "/assets/screenshots/discover_screen.PNG",
    alt: "Profile browsing screen",
    label: "Discover",
    description: "Browse curated profiles tailored to you",
    tiltClass: "animate-tilt-left",
    delay: 100,
  },
  {
    src: "/assets/screenshots/match_screen.PNG",
    alt: "Match screen",
    label: "Match",
    description: "Find the one who truly complements your life",
    tiltClass: "animate-tilt-right",
    delay: 300,
  },
  {
    src: "/assets/screenshots/messages_screen.PNG",
    alt: "Messaging screen",
    label: "Connect",
    description: "Start meaningful conversations that lead somewhere",
    tiltClass: "animate-tilt-center",
    delay: 200,
  },
  {
    src: "/assets/screenshots/profile_screen.PNG",
    alt: "Profile screen",
    label: "Profile",
    description: "Showcase your best self with a rich profile",
    tiltClass: "animate-tilt-far-right",
    delay: 400,
  },
];

export default function Features() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (showcaseRef.current) observer.observe(showcaseRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-24 lg:py-32 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-transparent h-32" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            Why Knotd?
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark tracking-tight">
            Features that spark{" "}
            <span className="gradient-text">real connections</span>
          </h2>
          <p className="mt-5 text-lg text-dark-light/60 leading-relaxed">
            Every feature is thoughtfully designed to help you build genuine,
            lasting relationships — not just swipe endlessly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative rounded-3xl border border-rose-100/80 bg-white p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mb-5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-dark-light/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div
        ref={showcaseRef}
        className="relative mt-24 py-24 lg:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-[#2a1520] to-dark" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 blur-[120px] glow-orb" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px] glow-orb-delayed" />
        <div className="absolute bottom-1/4 left-0 w-[250px] h-[250px] rounded-full bg-primary-light/10 blur-[80px] glow-orb-delayed" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 mb-5 backdrop-blur-sm border border-white/5">
              <Sparkles className="w-3.5 h-3.5 text-primary-light" />
              App Preview
            </span>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              See <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Knotd</span> in action
            </h3>
            <p className="mt-5 text-base sm:text-lg text-white/40 leading-relaxed">
              A sneak peek at the beautiful experience waiting for you.
            </p>
          </div>

          <div className="showcase-scroll flex items-center gap-4 sm:gap-6 lg:gap-8 justify-start lg:justify-center px-8 sm:px-4 overflow-x-auto lg:overflow-x-visible pb-6 lg:pb-0 snap-x snap-mandatory lg:snap-none">
            {screenshots.map((screenshot, index) => {
              const isCenter = index === 2;
              const isInner = index === 1 || index === 3;
              const sizeClass = isCenter
                ? "w-[200px] sm:w-[230px] lg:w-[260px]"
                : isInner
                  ? "w-[180px] sm:w-[210px] lg:w-[235px]"
                  : "w-[160px] sm:w-[195px] lg:w-[210px]";

              return (
                <div
                  key={screenshot.label}
                  className="transition-all duration-700 ease-out flex-shrink-0 snap-center"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                      ? "translateY(0) scale(1)"
                      : "translateY(60px) scale(0.92)",
                    transitionDelay: `${screenshot.delay}ms`,
                  }}
                >
                  <div
                    className={`flex flex-col items-center screenshot-card ${screenshot.tiltClass}`}
                  >
                    <div className={`phone-mockup-showcase ${sizeClass}`}>
                      <div className="phone-mockup-inner">
                        <div className="phone-notch" />
                        <Image
                          src={screenshot.src}
                          alt={screenshot.alt}
                          width={260}
                          height={520}
                          className="w-full h-auto object-cover aspect-[9/19]"
                        />
                      </div>
                    </div>
                    <div className="mt-5 text-center">
                      <span className="showcase-label inline-block rounded-full px-4 py-1.5 text-xs font-semibold text-white/90 mb-2">
                        {screenshot.label}
                      </span>
                      <p className="text-xs sm:text-sm text-white/35 max-w-[170px] leading-relaxed hidden sm:block">
                        {screenshot.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
