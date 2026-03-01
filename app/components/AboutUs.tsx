import Image from "next/image";
import { Heart, Shield, Sparkles, Lock } from "lucide-react";

const stats = [
  { icon: Heart, value: "Deep", label: "Meaningful Matches" },
  { icon: Shield, value: "Safe", label: "Verified Community" },
  { icon: Sparkles, value: "Smart", label: "AI-Powered Pairing" },
  { icon: Lock, value: "Private", label: "End-to-End Encrypted" },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Marcus Rivera",
    role: "CTO & Co-Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Emily Watson",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "David Park",
    role: "Head of AI",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces",
  },
];

export default function AboutUs() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              Our Story
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-dark tracking-tight">
              Built on the belief that{" "}
              <span className="gradient-text">love lasts</span>
            </h2>
            <div className="mt-6 space-y-4 text-base text-dark-light/60 leading-relaxed">
              <p>
                Knotd was born from a simple observation: modern dating apps
                prioritize quantity over quality. We saw people everywhere
                swiping endlessly, yet feeling more disconnected than ever.
              </p>
              <p>
                Founded in 2026, our mission is to create technology that fosters
                genuine human connection. We believe that when you tie a real
                knot with someone, it shouldn&apos;t come undone easily.
              </p>
              <p>
                Our team of relationship experts, AI engineers, and designers
                work together to build an experience that goes beyond surface
                level — helping you find someone who truly complements your life.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <Image
                src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=600&h=500&fit=crop"
                alt="Couple enjoying time together"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl shadow-primary/10 p-6">
              <p className="text-3xl font-bold gradient-text">Since 2026</p>
              <p className="text-sm text-dark-light/60 mt-1">
                Tying knots that last
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center rounded-3xl border border-rose-100/80 bg-gradient-to-b from-white to-rose-50/30 p-8 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-dark">{stat.value}</p>
                <p className="text-sm text-dark-light/60 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-dark tracking-tight">
              Meet the <span className="gradient-text">team</span>
            </h3>
            <p className="mt-4 text-base text-dark-light/60">
              The passionate people behind Knotd who believe in the power of
              meaningful relationships.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-xl group-hover:shadow-primary/10 transition-all group-hover:-translate-y-1">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-base font-semibold text-dark">
                  {member.name}
                </h4>
                <p className="text-sm text-dark-light/60">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
