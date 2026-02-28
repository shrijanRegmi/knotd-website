import { Check, Star, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started and explore what Knotd has to offer.",
    icon: Heart,
    features: [
      "10 likes per day",
      "Basic matching algorithm",
      "Text messaging",
      "Profile creation",
      "Limited discovery filters",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "$14.99",
    period: "per month",
    description: "Unlock powerful features to find your perfect match.",
    icon: Star,
    features: [
      "Unlimited likes",
      "Advanced AI matching",
      "See who liked you",
      "Priority messaging",
      "Advanced filters",
      "Read receipts",
      "Priority support",
    ],
    cta: "Go Premium",
    popular: true,
  },
  {
    name: "VIP",
    price: "$29.99",
    period: "per month",
    description: "The ultimate dating experience with exclusive perks.",
    icon: Crown,
    features: [
      "Everything in Premium",
      "Profile boost weekly",
      "Incognito mode",
      "Travel mode",
      "Exclusive events access",
      "Personal matchmaker",
      "Priority visibility",
      "VIP badge",
    ],
    cta: "Go VIP",
    popular: false,
  },
];

function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function Subscriptions() {
  return (
    <section
      id="subscriptions"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/40 to-white" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-dark tracking-tight">
            Find the plan that fits{" "}
            <span className="gradient-text">your journey</span>
          </h2>
          <p className="mt-5 text-lg text-dark-light/60 leading-relaxed">
            Whether you&apos;re just getting started or ready to go all in,
            we&apos;ve got a plan for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "gradient-bg text-white shadow-2xl shadow-primary/30 scale-[1.02] lg:scale-105"
                    : "bg-white border border-rose-100/80 hover:shadow-xl hover:shadow-primary/5"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-1 text-xs font-bold text-primary shadow-lg">
                      <Sparkle /> Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${plan.popular ? "bg-white/20" : "bg-primary/10"}`}
                  >
                    <Icon
                      className={`w-6 h-6 ${plan.popular ? "text-white" : "text-primary"}`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold ${plan.popular ? "text-white" : "text-dark"}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`mt-1 text-sm ${plan.popular ? "text-white/70" : "text-dark-light/60"}`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span
                    className={`text-4xl font-extrabold ${plan.popular ? "text-white" : "text-dark"}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ml-1 ${plan.popular ? "text-white/60" : "text-dark-light/40"}`}
                  >
                    /{plan.period}
                  </span>
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

                <button
                  className={`w-full rounded-full py-3.5 text-sm font-semibold transition-all hover:scale-105 ${
                    plan.popular
                      ? "bg-white text-primary shadow-lg hover:shadow-xl"
                      : "gradient-bg text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Sparkle() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}
