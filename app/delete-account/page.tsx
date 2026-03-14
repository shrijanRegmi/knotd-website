"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Loader2, CheckCircle, Trash2 } from "lucide-react";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  return (
    <>
      <Navbar />

      <main className="pt-40 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              Data & Privacy
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark tracking-tight">
              Request Account & Data Deletion
            </h1>
            <p className="mt-4 text-lg text-dark-light/70">
              <strong className="text-dark">Knotd</strong> — the developer and
              operator of the Knotd dating app — is committed to your privacy.
              You can request that your account and associated data be deleted
              at any time.
            </p>
          </div>

          {/* Steps - prominently featured */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary text-sm font-bold">
                1
              </span>
              Steps to Request Deletion
            </h2>
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                  1
                </span>
                <div>
                  <strong className="text-dark block mb-1">
                    In the Knotd app (recommended)
                  </strong>
                  <p className="text-dark-light/70 text-sm">
                    Open Knotd → Profile → Settings (or Account) → Delete
                    Account. Follow the on-screen steps to permanently delete
                    your account and request removal of your data.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                  2
                </span>
                <div>
                  <strong className="text-dark block mb-1">
                    Via this form (no app access)
                  </strong>
                  <p className="text-dark-light/70 text-sm">
                    If you cannot access the app, submit the form below using
                    the email address linked to your Knotd account. We will
                    verify your identity and process your deletion request.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                  3
                </span>
                <div>
                  <strong className="text-dark block mb-1">By email</strong>
                  <p className="text-dark-light/70 text-sm">
                    Email{" "}
                    <a
                      href="mailto:support@knotd-app.com"
                      className="text-primary hover:underline font-medium"
                    >
                      support@knotd-app.com
                    </a>{" "}
                    with the subject &quot;Account deletion request&quot; and
                    the email address associated with your Knotd account. We
                    will respond and complete the process within 30 days.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          {/* Data deleted vs kept + retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary text-sm font-bold">
                2
              </span>
              What We Delete vs Keep
            </h2>
            <div className="space-y-6 text-dark-light/70 text-sm">
              <div className="rounded-2xl bg-green-50/80 border border-green-200/80 p-6">
                <h3 className="font-semibold text-dark text-base mb-3 flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-green-600" />
                  Data we delete (or anonymize)
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Account information (name, email, phone, date of birth)
                  </li>
                  <li>
                    Profile information (photos, bio, interests, preferences)
                  </li>
                  <li>Verification data (e.g. selfie submissions)</li>
                  <li>Your messages and in-app communications</li>
                  <li>Location and usage data tied to your account</li>
                  <li>Device identifiers and log data associated with you</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-6">
                <h3 className="font-semibold text-dark text-base mb-3">
                  Data we may keep (limited cases)
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Legal & regulatory:</strong> Where we must retain
                    data to comply with law, regulations, or legal process.
                  </li>
                  <li>
                    <strong>Disputes & safety:</strong> To enforce our Terms,
                    resolve disputes, or protect the safety of users (e.g.
                    reports, bans).
                  </li>
                  <li>
                    <strong>Anonymized/aggregate:</strong> Data that no longer
                    identifies you may be retained for analytics and improving
                    our service.
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl bg-rose-50/50 border border-rose-100/80 p-6">
                <h3 className="font-semibold text-dark text-base mb-3">
                  Retention period
                </h3>
                <p>
                  After you request deletion, we will delete or anonymize your
                  personal information within{" "}
                  <strong className="text-dark">30 days</strong>. In cases where
                  we must keep data for legal or safety reasons, we retain it
                  only for as long as required and then delete or anonymize it.
                  Messages you sent to other users may remain visible in their
                  chat history, but your profile and identifying information
                  will no longer be shown.
                </p>
              </div>
            </div>
          </section>

          {/* Request form */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary text-sm font-bold">
                3
              </span>
              Submit a Deletion Request (no app access)
            </h2>
            <p className="text-dark-light/70 text-sm mb-6">
              Use this form if you cannot delete your account in the app. Enter
              the email address linked to your Knotd account. We will verify and
              process your request.
            </p>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white border border-rose-100/80 shadow-lg shadow-primary/5 p-6 sm:p-8"
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-dark mb-2"
              >
                Email address linked to your Knotd account
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-rose-200/80 px-4 py-3 text-dark placeholder:text-dark-light/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="mt-6 w-full rounded-full py-4 text-sm font-semibold gradient-bg text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting request...
                  </>
                ) : (
                  "Submit deletion request"
                )}
              </button>
            </form>
          </section>

          <div className="rounded-2xl bg-rose-50/50 border border-rose-100/80 p-6 text-sm text-dark-light/70">
            <p className="font-semibold text-dark mb-2">Knotd</p>
            <p>
              For more on how we handle your data, see our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . For general support, contact{" "}
              <a
                href="mailto:support@knotd-app.com"
                className="text-primary hover:underline"
              >
                support@knotd-app.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />

      {/* Success popup */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 animate-fade-in"
          onClick={() => setShowSuccess(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div
            className="bg-white rounded-3xl shadow-2xl border border-rose-100/80 p-8 sm:p-10 max-w-md w-full text-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6 animate-bounce-in">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2
              id="success-title"
              className="text-2xl font-bold text-dark mb-3"
            >
              Request received
            </h2>
            <p className="text-dark-light/60 mb-8">
              We&apos;ve received your account and data deletion request. We
              will verify your identity and process it within 30 days.
              You&apos;ll receive a confirmation email when it&apos;s complete.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full rounded-full py-4 text-sm font-semibold gradient-bg text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
