import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import TechStack from './components/TechStack';
import Portfolio from './components/Portfolio';
import PricingTiers from './components/PricingTiers';
import ContactDiscovery from './components/ContactDiscovery';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white font-sans antialiased selection:bg-purple-600/30 selection:text-white">
      {/* Dynamic blurred ambient lights for aesthetics */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Navigation Header */}
      <Navbar />

      {/* Hero & Immersive Lead Intake Section */}
      <Hero />

      {/* Services Section: Our Web & Digital Solutions */}
      <ServiceGrid />

      {/* Tech Stack Section: The Tools We Trust */}
      <TechStack />

      {/* Portfolio & Projects Section: Our Work */}
      <Portfolio />

      {/* Transparent Value-Driven Pricing Grid */}
      <PricingTiers />

      {/* High-Converting Expanded Contact & Discovery Grid */}
      <ContactDiscovery />

      {/* Social Verification & Client Testimonials */}
      <Testimonials />

      {/* Clean Rewritten Footer */}
      <Footer />
    </div>
  );
}
