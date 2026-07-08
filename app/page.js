"use client";

import React, { useState, useEffect } from 'react';
import { 
  Laptop, 
  Database, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Layers, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Check, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Loader2, 
  Zap, 
  Building, 
  User, 
  ChevronRight,
  ExternalLink,
  Code
} from 'lucide-react';

export default function Home() {
  // Client Lead Intake Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    industry: 'medical_clinic',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [blueprint, setBlueprint] = useState(null);

  // Selected Features for Estimator Widget
  const [selectedFeatures, setSelectedFeatures] = useState([
    'online_booking',
    'mobile_ready'
  ]);

  const featuresList = [
    { id: 'mobile_ready', label: '📱 Mobile-Friendly Design', desc: 'Looks stunning on all phones', duration: 1 },
    { id: 'online_booking', label: '📅 Easy Booking System', desc: 'Customers book slots online', duration: 3 },
    { id: 'whatsapp_alerts', label: '💬 WhatsApp/SMS Alerts', desc: 'Sends automatic text confirmations', duration: 2 },
    { id: 'online_payments', label: '💳 Safe Online Payments', desc: 'Accept cards, GPay, UPI directly', duration: 2 },
    { id: 'ai_assistant', label: '🤖 Smart AI Assistant Chatbot', desc: 'Answers questions 24/7 for you', duration: 3 },
    { id: 'admin_dashboard', label: '📊 Admin Dashboard', desc: 'See your customers & orders in one place', duration: 3 }
  ];

  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      if (selectedFeatures.length > 1) {
        setSelectedFeatures(selectedFeatures.filter(f => f !== id));
      }
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const calculateEstimation = () => {
    let totalDays = 5;
    featuresList.forEach(f => {
      if (selectedFeatures.includes(f.id)) {
        totalDays += f.duration;
      }
    });
    return {
      days: totalDays,
      complexity: totalDays <= 8 ? 'Simple & Quick' : totalDays <= 12 ? 'Highly Interactive' : 'Advanced Automation Portal'
    };
  };

  const estimation = calculateEstimation();

  // Pricing Toggle State
  const [pricingPeriod, setPricingPeriod] = useState('project');

  // Interactive ROI Calculator States
  const [customerValue, setCustomerValue] = useState(150);
  const [missedCalls, setMissedCalls] = useState(5);

  const closeRate = 0.40;
  const monthlyRecapturedRevenue = Math.round(missedCalls * 4 * closeRate * customerValue);
  const annualRecapturedRevenue = monthlyRecapturedRevenue * 12;

  // Cal.com embed loader
  useEffect(() => {
    (async function () {
      const cal = (await import("@calcom/embed")).default;
      const calInstance = cal();
      calInstance("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#7C3AED" }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const featuresLabelList = featuresList
      .filter(f => selectedFeatures.includes(f.id))
      .map(f => f.label)
      .join(', ');

    const detailedDescription = `[Selected Features: ${featuresLabelList}] - ${formData.description}`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          description: detailedDescription
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMsg('Your project discovery request was received successfully! We have securely logged your details.');
        setBlueprint({
          analysis: `Based on your request, we recommend a custom React-powered responsive design engineered with secure data-capturing workflows. Your estimated development cycle is ${estimation.days} days.`,
          suggestedModules: ['Responsive Core Web App', 'Cal.com Integrations', 'Supabase Database Cluster sync'],
          estimatedRoi: '40% Customer Conversion Lift'
        });
      } else {
        setError(result.error || 'Connection failed. Please verify your API endpoint configuration.');
      }
    } catch (err) {
      setError('An error occurred. Check that your Next.js server is online and has SUPABASE_URL configured correctly.');
    } finally {
      setLoading(false);
    }
  };

  // Razorpay Checkout comments handler
  const handleRazorpayCheckout = (pkgName, amount) => {
    /*
    // PRODUCTION RAZORPAY FRONTEND INTEGRATION:
    // To trigger Razorpay checkout natively on Vercel:
    // 1. Add script src="https://checkout.razorpay.com/v1/checkout.js" to your layout.js
    // 2. Call your internal API to create a secure Order ID: /api/orders
    // 3. Open the Razorpay checkout overlay with the generated Order ID and capture payment signatures.
    
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      amount: amount * 100, // in paise
      currency: "USD",
      name: "AI Craft Studio",
      description: `Premium Package: ${pkgName}`,
      image: "https://yourdomain.com/logo.png",
      order_id: "order_generated_from_backend", // Must fetch dynamic Order ID from route
      handler: function (response) {
        alert("Payment captured successfully! Payment ID: " + response.razorpay_payment_id);
        // Verify payment signature on backend /api/payment/verify
      },
      prefill: {
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        contact: "+919876543210"
      },
      theme: {
        color: "#7C3AED"
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    */
    alert(`Razorpay checkout initialization triggered for ${pkgName} ($${amount}). Complete sandbox credential binding in your environment settings menu.`);
  };

  const handleScrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#0B0B0F] min-h-screen text-white font-sans antialiased selection:bg-[#7C3AED]/30 selection:text-white relative overflow-hidden">
      
      {/* 1. STRUCTURAL JSON-LD SEO PROFESSIONAL SERVICE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "AI Craft Studio",
            "image": "https://qusnaralxyxsqlmtkcsj.supabase.co/storage/v1/object/public/assets/logo.png",
            "@id": "https://qusnaralxyxsqlmtkcsj.supabase.co/rest/v1/",
            "url": "https://qusnaralxyxsqlmtkcsj.supabase.co",
            "telephone": "+919876543210",
            "priceRange": "$1499-$3499",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Mira Road East",
              "addressLocality": "Mumbai",
              "addressRegion": "Maharashtra",
              "postalCode": "401107",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 19.2812,
              "longitude": 72.8554
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "09:00",
              "closes": "21:00"
            },
            "sameAs": [
              "https://github.com/AI-Craft-Studio"
            ],
            "description": "Premium Full-Stack Web Development, Responsive Web Design, Enterprise Web Apps, and Custom Gemini AI Automation Solutions."
          })
        }}
      />

      {/* Decorative ambient background spots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[#7C3AED]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#7C3AED]/3 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-[#0B0B0F]/85 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* SVG Tech-Layer Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => handleScrollToId('hero')}>
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#7C3AED] to-indigo-600 rounded-xl shadow-lg shadow-[#7C3AED]/20">
              <svg className="w-5.5 h-5.5 text-white stroke-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-.91-8.024-2.468m16.048 0c-.243 1.083-.755 2.062-1.464 2.862m-11.666-2.862a9.004 9.004 0 001.464 2.862" />
              </svg>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#7C3AED] to-indigo-600 blur opacity-30 group-hover:opacity-50 transition duration-300" />
            </div>
            <div>
              <span className="font-sans font-black text-base text-white tracking-tight uppercase group-hover:text-[#7C3AED] transition-colors">
                AI CRAFT <span className="text-slate-400 font-normal">Studio</span>
              </span>
              <span className="text-[9px] font-mono block text-[#7C3AED] tracking-wider uppercase font-bold -mt-1">Full-Stack Cloud Core</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-slate-400">
            <button onClick={() => handleScrollToId('services')} className="hover:text-white transition-colors cursor-pointer">SERVICES</button>
            <button onClick={() => handleScrollToId('tech-marquee')} className="hover:text-white transition-colors cursor-pointer">TECH BADGES</button>
            <button onClick={() => handleScrollToId('portfolio')} className="hover:text-white transition-colors cursor-pointer">PORTFOLIO</button>
            <button onClick={() => handleScrollToId('pricing')} className="hover:text-white transition-colors cursor-pointer">PRICING</button>
            <button onClick={() => handleScrollToId('book-call')} className="hover:text-white transition-colors cursor-pointer">SCHEDULE CALL</button>
            <button onClick={() => handleScrollToId('contact')} className="hover:text-white transition-colors cursor-pointer">GET PROPOSAL</button>
          </nav>

          {/* Action CTA */}
          <div>
            <button 
              onClick={() => handleScrollToId('contact')}
              className="px-4 py-2 bg-[#7C3AED]/10 hover:bg-[#7C3AED] border border-[#7C3AED]/30 hover:border-[#7C3AED] text-[#7C3AED] hover:text-white rounded-lg text-xs font-mono font-bold tracking-wide transition-all duration-200 cursor-pointer"
            >
              FREE DRAFT PROPOSAL
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="py-20 md:py-32 px-6 relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7C3AED]/20 bg-[#7C3AED]/5 text-[#7C3AED] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" /> PRODUCTION-READY FULL-STACK WEBSITES
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black font-sans text-white tracking-tight leading-[1.05]">
              We Build Premium Websites That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-fuchsia-500">Auto-Generate</span> Revenue
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              We design, construct, and fully host elite custom React and Next.js applications natively linked to serverless Supabase databases and custom automation pipelines. Expand your digital client reach today.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => handleScrollToId('contact')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#7C3AED] to-indigo-600 hover:from-[#7C3AED] hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-[#7C3AED]/20 hover:shadow-indigo-500/20 active:scale-[0.99] transition-all cursor-pointer"
              >
                Inquire & Get Free Draft <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollToId('pricing')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold text-sm rounded-xl transition cursor-pointer"
              >
                Explore Pricing Grid
              </button>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-900 max-w-md">
              <div>
                <span className="block text-2xl font-black text-white font-mono">100%</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Supabase Native</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white font-mono">&lt; 1s</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Lighthouse Load</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white font-mono">24/7</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">AI Support Flow</span>
              </div>
            </div>
          </div>

          {/* Hero Right Interactive Estimator */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-indigo-600 rounded-2xl blur opacity-20" />
            <div className="relative p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0F0F16]/90 shadow-2xl">
              
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded bg-[#7C3AED]/10 text-[#7C3AED]">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Live Interactive Web Planner</h3>
                  <p className="text-[10px] text-slate-400">Select standard modules to calculate estimated days</p>
                </div>
              </div>

              {/* Feature checkboxes */}
              <div className="space-y-2 mt-4">
                {featuresList.map(feature => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        isChecked 
                          ? 'bg-[#7C3AED]/10 border-[#7C3AED]/40 text-white' 
                          : 'bg-slate-950 border-slate-900/60 text-slate-400 hover:border-slate-800'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition ${
                        isChecked ? 'bg-[#7C3AED] border-[#7C3AED] text-white' : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3px]" />}
                      </div>
                      <div>
                        <span className="text-xs font-semibold block">{feature.label}</span>
                        <span className="text-[9px] text-slate-500 block leading-tight mt-0.5">{feature.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Running estimate output */}
              <div className="mt-5 pt-4 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono">
                <div>
                  <span className="text-slate-500 block uppercase text-[9px]">Estimated Launch</span>
                  <span className="text-white font-bold text-xs flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#7C3AED]" /> ~{estimation.days} Business Days
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block uppercase text-[9px]">Scale Category</span>
                  <span className="text-[#7C3AED] font-bold block text-[10px] mt-1">{estimation.complexity}</span>
                </div>
              </div>

              <button
                onClick={() => handleScrollToId('contact')}
                className="w-full mt-5 py-3 bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white rounded-xl text-xs font-bold transition shadow-md shadow-[#7C3AED]/20 cursor-pointer text-center block"
              >
                Incorporate Plan In Proposal Form
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES GRID SECTION */}
      <section id="services" className="py-24 border-t border-slate-950 bg-[#07070A] relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="px-3 py-1 text-xs font-mono font-bold text-[#7C3AED] bg-[#7C3AED]/10 rounded-full border border-[#7C3AED]/20">
              OUR SERVICE DEPLOYMENTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
              Web Design Engineered for Modern Conversions
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-3">
              We eliminate typical template builders. Every system is bespoke, lighting fast on mobile devices, and designed specifically to capture inbound business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Custom Web Design Card */}
            <div className="p-8 rounded-2xl border border-slate-900 bg-[#12121A]/40 flex flex-col justify-between hover:border-[#7C3AED]/30 transition group">
              <div>
                <div className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 text-purple-400 w-fit">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mt-6 group-hover:text-[#7C3AED] transition-colors">
                  Custom Web Design
                </h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Stunning, high-end visual presence. Coded fully by hand with lightning-fast load times, semantic local SEO schemas, and bespoke CSS layers designed to represent your high-ticket value.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-500">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" /> Full Mobile Responsiveness</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" /> SEO Optimization Schema</li>
                </ul>
              </div>
              <button onClick={() => handleScrollToId('contact')} className="mt-8 text-xs font-mono font-bold text-[#7C3AED] flex items-center gap-1 hover:underline text-left">
                Discuss Layout <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Enterprise Web Apps Card */}
            <div className="p-8 rounded-2xl border border-slate-900 bg-[#12121A]/40 flex flex-col justify-between hover:border-[#7C3AED]/30 transition group">
              <div>
                <div className="p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 w-fit">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mt-6 group-hover:text-[#7C3AED] transition-colors">
                  Enterprise Applications
                </h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Secure serverless solutions wired with live Supabase Postgres schemas, interactive appointment schedulers, Razorpay payment capture nodes, and custom admin dashboard centers.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-500">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" /> Supabase Realtime Storage</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" /> Razorpay Native Payments</li>
                </ul>
              </div>
              <button onClick={() => handleScrollToId('contact')} className="mt-8 text-xs font-mono font-bold text-[#7C3AED] flex items-center gap-1 hover:underline text-left">
                Discuss Database Sync <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* AI Automation Upgrades Card */}
            <div className="p-8 rounded-2xl border border-slate-900 bg-[#12121A]/40 flex flex-col justify-between hover:border-[#7C3AED]/30 transition group">
              <div>
                <div className="p-3.5 rounded-xl border border-fuchsia-500/20 bg-fuchsia-500/5 text-fuchsia-400 w-fit">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mt-6 group-hover:text-[#7C3AED] transition-colors">
                  Future-Ready AI Extensions
                </h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Intelligent customer support integrations including autonomous Voice Receptionists and 24/7 Chatbot Support solutions. Fully trained on your company’s custom knowledge base.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-500">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" /> Autonomous Voice Receptionists</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" /> 24/7 Chatbot Support Solutions</li>
                </ul>
              </div>
              <button onClick={() => handleScrollToId('contact')} className="mt-8 text-xs font-mono font-bold text-[#7C3AED] flex items-center gap-1 hover:underline text-left">
                Discuss Chat Bots <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* TECH STACK MARQUEE */}
      <section id="tech-marquee" className="py-12 bg-[#0B0B0F] border-y border-slate-950 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">ENGINEERED WITH THE LATEST CLOUD STANDARDS</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'Razorpay', 'Twilio'].map((tech, idx) => (
              <span 
                key={idx} 
                className="px-4 py-2 bg-slate-950 border border-slate-900 rounded-xl font-mono text-xs font-bold text-slate-300 flex items-center gap-2 shadow-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" /> {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PORTFOLIO GRID */}
      <section id="portfolio" className="py-24 bg-[#07070A] relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="px-3 py-1 text-xs font-mono font-bold text-[#7C3AED] bg-[#7C3AED]/10 rounded-full border border-[#7C3AED]/20">
              PROVEN METRICS & PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
              Real Impact Across Key Sectors
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-3">
              We build specialized features tailored to specific industry needs, delivering clear ROI on every system launch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Medical Clinic Project */}
            <div className="p-6 rounded-2xl border border-slate-900 bg-[#12121A]/50 hover:border-[#7C3AED]/20 transition flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold mb-2">🏥 MEDICAL & CLINICS</span>
                <h4 className="text-base font-bold text-white">Apex Health Portal</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Coded dynamic self-serve booking calendar integration reducing front-desk overload and reducing cancellation rates.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
                  ⚡ ROI: 45% Fewer Phone Calls
                </div>
              </div>
              <button onClick={() => handleScrollToId('contact')} className="mt-6 text-xs text-[#7C3AED] font-semibold hover:underline inline-flex items-center gap-1">
                Explore Layout <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Law Office Project */}
            <div className="p-6 rounded-2xl border border-slate-900 bg-[#12121A]/50 hover:border-[#7C3AED]/20 transition flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest block font-bold mb-2">💼 LAW & CONSULTATION</span>
                <h4 className="text-base font-bold text-white">Vance & Partners</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Interactive intake documents and secure agreement sign portals built over a high-contrast corporate canvas.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-purple-500/5 border border-purple-500/10 text-purple-400 font-mono text-xs font-bold">
                  ⚡ ROI: 35+ Hrs Manual Work Saved/Wk
                </div>
              </div>
              <button onClick={() => handleScrollToId('contact')} className="mt-6 text-xs text-[#7C3AED] font-semibold hover:underline inline-flex items-center gap-1">
                Explore Layout <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Restaurant Project */}
            <div className="p-6 rounded-2xl border border-slate-900 bg-[#12121A]/50 hover:border-[#7C3AED]/20 transition flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block font-bold mb-2">🍳 RESTAURANT & CAFES</span>
                <h4 className="text-base font-bold text-white">Bella Italia Booking System</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Custom high-fidelity digital menu with instant local ordering alerts mapped directly to WhatsApp.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10 text-amber-400 font-mono text-xs font-bold">
                  ⚡ ROI: $8,200/Mo Delivery Revenue
                </div>
              </div>
              <button onClick={() => handleScrollToId('contact')} className="mt-6 text-xs text-[#7C3AED] font-semibold hover:underline inline-flex items-center gap-1">
                Explore Layout <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Gym Project */}
            <div className="p-6 rounded-2xl border border-slate-900 bg-[#12121A]/50 hover:border-[#7C3AED]/20 transition flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold mb-2">🏋️ FITNESS & CLUBS</span>
                <h4 className="text-base font-bold text-white">Elite Fit Gym Tracker</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  High-converting membership purchase portal with integrated recurrent Razorpay subscriptions.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 font-mono text-xs font-bold">
                  ⚡ ROI: +52% Member Registrations
                </div>
              </div>
              <button onClick={() => handleScrollToId('contact')} className="mt-6 text-xs text-[#7C3AED] font-semibold hover:underline inline-flex items-center gap-1">
                Explore Layout <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* PRICING GRID & ROI CALCULATOR */}
      <section id="pricing" className="py-24 border-t border-slate-950 bg-[#0B0B0F]/95 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="px-3 py-1 text-xs font-mono font-bold text-[#7C3AED] bg-[#7C3AED]/10 rounded-full border border-[#7C3AED]/20">
              TRANSPARENT VALUE-DRIVEN PLANS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
              Polished, Transparent Pricing
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-3">
              We code standard transparent scopes with zero hidden fees. Pick the path that perfectly fits your current operations scale.
            </p>

            <div className="inline-flex bg-[#12121A] border border-slate-800 p-1 rounded-xl mt-8">
              <button
                onClick={() => setPricingPeriod('project')}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-mono text-xs font-bold transition ${
                  pricingPeriod === 'project' ? 'bg-[#7C3AED] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Project Builds
              </button>
              <button
                onClick={() => setPricingPeriod('retainer')}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-mono text-xs font-bold transition ${
                  pricingPeriod === 'retainer' ? 'bg-[#7C3AED] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" /> Monthly AI Growth
              </button>
            </div>
          </div>

          {/* Interactive ROI Estimator */}
          <div className="max-w-4xl mx-auto mb-16 bg-gradient-to-r from-purple-950/10 to-slate-950 border border-[#7C3AED]/15 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-2 text-[#7C3AED] font-mono text-[10px] mb-6 uppercase tracking-widest font-bold">
              <Sparkles className="w-4 h-4 text-[#7C3AED] animate-pulse" /> Interactive Digital ROI Calculator
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-sans text-slate-300 font-semibold">Average Customer/Client Value:</span>
                    <span className="font-mono text-[#7C3AED] font-bold">${customerValue}</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="1000"
                    step="10"
                    value={customerValue}
                    onChange={(e) => setCustomerValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#7C3AED]"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-sans text-slate-300 font-semibold">Missed reservation calls/scheduling per week:</span>
                    <span className="font-mono text-[#7C3AED] font-bold">{missedCalls} calls</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#7C3AED]"
                  />
                </div>
              </div>

              <div className="md:col-span-5 p-6 rounded-xl bg-slate-950 border border-slate-900 text-center md:text-left space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Est. Recaptured Monthly Revenue</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">+${monthlyRecapturedRevenue.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-400">Annual Growth Lift:</span>
                  <span className="text-white font-bold">+${annualRecapturedRevenue.toLocaleString()}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#7C3AED]/5 border border-[#7C3AED]/10 text-[10px] text-purple-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#7C3AED]" /> Payback period is under 30 days!
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Grid Layout */}
          {pricingPeriod === 'project' ? (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plan 1 */}
              <div className="p-8 rounded-2xl border border-slate-900 bg-[#12121A]/50 relative flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">$1,499 Business Build</h3>
                  <p className="text-xs text-slate-500 mt-1 uppercase font-mono">ONE-TIME INVESTMENT</p>
                  <p className="text-xs text-slate-400 mt-4 italic border-l border-[#7C3AED] pl-3">
                    "Perfect for local medical clinics, CA firms, law offices, and local shops looking to secure an elite responsive web presence."
                  </p>
                  <ul className="mt-6 space-y-3 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> Hand-crafted React architecture</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> Built-in custom lead booking systems</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> Mobile responsiveness optimized fully</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> High-performance SEO schema integration</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-900">
                  <button 
                    onClick={() => handleRazorpayCheckout('Business Build', 1499)}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-mono font-bold transition border border-slate-800 cursor-pointer text-center"
                  >
                    SELECT PLAN & SECURE SPOT
                  </button>
                </div>
              </div>

              {/* Plan 2 */}
              <div className="p-8 rounded-2xl border border-[#7C3AED] bg-[#12121A]/50 relative flex flex-col justify-between shadow-xl shadow-[#7C3AED]/5">
                <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-[#7C3AED] text-white font-mono text-[9px] uppercase font-bold tracking-widest">
                  POPULAR ADVANCED BUILD
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">$3,499 Advanced Web App</h3>
                  <p className="text-xs text-slate-500 mt-1 uppercase font-mono">ONE-TIME INVESTMENT</p>
                  <p className="text-xs text-slate-400 mt-4 italic border-l border-[#7C3AED] pl-3">
                    "Full-featured app with customized databases, customer billing portals, and custom system automations."
                  </p>
                  <ul className="mt-6 space-y-3 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> Everything in Business Build package</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> Supabase database architecture sync</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> Recurrent Billing with Razorpay integration</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> Multi-role secure admin dashboard portal</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-900">
                  <button 
                    onClick={() => handleRazorpayCheckout('Advanced Web App', 3499)}
                    className="w-full py-3 bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white rounded-xl text-xs font-mono font-bold transition shadow-md shadow-[#7C3AED]/20 cursor-pointer text-center"
                  >
                    SELECT PLAN & SECURE SPOT
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto p-8 rounded-2xl border border-[#7C3AED] bg-[#12121A]/50 relative flex flex-col justify-between">
              <div>
                <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-[#7C3AED] text-white font-mono text-[9px] uppercase font-bold tracking-widest">
                  RECOMMENDED RETAINER
                </span>
                <h3 className="text-lg font-bold text-white">$299/mo AI-Powered Growth Retainer</h3>
                <p className="text-xs text-slate-500 mt-1 uppercase font-mono">MONTHLY SUBSCRIPTION</p>
                <p className="text-xs text-slate-400 mt-4 italic border-l border-[#7C3AED] pl-3">
                  "Maintain elite performance and deploy continuous smart helpers. Let our bots capture missed local leads 24/7."
                </p>
                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> High-frequency secure daily database backups</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> Trained AI support assistant integration</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> SMS / WhatsApp real-time trigger integration</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#7C3AED]" /> Up to 5 hours of custom frontend additions/mo</li>
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-900">
                <button 
                  onClick={() => handleRazorpayCheckout('AI Growth Retainer', 299)}
                  className="w-full py-3 bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white rounded-xl text-xs font-mono font-bold transition shadow-md shadow-[#7C3AED]/20 cursor-pointer text-center"
                >
                  SUBSCRIBE & LAUNCH GROWTH
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CAL.COM APPOINTMENT BOOKER */}
      <section id="book-call" className="py-24 border-t border-slate-950 bg-[#07070A] relative">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center mb-12">
            <span className="px-3 py-1 text-xs font-mono font-bold text-[#7C3AED] bg-[#7C3AED]/10 rounded-full border border-[#7C3AED]/20">
              SECURE LIVE CALL CALENDAR
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-4">
              Schedule Your 10-Min Live Discovery Session
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
              Book a live screen-share call directly with our engineering architects. We will align details and sketch your system live.
            </p>
          </div>

          {/* Cal.com Embedded Container */}
          <div className="rounded-2xl border border-slate-900 bg-slate-950 overflow-hidden shadow-2xl p-4 sm:p-6">
            <iframe
              src={`https://cal.com/${process.env.NEXT_PUBLIC_CALCOM_USERNAME || 'ai-craft-studio/discovery'}`}
              style={{ width: "100%", height: "550px", border: "0" }}
              title="Cal.com Scheduling Calendar"
              className="bg-slate-950 rounded-lg w-full"
            />
            <p className="text-center text-[10px] font-mono text-slate-500 mt-4 uppercase">
              🔒 Cal.com Secure Direct Scheduling. All session slots are completely private.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER & DEEP CONTACT FOOTPRINT */}
      <section id="contact" className="py-24 border-t border-slate-950 bg-[#07070A] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
            
            {/* Contact Details Left Section */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                <span className="px-3 py-1 text-[10px] font-mono font-bold text-[#7C3AED] bg-[#7C3AED]/10 rounded-full border border-[#7C3AED]/20 uppercase">
                  DIRECT OFFICE CHANNELS
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Connect Instantly With Us
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  We are actively accepting projects for the upcoming cycle. Touch base using your preferred channel to receive instant responses.
                </p>
              </div>

              {/* Instant Contact Anchors */}
              <div className="space-y-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-[#7C3AED]/30 hover:bg-[#12121A]/50 transition-all group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white transition-all">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Call Direct</span>
                    <span className="text-xs font-semibold text-white group-hover:text-[#7C3AED] transition-colors">+91 98765 43210</span>
                  </div>
                </a>

                <a
                  href="mailto:build@aicraftstudio.com?subject=Inbound%20Web%20Project%20Request"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-[#7C3AED]/30 hover:bg-[#12121A]/50 transition-all group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white transition-all">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Email Inbox</span>
                    <span className="text-xs font-semibold text-white group-hover:text-[#7C3AED] transition-colors">build@aicraftstudio.com</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210?text=Hi%21%20I%20run%20a%20local%20business%20and%20want%20to%20deploy%20a%20custom%20website%20using%20AI%20Craft%20Studio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-emerald-500/30 hover:bg-[#12121A]/50 transition-all group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">WhatsApp Us</span>
                    <span className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">Chat Instantly</span>
                  </div>
                </a>
              </div>

              {/* Styled Map Placeholder */}
              <div className="relative h-44 rounded-2xl border border-slate-900 overflow-hidden bg-[#0A0A0E]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#161622_1px,transparent_1px),linear-gradient(to_bottom,#161622_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
                
                <svg className="absolute inset-0 w-full h-full opacity-20 text-slate-700" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="40" x2="400" y2="40" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="1" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="1" />
                  <line x1="220" y1="0" x2="220" y2="200" stroke="currentColor" strokeWidth="1.5" />
                </svg>

                {/* Pulsing Pin */}
                <div className="absolute top-[80px] left-[180px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-[#7C3AED] rounded-full blur opacity-55 animate-ping" />
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#0B0B0F] border border-[#7C3AED] text-[#7C3AED] shadow-lg shadow-black">
                      <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
                    </div>
                  </div>
                  <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900 text-[8px] font-mono text-slate-300">
                    Mumbai Studio Office
                  </div>
                </div>

                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg border border-slate-900/60 bg-slate-950/80 backdrop-blur-md flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span className="truncate">📍 Mira Road, Mumbai, Maharashtra</span>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=501,+3A,+NG+silver+spring,+Mira+Road+(E),+Mumbai-401107"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7C3AED] hover:text-purple-300 font-bold uppercase shrink-0 transition ml-2"
                  >
                    Directions 🚗
                  </a>
                </div>
              </div>
            </div>

            {/* Inbound Lead Ingestion Form Right Section */}
            <div className="lg:col-span-7 relative flex">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-indigo-600 rounded-2xl blur opacity-15" />
              <div className="relative w-full bg-[#12121A]/85 border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#7C3AED]" /> Web Project Inquiry Form
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Complete these details to request your draft blueprint proposal. We sync leads natively with our Postgres database cluster.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-950/40 border border-red-900/50 text-red-400 rounded-lg text-xs font-mono">
                      ❌ {error}
                    </div>
                  )}

                  {successMsg && (
                    <div className="p-3.5 bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 rounded-lg text-xs font-mono">
                      🎉 {successMsg}
                    </div>
                  )}

                  {blueprint && (
                    <div className="p-4 rounded-lg bg-[#7C3AED]/5 border border-[#7C3AED]/15 text-xs space-y-2">
                      <p className="text-[#7C3AED] font-bold font-mono text-[10px] uppercase">✨ CHIP BLUEPRINT GENERATED</p>
                      <p className="text-slate-300 font-sans leading-relaxed">{blueprint.analysis}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {blueprint.suggestedModules.map((m, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-white border border-slate-900 font-mono text-[9px]">{m}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                        <User className="w-3.5 h-3.5 text-[#7C3AED]" /> Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Kumar"
                        className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#7C3AED]" /> Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rajesh@mybakery.com"
                        className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#7C3AED]" /> Phone Number (WhatsApp preferred)
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1.5">
                        <Building className="w-3.5 h-3.5 text-[#7C3AED]" /> Your Industry Niche
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] cursor-pointer"
                      >
                        <option value="medical_clinic">🏥 Medical & Dental Clinics</option>
                        <option value="professional_services">💼 Law, CA & Consultations</option>
                        <option value="restaurant">🍳 Restaurants & Cafe Hubs</option>
                        <option value="gym">🏋️ Gyms & Health Centers</option>
                        <option value="other">⚙️ Other Local Service / Shop</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Describe your layout or custom feature goals:
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="e.g. 'I run a fitness studio. I want a modern layout where customers can view class listings and enroll directly. It must load under 1 second on mobile.'"
                      className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#7C3AED] to-indigo-600 hover:from-[#7C3AED] hover:to-indigo-500 text-white rounded-xl font-bold text-xs transition shadow-lg shadow-[#7C3AED]/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" /> Connecting & Synchronizing Your Data...
                      </>
                    ) : (
                      <>
                        Generate Proposal & Save In Supabase <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-950 text-center text-xs text-slate-500 font-mono">
            <p>© {new Date().getFullYear()} AI Craft Studio. Engineered with raw React & serverless Next.js structures. All Rights Reserved.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
