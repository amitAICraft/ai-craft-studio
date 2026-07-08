import React, { useState } from 'react';
import { Check, Layers, Calendar, ArrowRight, ShieldCheck, Star, Sparkles, TrendingUp } from 'lucide-react';

export default function PricingTiers() {
  const [modelType, setModelType] = useState<'project' | 'retainer'>('project');
  
  // ROI Calculator States
  const [customerValue, setCustomerValue] = useState<number>(150); // $150 average patient / diner / member value
  const [missedCalls, setMissedCalls] = useState<number>(5);       // 5 missed reservation or scheduling calls/week

  const projectTiers = [
    {
      id: 'prof_site',
      name: 'Professional Business Site',
      price: '$1,499',
      period: 'one-time investment',
      tagline: 'Establish dynamic, polished online credibility and turn local search traffic into high-value clients.',
      features: [
        'Premium custom responsive React design',
        '5 core pages (Home, Services, Case Studies, Pricing, Contact)',
        'Built-in secure lead capture & intake scheduler systems',
        'Advanced performance optimization (sub-1s load times)',
        'Local SEO registry optimization for Google Maps search visibility',
        '30 days of premium post-launch maintenance care'
      ],
      ctaText: 'Start Your Business Site',
      isPopular: false,
    },
    {
      id: 'adv_app',
      name: 'Advanced Web Application',
      price: '$3,499',
      period: 'one-time investment',
      tagline: 'A robust full-stack solution featuring integrated cloud databases, client dashboards, and custom CRM automations.',
      features: [
        'Everything in Professional Business Site package',
        'Full-stack custom Next.js & Node.js architecture',
        'Durable relational database integration (PostgreSQL)',
        'Secure user authentication & client dashboard portals',
        'Custom interactive appointment planners or table registry tools',
        '60 days of priority premium post-launch support'
      ],
      ctaText: 'Build Your Custom App',
      isPopular: true,
    },
  ];

  const retainerTiers = [
    {
      id: 'std_maint',
      name: 'Standard Maintenance',
      price: '$99',
      period: 'per month',
      tagline: 'Worry-free cloud maintenance to keep your digital systems secure, fast, and completely up to date.',
      features: [
        'Fully managed premium global cloud hosting (Vercel/Cloud Run)',
        'Automated daily database backups & structural restores',
        'Critical security patch updates & SSL certificate renewal',
        'Sub-24hr priority bug fixes & active downtime tracking',
        'Minor typography adjustments & content change support',
        'Monthly traffic logs, search performance, and conversion review reports'
      ],
      ctaText: 'Activate Standard Care',
      isPopular: false,
    },
    {
      id: 'ai_growth',
      name: 'AI-Powered Growth Suite',
      price: '$299',
      period: 'per month + usage',
      tagline: 'Supercharge your team operations and systematically log bookings with 24/7 AI-driven assistants.',
      features: [
        'Everything in Standard Maintenance package',
        'Custom-trained AI Chat Assistant (Google Gemini SDK)',
        'Instant customer lead categorization & database ingestion',
        'Priority SLA support ticketing (under 4-hour response guarantee)',
        'Ongoing AI knowledgebase optimization & prompt tuning',
        'Up to 5 hours of premium custom feature changes included monthly'
      ],
      ctaText: 'Deploy AI-Powered Growth',
      isPopular: true,
    },
  ];

  const activeTiers = modelType === 'project' ? projectTiers : retainerTiers;

  const scrollToForm = () => {
    const element = document.getElementById('intake-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Calculate ROI Metrics
  // Monthly recaptured calls assuming 40% close rate on automated assistant / fast booking portal
  const closeRate = 0.40; 
  const monthlyRecapturedRevenue = Math.round(missedCalls * 4 * closeRate * customerValue);
  const annualRecapturedRevenue = monthlyRecapturedRevenue * 12;

  return (
    <section id="pricing" className="py-24 border-t border-slate-900 bg-[#0B0B0F]/90 relative overflow-hidden">
      {/* Decorative ambient spots */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-4">
            <Star className="w-3.5 h-3.5" /> ROI-DRIVEN PRICING PLANS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-white tracking-tight">
            Realistic, Transparent Packages
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Choose between a focused, custom project build or an ongoing growth partnership. Let's turn your digital channels into passive booking engines.
          </p>

          {/* Model Toggle */}
          <div className="inline-flex bg-[#12121A] border border-slate-800 p-1 rounded-xl mt-10">
            <button
              onClick={() => setModelType('project')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs font-bold transition-all ${
                modelType === 'project'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Project-Based Builds
            </button>
            <button
              onClick={() => setModelType('retainer')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-xs font-bold transition-all ${
                modelType === 'retainer'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> Monthly Management
            </button>
          </div>
        </div>

        {/* Dynamic ROI Estimator Tool Card */}
        <div className="max-w-4xl mx-auto mb-20 bg-gradient-to-r from-purple-950/15 to-slate-950/40 border border-purple-500/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2.5 text-purple-400 font-mono text-xs mb-6 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" /> Interactive Digital ROI Estimator
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Input Sliders */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-sans text-slate-300 font-semibold">Average Value of a Single Customer:</span>
                  <span className="font-mono text-purple-400 font-bold">${customerValue}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="1000"
                  step="10"
                  value={customerValue}
                  onChange={(e) => setCustomerValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>$30 (Meal/Entry)</span>
                  <span>$1,000 (Dental Clean/Premium Retainer)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-sans text-slate-300 font-semibold">Missed Reservation/Scheduling Calls Per Week:</span>
                  <span className="font-mono text-purple-400 font-bold">{missedCalls} calls</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={missedCalls}
                  onChange={(e) => setMissedCalls(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 call/wk</span>
                  <span>30 calls/wk</span>
                </div>
              </div>
            </div>

            {/* Simulated ROI metrics readout */}
            <div className="md:col-span-5 p-6 rounded-xl bg-slate-950 border border-slate-900/60 text-center md:text-left space-y-4">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                  Est. Recaptured Monthly Revenue
                </span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  +${monthlyRecapturedRevenue.toLocaleString()}
                </span>
                <span className="text-slate-500 text-[10px] block mt-0.5">
                  (Assuming moderate 40% intake automation capture)
                </span>
              </div>

              <div className="pt-3 border-t border-slate-900 flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Annual Return:</span>
                <span className="text-white font-bold text-sm text-right">+${annualRecapturedRevenue.toLocaleString()}</span>
              </div>

              <div className="p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/10 flex items-center gap-2.5 text-xs text-purple-300">
                <TrendingUp className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Payback period is under **30 days** on either business tier plan!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {activeTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative bg-[#12121A]/50 border rounded-2xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 ${
                tier.isPopular
                  ? 'border-purple-500 shadow-xl shadow-purple-950/20'
                  : 'border-slate-900 hover:border-slate-800'
              }`}
            >
              {tier.isPopular && (
                <span className="absolute -top-3.5 left-8 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400 text-white font-mono text-[10px] uppercase font-bold tracking-widest shadow-lg">
                  Most Requested Choice
                </span>
              )}

              <div>
                {/* Header Info */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{tier.name}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">{tier.period}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl md:text-4xl font-extrabold text-white font-mono tracking-tight">{tier.price}</span>
                  </div>
                </div>

                {/* Short Subtitle */}
                <p className="text-slate-400 text-xs mt-4 leading-relaxed italic border-l-2 border-purple-500/30 pl-3">
                  "{tier.tagline}"
                </p>

                {/* Features list */}
                <div className="mt-8 space-y-3.5">
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Included Deliverables:</h4>
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 font-sans leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-10 pt-6 border-t border-slate-900">
                <button
                  onClick={scrollToForm}
                  className={`w-full group inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    tier.isPopular
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800'
                  }`}
                >
                  {tier.ctaText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <p className="text-center text-[10px] text-slate-600 font-mono mt-3">
                  ✔️ Standard transparent terms with absolutely zero hidden implementation surprises.
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 text-center max-w-2xl mx-auto p-4 rounded-xl border border-slate-900 bg-slate-950/20 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-center gap-4">
          <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0" />
          <p className="text-xs text-slate-400">
            <span className="text-white font-medium">100% Satisfaction SLA Guarantee:</span> We execute rigid cross-device speed, multi-touch responsive, and secure database audits before going live.
          </p>
        </div>

      </div>
    </section>
  );
}
