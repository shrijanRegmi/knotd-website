import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-18"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary-light/8 to-primary/8 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                The Dating App for Real Connections
              </span>
            </div>

            <h1 className="animate-fade-in-up text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-dark leading-[1.1]">
              Some Knots{" "}
              <span className="gradient-text">Don&apos;t Untie</span>
            </h1>

            <p className="animate-fade-in-up-delayed mt-6 text-lg sm:text-xl text-dark-light/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Find meaningful connections that last a lifetime. Knotd is
              designed for people who believe in love that endures.
            </p>

            <div className="animate-fade-in-up-delayed-2 mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#download"
                className="gradient-bg inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                App Store
              </a>
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-dark/10 bg-white px-8 py-4 text-base font-semibold text-dark hover:border-primary/30 hover:bg-rose-50 transition-all hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.834 1.64a1 1 0 010 1.726l-2.834 1.64-2.53-2.53 2.53-2.476zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                Google Play
              </a>
            </div>

            <div className="animate-fade-in-up-delayed-2 mt-12 flex items-center gap-8 justify-center lg:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold gradient-text">AI</p>
                <p className="text-xs text-dark-light/60 mt-1">Smart Matching</p>
              </div>
              <div className="w-px h-10 bg-dark/10" />
              <div className="text-center">
                <p className="text-2xl font-bold gradient-text">100%</p>
                <p className="text-xs text-dark-light/60 mt-1">
                  Verified Profiles
                </p>
              </div>
              <div className="w-px h-10 bg-dark/10" />
              <div className="text-center">
                <p className="text-2xl font-bold gradient-text">Free</p>
                <p className="text-xs text-dark-light/60 mt-1">To Get Started</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="animate-float relative">
              <div className="phone-mockup w-[280px] sm:w-[300px]">
                <div className="phone-mockup-inner">
                  <div className="phone-notch" />
                  <Image
                    src="/assets/screenshots/auth_screen.PNG"
                    alt="Knotd app screenshot"
                    width={300}
                    height={600}
                    className="w-full h-auto object-cover aspect-[9/19]"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -left-4 lg:left-8 animate-float-delayed">
              <div className="bg-white rounded-2xl shadow-xl shadow-primary/10 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-dark">It’s Official… You’re Knotted! 🎀</p>
                  <p className="text-[10px] text-dark-light/60">
                  You have a new connection
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 -right-2 lg:right-4 animate-float-delayed">
              <div className="bg-white rounded-2xl shadow-xl shadow-primary/10 p-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <Image
                    src="/assets/profile_pictures/female1.png"
                    alt="Person nearby"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                  <Image
                    src="/assets/profile_pictures/female2.png"
                    alt="Person nearby"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                  <Image
                    src="/assets/profile_pictures/female3.png"
                    alt="Person nearby"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  />
                </div>
                <p className="text-xs font-semibold text-dark">
                  People nearby
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-primary/40 hover:text-primary transition-colors"
      >
        <ArrowDown size={28} />
      </a>
    </section>
  );
}
