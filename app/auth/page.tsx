"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useAuth, AuthStatus } from "@/app/context/AuthContext";
import { useUser } from "@/app/context/UserContext";

export default function AuthPage() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const router = useRouter();
  const { loginWithGoogle, state } = useAuth();
  const { loadUser, isAuthenticated: isUserAuthenticated, isLoading: isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && isUserAuthenticated) {
      router.replace("/premium");
    }
  }, [isUserAuthenticated, isUserLoading, router]);

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) return;
    const success = await loginWithGoogle(response.credential);
    if (success) {
      await loadUser();
      router.replace("/premium");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Animated background orbs */}
      <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-primary-light/8 to-primary/8 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-full blur-3xl glow-orb" />

      {/* Main auth container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Logo and header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-bg mb-6 shadow-xl shadow-primary/30 animate-float">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-dark mb-3">
            Welcome to <span className="gradient-text">Knotd</span>
          </h1>

          <p className="text-base text-dark-light/70 leading-relaxed">
            Find meaningful connections that last a lifetime
          </p>
        </div>

        {/* Auth card */}
        <div className="animate-fade-in-up-delayed bg-white rounded-3xl shadow-2xl shadow-primary/10 p-8 sm:p-10 backdrop-blur-sm border border-rose-100/50">
          <div>
            {/* Error message */}
            {state.error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 animate-fade-in-up">
                {state.error}
              </div>
            )}

            {/* Google Sign In Button */}
            <div
              className="auth-button group relative w-full rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onMouseEnter={() => setHoveredButton("google")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {/* Custom visual button */}
              <div className="pointer-events-none relative flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-dark/10 rounded-2xl font-semibold text-dark transition-all duration-300 group-hover:border-primary/30 group-hover:bg-rose-50 group-hover:shadow-lg group-hover:shadow-primary/20">
                {state.status === AuthStatus.Loading ? (
                  <svg
                    className="w-5 h-5 animate-spin text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <div className="relative flex items-center justify-center w-6 h-6">
                    <svg
                      className="w-6 h-6 transition-transform duration-300 group-hover:rotate-[-10deg] group-hover:scale-110"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>

                    {/* Animated ring on hover */}
                    <div
                      className={`absolute inset-0 rounded-full border-2 border-primary/40 transition-all duration-500 ${
                        hoveredButton === "google"
                          ? "scale-150 opacity-0"
                          : "scale-100 opacity-0"
                      }`}
                    />
                  </div>
                )}

                <span className="text-base">
                  {state.status === AuthStatus.Loading
                    ? "Signing in..."
                    : "Continue with Google"}
                </span>

                {/* Shine effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/40 to-transparent transition-opacity duration-300 ${
                    hoveredButton === "google"
                      ? "opacity-100 animate-shine"
                      : "opacity-0"
                  }`}
                />
              </div>

              {/* Invisible GoogleLogin overlay — captures clicks and returns id_token */}
              <div
                className={`absolute inset-0 z-10 flex items-center justify-center overflow-hidden rounded-2xl cursor-pointer ${
                  state.status === AuthStatus.Loading ? "pointer-events-none" : ""
                }`}
                style={{ opacity: 0.01 }}
              >
                <div
                  style={{
                    transform: "scale(3)",
                    transformOrigin: "center center",
                  }}
                >
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {}}
                    size="large"
                    width={200}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-dark-light/60">
                  or
                </span>
              </div>
            </div>

            {/* Apple Sign In Button */}
            <button
              className="auth-button group relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-dark border-2 border-dark rounded-2xl font-semibold text-white transition-all duration-300 hover:bg-dark-light hover:border-dark-light hover:shadow-lg hover:shadow-dark/40 hover:scale-[1.02] active:scale-[0.98]"
              onMouseEnter={() => setHoveredButton("apple")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <div className="relative flex items-center justify-center w-6 h-6">
                <svg
                  className="w-6 h-6 transition-transform duration-300 group-hover:rotate-[10deg] group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>

                {/* Animated ring on hover */}
                <div
                  className={`absolute inset-0 rounded-full border-2 border-white/60 transition-all duration-500 ${
                    hoveredButton === "apple"
                      ? "scale-150 opacity-0"
                      : "scale-100 opacity-0"
                  }`}
                />
              </div>

              <span className="text-base">Continue with Apple</span>

              {/* Shine effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 ${
                  hoveredButton === "apple"
                    ? "opacity-100 animate-shine"
                    : "opacity-0"
                }`}
              />
            </button>
          </div>

          {/* Terms and privacy */}
          <p className="mt-8 text-xs text-center text-dark-light/50 leading-relaxed">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="text-primary hover:text-primary-light transition-colors underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-primary hover:text-primary-light transition-colors underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Floating hearts decoration */}
        <div className="absolute -top-20 left-10 animate-float opacity-30">
          <svg
            className="w-12 h-12 text-primary"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="absolute -bottom-10 right-10 animate-float-delayed opacity-20">
          <svg
            className="w-16 h-16 text-primary-light"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="absolute top-1/3 -right-5 animate-float opacity-25">
          <svg
            className="w-10 h-10 text-primary"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="absolute top-1/4 -left-8 animate-float-delayed opacity-15">
          <svg
            className="w-14 h-14 text-primary-light"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* Floating particles */}
      <div className="particle particle-1" />
      <div className="particle particle-2" />
      <div className="particle particle-3" />
      <div className="particle particle-4" />
      <div className="particle particle-5" />
      <div className="particle particle-6" />
    </div>
  );
}
