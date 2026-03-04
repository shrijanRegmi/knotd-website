"use client";

import { useState } from "react";
import {
  Check,
  Crown,
  Heart,
  Sparkles,
  RefreshCw,
  Zap,
  Eye,
  type LucideIcon,
  Star,
} from "lucide-react";
import {
  usePremiumData,
  AsyncStatus,
  type DisplayItem,
} from "@/app/hooks/usePremiumData";

const PLAN_ICON_MAP: Record<string, LucideIcon> = {
  free: Heart,
  lightning: Crown,
  ultraLightning: Crown,
};

function PlanCardSkeleton() {
  return (
    <div className="relative rounded-3xl p-8 bg-white border border-rose-100/80 animate-pulse">
      <div className="mb-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 mb-4" />
        <div className="h-7 w-32 bg-rose-100 rounded-lg mb-2" />
        <div className="h-4 w-48 bg-rose-50 rounded-lg" />
      </div>
      <div className="mb-8">
        <div className="h-12 w-28 bg-rose-100 rounded-lg" />
      </div>
      <div className="space-y-3 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-rose-50" />
            <div className="h-4 w-36 bg-rose-50 rounded-lg" />
          </div>
        ))}
      </div>
      <div className="h-12 w-full bg-rose-100 rounded-full" />
    </div>
  );
}

function ErrorBanner({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 px-4">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
        <svg
          className="w-7 h-7 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <p className="text-sm text-dark-light/60 text-center max-w-md">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold gradient-bg text-white shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}

export default function Subscriptions() {
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<
    "monthly" | "weekly"
  >("monthly");
  const {
    plans,
    plansStatus,
    plansError,
    retryPlans,
    items,
    itemsStatus,
    itemsError,
    retryItems,
  } = usePremiumData();

  const ITEM_SECTIONS = [
    { key: "likes", title: "Likes", icon: Heart, color: "pink" },
    { key: "superLikes", title: "Super Likes", icon: Star, color: "amber" },
    { key: "seeWhoLikedYou", title: "Reveals", icon: Eye, color: "purple" },
  ];

  return (
    <section
      id="subscriptions"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/40 to-white" />
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-primary-light/5 to-primary/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4 animate-fade-in-up">
            <Sparkles className="w-3 h-3" />
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark tracking-tight animate-fade-in-up">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h2>
          <p className="mt-5 text-lg text-dark-light/60 leading-relaxed animate-fade-in-up-delayed">
            Whether you&apos;re just getting started or ready to go all in,
            we&apos;ve got a plan for you.
          </p>
        </div>

        {/* Billing cycle toggle */}
        <div className="flex justify-center mb-12 animate-fade-in-up-delayed">
          <div className="inline-flex items-center gap-2 bg-white rounded-full p-1.5 shadow-lg shadow-primary/10 border border-rose-100/50">
            <button
              onClick={() => setSelectedBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedBillingCycle === "monthly"
                  ? "gradient-bg text-white shadow-md"
                  : "text-dark-light/60 hover:text-dark"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedBillingCycle("weekly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedBillingCycle === "weekly"
                  ? "gradient-bg text-white shadow-md"
                  : "text-dark-light/60 hover:text-dark"
              }`}
            >
              Weekly
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        {plansStatus === AsyncStatus.Error && plansError ? (
          <ErrorBanner message={plansError} onRetry={retryPlans} />
        ) : (
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {plansStatus === AsyncStatus.Loading ||
            plansStatus === AsyncStatus.Idle
              ? [1, 2, 3].map((i) => <PlanCardSkeleton key={i} />)
              : plans.map((plan, index) => {
                  const Icon = PLAN_ICON_MAP[plan.tier] ?? Heart;
                  const price =
                    selectedBillingCycle === "monthly"
                      ? plan.monthlyPrice
                      : plan.weeklyPrice;

                  return (
                    <div
                      key={plan.tier}
                      className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                        plan.popular
                          ? "gradient-bg text-white shadow-2xl shadow-primary/30 scale-[1.02] lg:scale-105 animate-fade-in-up-delayed"
                          : "bg-white border border-rose-100/80 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {plan.popular && (
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                          <span className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-primary shadow-lg whitespace-nowrap">
                            <Sparkles className="w-3 h-3" /> Most Popular
                          </span>
                        </div>
                      )}

                      <div className="mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110 hover:rotate-12 ${
                            plan.popular ? "bg-white/20" : "bg-primary/10"
                          }`}
                        >
                          <Icon
                            className={`w-7 h-7 ${plan.popular ? "text-white" : "text-primary"}`}
                          />
                        </div>
                        <h3
                          className={`text-2xl font-bold ${plan.popular ? "text-white" : "text-dark"}`}
                        >
                          {plan.displayName}
                        </h3>
                        <p
                          className={`mt-2 text-sm ${plan.popular ? "text-white/80" : "text-dark-light/60"}`}
                        >
                          {plan.description}
                        </p>
                      </div>

                      <div className="mb-8">
                        {price ? (
                          <div className="flex items-baseline">
                            <span className="text-sm font-semibold mr-1">
                              {plan.currency}
                            </span>
                            <span
                              className={`text-5xl font-extrabold ${plan.popular ? "text-white" : "text-dark"}`}
                            >
                              {price}
                            </span>
                            <span
                              className={`text-sm ml-2 ${plan.popular ? "text-white/60" : "text-dark-light/40"}`}
                            >
                              /{" "}
                              {selectedBillingCycle === "monthly"
                                ? "month"
                                : "week"}
                            </span>
                          </div>
                        ) : (
                          <span
                            className={`text-5xl font-extrabold ${plan.popular ? "text-white" : "text-dark"}`}
                          >
                            Free
                          </span>
                        )}
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check
                              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? "text-white" : "text-primary"}`}
                            />
                            <span
                              className={`text-sm ${plan.popular ? "text-white/90" : "text-dark-light/70"}`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <a href="/auth">
                        <button
                          disabled={!price}
                          className={`w-full rounded-full py-4 text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${
                            plan.popular
                              ? "bg-white text-primary shadow-lg hover:shadow-2xl"
                              : price
                                ? "gradient-bg text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                                : "bg-dark/5 text-dark/40 cursor-not-allowed"
                          }`}
                        >
                          {plan.cta}
                        </button>
                      </a>
                    </div>
                  );
                })}
          </div>
        )}

        {/* Purchaseable Items Section */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Or Grab <span className="gradient-text">Quick Boosts</span>
            </h3>
            <p className="text-base text-dark-light/60">
              Need an instant boost? Get exactly what you need, when you need
              it.
            </p>
          </div>

          {itemsStatus === AsyncStatus.Error && itemsError ? (
            <ErrorBanner message={itemsError} onRetry={retryItems} />
          ) : itemsStatus === AsyncStatus.Loading ||
            itemsStatus === AsyncStatus.Idle ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-rose-100/80 animate-pulse"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-rose-100" />
                    <div className="h-6 w-20 bg-rose-100 rounded-lg" />
                  </div>
                  <div className="h-5 w-28 bg-rose-100 rounded-lg mb-2" />
                  <div className="h-4 w-full bg-rose-50 rounded-lg mb-4" />
                  <div className="h-10 w-full bg-rose-100 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ITEM_SECTIONS.map((section) => {
                const sectionItems: DisplayItem[] = items[section.key] ?? [];
                const Icon = section.icon;

                return sectionItems.map((item, index) => {
                  const colorConfig = {
                    pink: {
                      bg: "bg-[#FF6B6B]/10",
                      icon: "text-[#FF6B6B]",
                      button: "bg-[#FF6B6B] hover:bg-[#FF6B6B]/90",
                      shadow: "shadow-[#FF6B6B]/20 hover:shadow-[#FF6B6B]/40",
                    },
                    amber: {
                      bg: "bg-[#34C2B8]/10",
                      icon: "text-[#34C2B8]",
                      button: "bg-[#34C2B8] hover:bg-[#34C2B8]/90",
                      shadow: "shadow-[#34C2B8]/20 hover:shadow-[#34C2B8]/40",
                    },
                    purple: {
                      bg: "bg-[#FFB366]/20",
                      icon: "text-[#FFB366]",
                      button: "bg-[#FFB366] hover:bg-[#FFB366]/90",
                      shadow: "shadow-[#FFB366]/20 hover:shadow-[#FFB366]/40",
                    },
                  };

                  const colors =
                    colorConfig[section.color as keyof typeof colorConfig];

                  return (
                    <div
                      key={item.id}
                      className="group relative bg-white rounded-2xl p-6 border border-rose-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* Header with Icon and Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}
                        >
                          <Icon className={`w-6 h-6 ${colors.icon}`} />
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-dark-light/50 uppercase tracking-wide font-semibold">
                            {item.currency}
                          </p>
                          <p className="text-2xl font-bold text-dark">
                            {item.price}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <h4 className="text-lg font-bold text-dark mb-1">
                        {item.displayName}
                      </h4>
                      <p className="text-sm text-dark-light/60 mb-4">
                        {item.description}
                      </p>

                      {/* CTA Button */}
                      <a href="/auth">
                        <button
                          className={`w-full rounded-full py-3 text-sm font-semibold ${colors.button} text-white ${colors.shadow} shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95`}
                        >
                          Get {item.quantity} {section.title}
                        </button>
                      </a>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary-light/0 group-hover:from-primary/5 group-hover:to-primary-light/5 transition-all duration-300 pointer-events-none" />
                    </div>
                  );
                });
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
