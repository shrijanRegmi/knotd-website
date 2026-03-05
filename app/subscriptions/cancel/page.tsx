"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Crown,
  Loader2,
  X,
  CheckCircle,
} from "lucide-react";
import {
  fetchActiveSubscription,
  cancelSubscription,
  type UserSubscription,
} from "@/app/lib/api";
import { useUser } from "@/app/context/UserContext";

type PageState =
  | { step: "loading" }
  | { step: "no-subscription" }
  | { step: "confirm"; subscription: UserSubscription }
  | { step: "cancelling"; subscription: UserSubscription }
  | { step: "success"; subscription: UserSubscription }
  | { step: "error"; message: string; subscription?: UserSubscription };

export default function CancelSubscriptionPage() {
  const router = useRouter();
  const { loadUser } = useUser();
  const [state, setState] = useState<PageState>({ step: "loading" });

  const loadSubscription = useCallback(async () => {
    try {
      const subscription = await fetchActiveSubscription();
      if (!subscription) {
        setState({ step: "no-subscription" });
      } else {
        setState({ step: "confirm", subscription });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load subscription";
      setState({ step: "error", message });
    }
  }, []);

  useEffect(() => {
    loadSubscription();
  }, [loadSubscription]);

  const handleCancel = async (subscription: UserSubscription) => {
    setState({ step: "cancelling", subscription });
    try {
      const result = await cancelSubscription();
      setState({ step: "success", subscription: result.subscription });
      loadUser();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to cancel subscription";
      setState({ step: "error", message, subscription });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-primary-light/5 to-primary/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => router.push("/premium")}
            className="inline-flex items-center gap-2 text-sm text-dark-light/60 hover:text-dark transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Premium
          </button>

          {state.step === "loading" && <LoadingCard />}
          {state.step === "no-subscription" && (
            <NoSubscriptionCard onBack={() => router.push("/premium")} />
          )}
          {state.step === "confirm" && (
            <ConfirmCard
              subscription={state.subscription}
              onCancel={() => handleCancel(state.subscription)}
              onBack={() => router.push("/premium")}
            />
          )}
          {state.step === "cancelling" && (
            <CancellingCard subscription={state.subscription} />
          )}
          {state.step === "success" && (
            <SuccessCard
              subscription={state.subscription}
              onContinue={() => router.push("/premium")}
            />
          )}
          {state.step === "error" && (
            <ErrorCard
              message={state.message}
              onRetry={() =>
                state.subscription
                  ? handleCancel(state.subscription)
                  : loadSubscription()
              }
              onBack={() => router.push("/premium")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-8 sm:p-10 text-center animate-fade-in-up">
      <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
      <p className="text-dark-light/60">Loading your subscription...</p>
    </div>
  );
}

function NoSubscriptionCard({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-8 sm:p-10 text-center animate-fade-in-up">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
        <AlertTriangle className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-dark mb-3">
        No Active Subscription
      </h1>
      <p className="text-dark-light/60 mb-8">
        You don&apos;t have an active subscription to cancel. Your account is
        currently on the free plan.
      </p>
      <button
        onClick={onBack}
        className="w-full rounded-full py-4 text-sm font-semibold gradient-bg text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95"
      >
        Back to Premium
      </button>
    </div>
  );
}

function ConfirmCard({
  subscription,
  onCancel,
  onBack,
}: {
  subscription: UserSubscription;
  onCancel: () => void;
  onBack: () => void;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-8 sm:p-10 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-dark mb-3">
          Cancel Subscription?
        </h1>
        <p className="text-dark-light/60">
          Are you sure you want to cancel your subscription? You&apos;ll lose
          access to premium features.
        </p>
      </div>

      <div className="bg-rose-50/80 rounded-2xl p-6 mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-dark-light/60">Current Plan</p>
            <p className="text-lg font-bold text-dark">
              {subscription.plan.displayName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-rose-100">
          <div>
            <p className="text-xs text-dark-light/60 mb-1">Billing Cycle</p>
            <p className="text-sm font-semibold text-dark capitalize">
              {subscription.billingCycle}
            </p>
          </div>
          <div>
            <p className="text-xs text-dark-light/60 mb-1">Price</p>
            <p className="text-sm font-semibold text-dark">
              {subscription.plan.currency}{" "}
              {subscription.billingCycle === "monthly"
                ? (subscription.plan.monthlyPrice ?? 0) / 100
                : (subscription.plan.weeklyPrice ?? 0) / 100}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-4 border-t border-rose-100">
          <Calendar className="w-4 h-4 text-dark-light/60 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-dark-light/60 mb-1">Access Until</p>
            <p className="text-sm font-semibold text-dark">
              {new Date(subscription.expiresAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="text-xs text-dark-light/60 mt-1">
              You&apos;ll retain access to premium features until this date.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8">
        <p className="text-sm text-amber-900">
          <strong>Note:</strong> Cancelling will prevent future charges, but
          you&apos;ll keep your premium benefits until{" "}
          {new Date(subscription.expiresAt).toLocaleDateString()}.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onCancel}
          className="w-full rounded-full py-4 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all hover:scale-105 active:scale-95"
        >
          Yes, Cancel Subscription
        </button>
        <button
          onClick={onBack}
          className="w-full rounded-full py-4 text-sm font-semibold bg-rose-50 text-dark-light hover:bg-rose-100 transition-all hover:scale-105 active:scale-95"
        >
          Keep Subscription
        </button>
      </div>
    </div>
  );
}

function CancellingCard({ subscription }: { subscription: UserSubscription }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-8 sm:p-10 text-center animate-fade-in-up">
      <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
      <h1 className="text-xl font-bold text-dark mb-2">
        Cancelling Subscription
      </h1>
      <p className="text-dark-light/60">
        Processing your cancellation for {subscription.plan.displayName}...
      </p>
    </div>
  );
}

function SuccessCard({
  subscription,
  onContinue,
}: {
  subscription: UserSubscription;
  onContinue: () => void;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-8 sm:p-10 text-center animate-scale-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6 animate-bounce-in">
        <CheckCircle className="w-8 h-8 text-green-500" />
      </div>

      <h1 className="text-2xl font-bold text-dark mb-3">
        Subscription Cancelled
      </h1>
      <p className="text-dark-light/60 mb-8">
        Your subscription has been cancelled successfully. You&apos;ll continue
        to have access to premium features until{" "}
        <strong>
          {new Date(subscription.expiresAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </strong>
        .
      </p>

      <button
        onClick={onContinue}
        className="w-full rounded-full py-4 text-sm font-semibold gradient-bg text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95"
      >
        Back to Premium
      </button>
    </div>
  );
}

function ErrorCard({
  message,
  onRetry,
  onBack,
}: {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-8 sm:p-10 text-center animate-fade-in-up">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
        <X className="w-8 h-8 text-red-400" />
      </div>

      <h1 className="text-2xl font-bold text-dark mb-3">Cancellation Failed</h1>
      <p className="text-dark-light/60 mb-8">{message}</p>

      <div className="flex flex-col gap-3">
        <button
          onClick={onRetry}
          className="w-full rounded-full py-4 text-sm font-semibold gradient-bg text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95"
        >
          Try Again
        </button>
        <button
          onClick={onBack}
          className="w-full rounded-full py-4 text-sm font-semibold bg-rose-50 text-dark-light hover:bg-rose-100 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Premium
        </button>
      </div>
    </div>
  );
}
