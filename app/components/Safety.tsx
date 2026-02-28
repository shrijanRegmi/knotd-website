import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Server,
  FileWarning,
} from "lucide-react";

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "Identity Verification",
    description:
      "Multi-step verification including photo verification and optional ID checks to ensure every user is who they claim to be.",
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All your messages and calls are protected with military-grade encryption. Your conversations stay private — always.",
  },
  {
    icon: Eye,
    title: "Privacy Controls",
    description:
      "Full control over who sees your profile, photos, and personal information. Hide your profile anytime with incognito mode.",
  },
  {
    icon: Server,
    title: "Secure Data Storage",
    description:
      "Your data is stored on secure, encrypted servers with regular security audits and compliance with global privacy regulations.",
  },
  {
    icon: Shield,
    title: "AI Moderation",
    description:
      "Our AI monitors for inappropriate content, scam attempts, and suspicious behavior — keeping the community safe 24/7.",
  },
  {
    icon: FileWarning,
    title: "Safety Resources",
    description:
      "Access in-app safety guides, tips for safe dating, and direct links to emergency services and support organizations.",
  },
];

export default function Safety() {
  return (
    <section
      id="safety"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark to-dark-light" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary-light/10 to-transparent rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white mb-4">
            <Shield className="w-3.5 h-3.5" />
            Safety First
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Your safety is our{" "}
            <span className="bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent">
              top priority
            </span>
          </h2>
          <p className="mt-5 text-lg text-white/50 leading-relaxed">
            We&apos;ve built multiple layers of protection so you can focus on
            what matters most — finding genuine connections.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center mb-5 group-hover:from-primary/30 group-hover:to-primary-light/30 transition-all">
                  <Icon className="w-6 h-6 text-primary-light" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-8 py-4 backdrop-blur-sm">
            <Lock className="w-5 h-5 text-primary-light" />
            <p className="text-sm text-white/70">
              Compliant with <span className="text-white font-medium">GDPR</span>,{" "}
              <span className="text-white font-medium">CCPA</span>, and{" "}
              <span className="text-white font-medium">SOC 2</span> standards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
