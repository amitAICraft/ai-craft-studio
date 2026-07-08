import React from 'react';
import { Heart, Utensils, GraduationCap, Scale, ArrowRight, Shield, Clock, BookOpen, Star } from 'lucide-react';

export default function IndustriesWeServe() {
  const industries = [
    {
      title: 'Medical & Health Clinics',
      description: 'Streamline your operations with HIPAA-compliant intake forms, patient booking portals, and secure electronic registries.',
      features: ['Secure patient registration', 'Automated text reminders', 'Dentist & Chiropractor portals'],
      icon: Heart,
      colorClass: 'text-rose-400 border-rose-500/20 bg-rose-500/5',
      badge: 'HIPAA-Ready'
    },
    {
      title: 'Restaurants & Hospitality',
      description: 'Capture more diners with gorgeous digital menu displays, mobile table reservations, and zero-miss direct takeout channels.',
      features: ['Dynamic digital menus', 'Zero-commission reservations', 'Instant SMS order alerts'],
      icon: Utensils,
      colorClass: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
      badge: 'Zero-Fee Intake'
    },
    {
      title: 'Schools & Colleges',
      description: 'Empower student enrollment with frictionless application portals, high-speed campus resource hubs, and parent update channels.',
      features: ['Student admission forms', 'Fast content delivery', 'Curriculum resource drives'],
      icon: GraduationCap,
      colorClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      badge: 'Speed Optimized'
    },
    {
      title: 'Lawyers & Professional Services',
      description: 'Build premium digital credibility with ultra-professional layouts, automated client consultation booking, and secure document gateways.',
      features: ['Elite high-credibility designs', 'Frictionless case evaluations', 'Secure intake channels'],
      icon: Scale,
      colorClass: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
      badge: 'High Credibility'
    }
  ];

  const scrollToForm = () => {
    const el = document.getElementById('intake-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="industries" className="py-24 border-t border-slate-900 bg-[#0B0B0F]/98 relative overflow-hidden">
      {/* Dynamic ambient highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/25 bg-purple-500/5 text-purple-400 text-xs font-mono mb-4">
            <Star className="w-3.5 h-3.5" /> PROVEN REGIONAL VERTICALS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white tracking-tight">
            Industries We Serve
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            We build high-converting, robust web experiences tailored exactly to the needs of local healthcare, dining, education, and legal firms.
          </p>
        </div>

        {/* Shadcn-Style Responsive Card Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={i}
                className="group relative bg-[#12121A]/40 border border-slate-900 hover:border-slate-800 rounded-xl p-8 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header row */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg border ${ind.colorClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-slate-950 border border-slate-900 text-slate-400">
                      {ind.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <h3 className="text-xl font-bold text-white mt-6 group-hover:text-purple-400 transition-colors duration-200">
                    {ind.title}
                  </h3>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                    {ind.description}
                  </p>

                  {/* Highlights list */}
                  <ul className="mt-6 space-y-2">
                    {ind.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer CTA to scroll */}
                <div className="mt-8 pt-5 border-t border-slate-900/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Premium Responsive Web App</span>
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-all font-medium"
                  >
                    Get Proposal Proposal <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
