import Navbar from "../../components/landing/Navbar";
import Hero from "../../components/landing/Hero";
import TrustedBy from "../../components/landing/TrustedBy";
import BentoFeatures from "../../components/landing/BentoFeatures";
import Features from "../../components/landing/Features";
import Testimonials from "../../components/landing/Testimonials";
import Pricing from "../../components/landing/Pricing";
import FAQ from "../../components/landing/FAQ";

function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustedBy />
      <BentoFeatures />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
    </div>
  );
}

export default Landing;
