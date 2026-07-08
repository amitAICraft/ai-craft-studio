import React from 'react';
import { Cpu, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#0B0B0F] border-t border-slate-900 text-slate-500 py-16 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-900/80">
          
          {/* Brand info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/10 border border-purple-500/20">
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <span className="font-sans font-bold text-base text-white tracking-tight">AI CRAFT STUDIO</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We design and engineer bespoke, high-conversion digital platforms tailored to establish dominant local business authority and automate manual workflows.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button className="p-2 rounded-lg bg-[#12121A] hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-[#12121A] hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-[#12121A] hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition">
                <Github className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Directory Columns */}
          <div className="col-span-2 md:col-start-6 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleScrollTo('services')} className="hover:text-white transition text-left">
                  Web Development
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('services')} className="hover:text-white transition text-left">
                  Web Applications
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('services')} className="hover:text-white transition text-left">
                  E-Commerce Stores
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('services')} className="hover:text-white transition text-left">
                  AI Integrations
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">Our Tech</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleScrollTo('tech-stack')} className="hover:text-white transition text-left">
                  Next.js & React
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('tech-stack')} className="hover:text-white transition text-left">
                  Tailwind CSS
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('tech-stack')} className="hover:text-white transition text-left">
                  Python FastAPI
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('tech-stack')} className="hover:text-white transition text-left">
                  PostgreSQL & Supabase
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">Projects</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleScrollTo('portfolio')} className="hover:text-white transition text-left">
                  Apex Health Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('portfolio')} className="hover:text-white transition text-left">
                  Bella Italia Digital
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('portfolio')} className="hover:text-white transition text-left">
                  Elite Fit Management
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('portfolio')} className="hover:text-white transition text-left">
                  Vanguard Legal
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">Pricing</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleScrollTo('pricing')} className="hover:text-white transition text-left">
                  Project-Based Build
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollTo('pricing')} className="hover:text-white transition text-left">
                  Monthly Retainer
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600 font-mono">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span>© 2026 AI Craft Studio. All rights reserved. Custom Web Applications Engineered to Scale.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition">Privacy Policies</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
