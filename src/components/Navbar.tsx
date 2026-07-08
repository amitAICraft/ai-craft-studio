import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Code2, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B0F]/85 backdrop-blur-md border-b border-slate-900/80 py-4 shadow-xl shadow-black/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-purple-600/10 border border-purple-500/35 shadow-inner shadow-purple-500/10">
            <svg className="w-5.5 h-5.5" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 8L24 12.5V21.5L16 26L8 21.5V12.5L16 8Z" stroke="#7C3AED" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              <path d="M16 12L20 14.5V19.5L16 22L12 19.5V14.5L16 12Z" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1" />
              <circle cx="16" cy="17" r="2.5" fill="#FFFFFF" />
            </svg>
            <div className="absolute inset-0 bg-purple-500/20 blur-md rounded-xl -z-10" />
          </div>
          <div>
            <span className="font-sans font-bold text-lg text-white tracking-tight">AI CRAFT</span>
            <span className="font-mono text-xs text-[#7C3AED] ml-1.5 px-1.5 py-0.5 rounded border border-[#7C3AED]/15 bg-[#7C3AED]/5 font-bold">STUDIO</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('services')}
            className="text-slate-400 hover:text-white text-sm font-medium tracking-wide transition duration-200 cursor-pointer"
          >
            Our Services
          </button>
          <button
            onClick={() => scrollToSection('tech-stack')}
            className="text-slate-400 hover:text-white text-sm font-medium tracking-wide transition duration-200 cursor-pointer"
          >
            Our Tech
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-slate-400 hover:text-white text-sm font-medium tracking-wide transition duration-200 cursor-pointer"
          >
            Our Work
          </button>
          <button
            onClick={() => scrollToSection('validation')}
            className="text-slate-400 hover:text-white text-sm font-medium tracking-wide transition duration-200 cursor-pointer"
          >
            Case Studies
          </button>
          <button
            onClick={() => scrollToSection('contact-us')}
            className="text-slate-400 hover:text-white text-sm font-medium tracking-wide transition duration-200 cursor-pointer"
          >
            Contact Us
          </button>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => scrollToSection('contact-us')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-purple-600 hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-500/20 cursor-pointer"
          >
            Let's Build Your App
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-400 hover:text-white p-1.5 transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-[#0B0B0F] border-l border-slate-900 shadow-2xl z-40 p-8 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 8L24 12.5V21.5L16 26L8 21.5V12.5L16 8Z" stroke="#7C3AED" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              <path d="M16 12L20 14.5V19.5L16 22L12 19.5V14.5L16 12Z" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1" />
              <circle cx="16" cy="17" r="2.5" fill="#FFFFFF" />
            </svg>
            <span className="font-sans font-bold text-base text-white tracking-tight">AI CRAFT</span>
            <span className="font-mono text-[10px] text-[#7C3AED] px-1.5 py-0.5 rounded border border-[#7C3AED]/15 bg-[#7C3AED]/5 font-bold">STUDIO</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1.5">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => scrollToSection('services')}
            className="text-left text-slate-300 hover:text-white text-lg font-medium py-2 border-b border-slate-900 cursor-pointer"
          >
            Our Services
          </button>
          <button
            onClick={() => scrollToSection('tech-stack')}
            className="text-left text-slate-300 hover:text-white text-lg font-medium py-2 border-b border-slate-900 cursor-pointer"
          >
            Our Tech
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="text-left text-slate-300 hover:text-white text-lg font-medium py-2 border-b border-slate-900 cursor-pointer"
          >
            Our Work
          </button>
          <button
            onClick={() => scrollToSection('validation')}
            className="text-slate-300 hover:text-white text-lg font-medium py-2 border-b border-slate-900 text-left cursor-pointer"
          >
            Case Studies
          </button>
          <button
            onClick={() => scrollToSection('contact-us')}
            className="text-left text-slate-300 hover:text-white text-lg font-medium py-2 border-b border-slate-900 cursor-pointer"
          >
            Contact Us
          </button>

          <button
            onClick={() => scrollToSection('contact-us')}
            className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition cursor-pointer"
          >
            Let's Build Your App
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
