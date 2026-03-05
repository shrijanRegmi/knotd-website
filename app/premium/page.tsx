"use client";

import { useState } from "react";
import {
  Check,
  Star,
  Crown,
  Heart,
  Eye,
  Sparkles,
  X,
  RefreshCw,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import {
  usePremiumData,
  AsyncStatus,
  type DisplayItem,
} from "@/app/hooks/usePremiumData";
import { useEsewaPayment } from "@/app/hooks/useEsewaPayment";
import type { EsewaInitiateBody } from "@/app/lib/api";
import UserProfile from "@/app/components/UserProfile";

// ── Icon mappings ───────────────────────────────────────────────────────────

const PLAN_ICON_MAP: Record<string, LucideIcon> = {
  free: Heart,
  lightning: Crown,
  ultraLightning: Crown,
};

const ITEM_SECTIONS = [
  { key: "likes", title: "Extra Likes", icon: Heart, color: "pink" },
  { key: "superLikes", title: "Super Likes", icon: Star, color: "amber" },
  {
    key: "seeWhoLikedYou",
    title: "Profile Reveals",
    icon: Eye,
    color: "purple",
  },
];

const ITEM_COLOR_CONFIG = {
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
} as const;

// ── Skeleton components ─────────────────────────────────────────────────────

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

function ItemCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-rose-100/80 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-rose-100" />
        <div className="h-7 w-20 bg-rose-100 rounded-lg" />
      </div>
      <div className="h-5 w-28 bg-rose-100 rounded-lg mb-1" />
      <div className="h-4 w-44 bg-rose-50 rounded-lg mb-4" />
      <div className="h-11 w-full bg-rose-100 rounded-full" />
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
        <X className="w-7 h-7 text-red-400" />
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

// ── Item card (shared across all item sections) ─────────────────────────────

function ItemCard({
  item,
  icon: Icon,
  index,
  disabled,
  onPurchase,
  colors,
}: {
  item: DisplayItem;
  icon: LucideIcon;
  index: number;
  disabled: boolean;
  onPurchase: (itemId: string) => void;
  colors: (typeof ITEM_COLOR_CONFIG)[keyof typeof ITEM_COLOR_CONFIG];
}) {
  return (
    <div
      className="group relative bg-white rounded-2xl p-6 border border-rose-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
        >
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
        <div className="text-right">
          <p className="text-xs text-dark-light/50 uppercase tracking-wide font-semibold">
            {item.currency}
          </p>
          <p className="text-2xl font-bold text-dark">{item.price}</p>
        </div>
      </div>

      <h4 className="text-lg font-bold text-dark mb-1">{item.displayName}</h4>
      <p className="text-sm text-dark-light/60 mb-4">{item.description}</p>

      <button
        onClick={() => onPurchase(item.id)}
        disabled={disabled}
        className={`w-full rounded-full py-3 text-sm font-semibold ${colors.button} text-white ${colors.shadow} shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
      >
        Purchase Now
      </button>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary-light/0 group-hover:from-primary/5 group-hover:to-primary-light/5 transition-all duration-300 pointer-events-none" />
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────

export default function PremiumPage() {
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<
    "monthly" | "weekly"
  >("monthly");

  const {
    plans,
    plansStatus,
    plansError,
    items,
    itemsStatus,
    itemsError,
    retryPlans,
    retryItems,
  } = usePremiumData();

  const {
    status: paymentStatus,
    error: paymentError,
    pay,
    clearError,
  } = useEsewaPayment();
  const isPaymentLoading = paymentStatus === "loading";

  const handleSubscribe = (planId: string) => {
    pay({
      type: "subscription",
      subscriptionPlanId: planId,
      billingCycle: selectedBillingCycle,
    });
  };

  const handlePurchaseItem = (itemId: string) => {
    pay({ type: "purchase", purchasableItemId: itemId });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-primary-light/5 to-primary/5 rounded-full blur-3xl animate-float-delayed" />

      {/* Header */}
      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              <Sparkles className="w-3 h-3" />
              Premium Features
            </span>
          </div>
          <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark mb-4">
            Boost Your <span className="gradient-text">Connection Game</span>
          </h1>
          <p className="animate-fade-in-up-delayed text-lg text-dark-light/70 max-w-2xl mx-auto">
            Upgrade your experience with more likes, super likes, and reveals to
            find your perfect match faster.
          </p>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <UserProfile />
      </div>

      {/* Subscriptions Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              Choose Your <span className="gradient-text">Subscription</span>
            </h2>

            {/* Billing cycle toggle */}
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

          {plansStatus === AsyncStatus.Error && plansError ? (
            <ErrorBanner message={plansError} onRetry={retryPlans} />
          ) : (
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start pt-8 mt-4">
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
                        className={`subscription-card relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
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
                            <li
                              key={feature}
                              className="flex items-start gap-3"
                            >
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

                        <button
                          onClick={() => handleSubscribe(plan.id)}
                          disabled={!price || isPaymentLoading}
                          className={`purchase-button w-full rounded-full py-4 text-sm font-semibold transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100 ${
                            plan.popular
                              ? "bg-white text-primary shadow-lg hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                              : price
                                ? "gradient-bg text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                : "bg-dark/5 text-dark/40 cursor-not-allowed"
                          }`}
                        >
                          {plan.cta}
                        </button>
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      </section>

      {/* Purchaseable Items Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              One-Time <span className="gradient-text">Power-Ups</span>
            </h2>
            <p className="text-base text-dark-light/70 max-w-2xl mx-auto">
              Need an instant boost? Purchase individual items to enhance your
              experience right away.
            </p>
          </div>

          {itemsStatus === AsyncStatus.Error && itemsError ? (
            <ErrorBanner message={itemsError} onRetry={retryItems} />
          ) : itemsStatus === AsyncStatus.Loading ||
            itemsStatus === AsyncStatus.Idle ? (
            ITEM_SECTIONS.map((section) => (
              <div key={section.key} className="mb-12">
                <h3 className="text-xl font-bold text-dark flex items-center gap-2">
                  <section.icon className="w-5 h-5 text-primary" />
                  {section.title}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 mt-2">
                  {[1, 2].map((i) => (
                    <ItemCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            ITEM_SECTIONS.map((section) => {
              const sectionItems: DisplayItem[] = items[section.key] ?? [];
              if (sectionItems.length === 0) return null;

              return (
                <div key={section.key} className="mb-12">
                  <h3 className="text-xl font-bold text-dark flex items-center gap-2">
                    <section.icon className="w-5 h-5 text-primary" />
                    {section.title}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 mt-2">
                    {sectionItems.map((item, index) => (
                      <ItemCard
                        key={item.displayName}
                        item={item}
                        icon={section.icon}
                        index={index}
                        disabled={isPaymentLoading}
                        onPurchase={handlePurchaseItem}
                        colors={
                          ITEM_COLOR_CONFIG[
                            section.color as keyof typeof ITEM_COLOR_CONFIG
                          ]
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Payment Loading Overlay */}
      {isPaymentLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scale-in text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold text-dark mb-2">
              Preparing Payment
            </h3>
            <p className="text-sm text-dark-light/60">
              Connecting to eSewa. You&apos;ll be redirected shortly.
            </p>
          </div>
        </div>
      )}

      {/* Payment Error Toast */}
      {paymentError && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-xl shadow-red-500/10 border border-red-100 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <X className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-dark">Payment Failed</p>
              <p className="text-xs text-dark-light/60 mt-0.5">
                {paymentError}
              </p>
            </div>
            <button
              onClick={clearError}
              className="text-dark-light/40 hover:text-dark transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
