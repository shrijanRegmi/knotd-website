"use client";

import { Suspense, useEffect, useRef, useReducer, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, Loader2, AlertCircle, ArrowLeft, Sparkles } from "lucide-react";
import { completeEsewaPayment, type EsewaCompleteResponse } from "@/app/lib/api";
import { useUser } from "@/app/context/UserContext";

type State =
  | { step: "verifying" }
  | { step: "success"; data: EsewaCompleteResponse }
  | { step: "error"; message: string };

type Action =
  | { type: "SUCCESS"; data: EsewaCompleteResponse }
  | { type: "ERROR"; message: string }
  | { type: "RETRY" };

function reducer(_state: State, action: Action): State {
  switch (action.type) {
    case "SUCCESS":
      return { step: "success", data: action.data };
    case "ERROR":
      return { step: "error", message: action.message };
    case "RETRY":
      return { step: "verifying" };
  }
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function FullPageSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-sm text-dark-light/60 font-medium">Loading...</p>
      </div>
    </div>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loadUser } = useUser();
  const calledRef = useRef(false);
  const [state, dispatch] = useReducer(reducer, { step: "verifying" });

  const data = searchParams.get("data");

  const verify = useCallback(async () => {
    if (!data) {
      dispatch({ type: "ERROR", message: "Missing payment data. The redirect from eSewa may have been incomplete." });
      return;
    }

    try {
      const result = await completeEsewaPayment(data);
      dispatch({ type: "SUCCESS", data: result });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment verification failed";
      dispatch({ type: "ERROR", message });
    }
  }, [data]);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    verify();
  }, [verify]);

  const handleRetry = () => {
    calledRef.current = false;
    dispatch({ type: "RETRY" });
    verify();
  };

  const handleContinue = () => {
    loadUser();
    router.replace("/premium");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-primary-light/5 to-primary/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative w-full max-w-lg">
        {state.step === "verifying" && <VerifyingCard />}
        {state.step === "success" && (
          <SuccessCard data={state.data} onContinue={handleContinue} />
        )}
        {state.step === "error" && (
          <ErrorCard message={state.message} onRetry={handleRetry} onBack={() => router.replace("/premium")} />
        )}
      </div>
    </div>
  );
}

function VerifyingCard() {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-8 sm:p-10 text-center animate-fade-in-up">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
      <h1 className="text-2xl font-bold text-dark mb-3">Verifying Payment</h1>
      <p className="text-dark-light/60">
        Please wait while we confirm your payment with eSewa. This should only take a moment.
      </p>
    </div>
  );
}

function SuccessCard({
  data,
  onContinue,
}: {
  data: EsewaCompleteResponse;
  onContinue: () => void;
}) {
  const isSubscription = !!data.subscription;

  return (
    <div className="relative bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-8 sm:p-10 text-center animate-scale-in overflow-hidden">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-bg mb-6 animate-bounce-in">
        <Check className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-2xl font-bold text-dark mb-2">Payment Successful!</h1>
      <p className="text-dark-light/60 mb-6">
        Your payment has been verified and processed.
      </p>

      <div className="bg-rose-50/80 rounded-2xl p-5 mb-6 text-left space-y-3">
        {isSubscription && data.subscription && (
          <>
            <DetailRow label="Plan" value={data.subscription.plan?.displayName ?? data.subscription.planId} />
            <DetailRow label="Billing" value={data.subscription.billingCycle} />
            <DetailRow label="Status" value={data.subscription.status} highlight />
            <DetailRow label="Expires" value={new Date(data.subscription.expiresAt).toLocaleDateString()} />
          </>
        )}
        {!isSubscription && data.purchase && (
          <>
            <DetailRow label="Item" value={data.purchase.item?.displayName ?? data.purchase.itemId} />
            <DetailRow label="Quantity" value={String(data.purchase.quantity)} />
          </>
        )}
        <DetailRow label="Transaction" value={data.payment.esewaRefId || data.payment.transactionUuid} />
      </div>

      <button
        onClick={onContinue}
        className="w-full rounded-full py-4 text-sm font-semibold gradient-bg text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95"
      >
        <span className="inline-flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Continue
        </span>
      </button>

      <div className="confetti confetti-1" />
      <div className="confetti confetti-2" />
      <div className="confetti confetti-3" />
      <div className="confetti confetti-4" />
      <div className="confetti confetti-5" />
      <div className="confetti confetti-6" />
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
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
        <AlertCircle className="w-10 h-10 text-red-400" />
      </div>

      <h1 className="text-2xl font-bold text-dark mb-3">Verification Failed</h1>
      <p className="text-dark-light/60 mb-6">{message}</p>

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

function DetailRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-dark-light/60">{label}</span>
      <span
        className={`text-sm font-semibold capitalize ${
          highlight ? "text-green-600" : "text-dark"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
