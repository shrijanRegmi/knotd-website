"use client";

import { useRouter } from "next/navigation";
import { User, Heart, Zap, Eye, Star, Crown, Sparkles, LogOut } from "lucide-react";
import { useUser } from "@/app/context/UserContext";
import { useAuth } from "@/app/context/AuthContext";
import { SubscriptionTier } from "@/app/lib/api";

export default function UserProfile() {
  const router = useRouter();
  const { state } = useUser();
  const { logout } = useAuth();
  const { clearUser } = useUser();

  if (!state.user) return null;

  const handleLogout = () => {
    logout();
    clearUser();
    router.replace("/auth");
  };

  const {
    firstName,
    email,
    displayPictureUrl,
    subscriptionTier,
    likesRemaining,
    superLikesRemaining,
    seeWhoLikedYouRemaining,
  } = state.user;

  // Map subscription tier to display info
  const tierConfig = {
    [SubscriptionTier.Free]: {
      label: "Free",
      icon: Heart,
      gradient: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
    },
    [SubscriptionTier.Lightning]: {
      label: "Lightning",
      icon: Star,
      gradient: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-r from-amber-500 to-orange-500",
      textColor: "text-white",
    },
    [SubscriptionTier.UltraLightning]: {
      label: "Ultra Lightning",
      icon: Crown,
      gradient: "from-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
      textColor: "text-white",
    },
  };

  const currentTier =
    tierConfig[subscriptionTier] || tierConfig[SubscriptionTier.Free];
  const TierIcon = currentTier.icon;

  const quotaItems = [
    {
      label: "Likes",
      value: likesRemaining,
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      gradientFrom: "from-pink-500",
      gradientTo: "to-rose-500",
    },
    {
      label: "Super Likes",
      value: superLikesRemaining,
      icon: Zap,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      gradientFrom: "from-amber-500",
      gradientTo: "to-orange-500",
    },
    {
      label: "Reveals",
      value: seeWhoLikedYouRemaining,
      icon: Eye,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      gradientFrom: "from-purple-500",
      gradientTo: "to-indigo-500",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto mb-8 animate-fade-in-up">
      <div className="relative bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-6 sm:p-8 overflow-hidden">
        {/* Decorative gradient background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-full blur-3xl -z-0" />

        <div className="relative z-10">
          {/* User Info Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 pb-6 border-b border-rose-100/50">
            {/* Avatar */}
            <div className="relative">
              {displayPictureUrl ? (
                <img
                  src={displayPictureUrl}
                  alt={`${firstName}'s profile`}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg shadow-primary/30 border-4 border-white"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-primary/30 animate-float">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              )}
            </div>

            {/* Name & Email */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-1">
                Welcome back, <span className="gradient-text">{firstName}</span>
                !
              </h2>
              <p className="text-sm text-dark-light/60 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {email}
              </p>
            </div>

            {/* Subscription Tier Badge & Logout */}
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentTier.bgColor} ${currentTier.textColor} text-sm font-semibold shadow-md whitespace-nowrap`}
              >
                <TierIcon className="w-4 h-4" />
                {currentTier.label}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold transition-all duration-300 hover:shadow-md hover:scale-105 active:scale-95"
                title="Logout"
              >
                <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Quota Cards */}
          <div>
            <h3 className="text-sm font-semibold text-dark-light/60 uppercase tracking-wide mb-4">
              Your Remaining Quota
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {quotaItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-rose-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
                    </div>

                    {/* Value */}
                    <div className="mb-1">
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} bg-clip-text text-transparent`}
                      >
                        {item.value}
                      </span>
                    </div>

                    {/* Label */}
                    <p className="text-xs sm:text-sm font-medium text-dark-light/60">
                      {item.label}
                    </p>

                    {/* Hover effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary-light/0 group-hover:from-primary/5 group-hover:to-primary-light/5 transition-all duration-300 pointer-events-none" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional: Quick tip */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-2xl border border-primary/10">
            <p className="text-sm text-dark-light/70 text-center">
              💡 <span className="font-semibold">Pro Tip:</span> Your quotas
              reset based on your subscription plan.{" "}
              {currentTier.label === SubscriptionTier.Free
                ? "Upgrade for more!"
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
