import { Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Subscriptions from "./components/Subscriptions";
import AboutUs from "./components/AboutUs";
import Safety from "./components/Safety";
import BlockReporting from "./components/BlockReporting";
import Footer from "./components/Footer";
import ScrollToSection from "./components/ScrollToSection";

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>
      <Navbar />
      <Hero />
      <Features />
      <Subscriptions />
      <AboutUs />
      <Safety />
      <BlockReporting />
      <Footer />
    </>
  );
}
