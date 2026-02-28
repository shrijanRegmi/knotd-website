import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Subscriptions from "./components/Subscriptions";
import AboutUs from "./components/AboutUs";
import Safety from "./components/Safety";
import BlockReporting from "./components/BlockReporting";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
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
