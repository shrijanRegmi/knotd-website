import { Ban, Flag, AlertTriangle, Clock, ShieldCheck, Headphones } from "lucide-react";

const steps = [
  {
    icon: Flag,
    step: "01",
    title: "Report or Block",
    description:
      "Tap the menu on any profile or conversation to instantly report or block a user. It takes just two taps.",
  },
  {
    icon: AlertTriangle,
    step: "02",
    title: "We Investigate",
    description:
      "Our safety team reviews every report carefully. AI-assisted analysis helps us respond quickly and accurately.",
  },
  {
    icon: Clock,
    step: "03",
    title: "Swift Action",
    description:
      "Depending on severity, we take immediate action — from warnings to permanent bans. Most reports are resolved within 24 hours.",
  },
  {
    icon: ShieldCheck,
    step: "04",
    title: "You Stay Protected",
    description:
      "Blocked users can never contact you again or see your profile. Your peace of mind is guaranteed.",
  },
];

const reportReasons = [
  "Inappropriate content",
  "Fake profile / Catfishing",
  "Harassment or bullying",
  "Spam or scam",
  "Underage user",
  "Threatening behavior",
];

export default function BlockReporting() {
  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            <Ban className="w-3.5 h-3.5" />
            Block & Report
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark tracking-tight">
            You&apos;re always in{" "}
            <span className="gradient-text">control</span>
          </h2>
          <p className="mt-5 text-lg text-dark-light/60 leading-relaxed">
            If someone makes you uncomfortable, you can block or report them
            instantly. Here&apos;s how we handle it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-3xl border border-rose-100/80 bg-gradient-to-b from-white to-rose-50/20 p-8 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-5xl font-extrabold text-primary/10 absolute top-4 right-6">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-dark-light/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl bg-gradient-to-b from-rose-50 to-white border border-rose-100/80 p-10">
            <h3 className="text-2xl font-bold text-dark mb-2">
              Report categories
            </h3>
            <p className="text-sm text-dark-light/60 mb-6">
              Select the reason that best describes the issue. You can also add
              additional details.
            </p>
            <div className="space-y-3">
              {reportReasons.map((reason) => (
                <div
                  key={reason}
                  className="flex items-center gap-3 rounded-2xl bg-white border border-rose-100/60 px-5 py-3.5 hover:border-primary/30 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full gradient-bg" />
                  </div>
                  <span className="text-sm font-medium text-dark/80">
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-rose-100/80 bg-white p-8 hover:shadow-lg hover:shadow-primary/5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-dark mb-2">
                    24/7 Support Team
                  </h4>
                  <p className="text-sm text-dark-light/60 leading-relaxed">
                    Our dedicated safety team is available around the clock. If
                    you&apos;re in an emergency situation, we provide direct
                    links to local authorities and support services.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-100/80 bg-white p-8 hover:shadow-lg hover:shadow-primary/5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-dark mb-2">
                    Zero Tolerance Policy
                  </h4>
                  <p className="text-sm text-dark-light/60 leading-relaxed">
                    We maintain a strict zero-tolerance policy for harassment,
                    hate speech, and any form of abuse. Violators are permanently
                    banned from the platform — no exceptions.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-100/80 bg-white p-8 hover:shadow-lg hover:shadow-primary/5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Ban className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-dark mb-2">
                    Discreet & Confidential
                  </h4>
                  <p className="text-sm text-dark-light/60 leading-relaxed">
                    When you block or report someone, they are never notified.
                    Your identity remains completely confidential throughout the
                    process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
