"use client";

import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function PaymentFailurePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-primary-light/5 to-primary/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-xl shadow-primary/10 border border-rose-100/50 p-8 sm:p-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-6">
            <XCircle className="w-10 h-10 text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-dark mb-3">Payment Failed</h1>
          <p className="text-dark-light/60 mb-8">
            Your payment was not completed. This could happen if the transaction
            was cancelled or if there was an issue with eSewa. No charges have
            been made to your account.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.replace("/premium")}
              className="w-full rounded-full py-4 text-sm font-semibold gradient-bg text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={() => router.replace("/")}
              className="w-full rounded-full py-4 text-sm font-semibold bg-rose-50 text-dark-light hover:bg-rose-100 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
