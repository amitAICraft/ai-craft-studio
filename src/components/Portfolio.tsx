import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, Calendar, Menu, Users, Shield, ArrowRight, X, Sparkles, Check, 
  Settings, ShoppingCart, Plus, Minus, CreditCard, Heart, FileText, Send, CheckCircle2 
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  industry: string;
  tag: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  gradient: string;
  tagColor: string;
  defaultUrl: string;
}

export default function Portfolio() {
  const [activeSandbox, setActiveSandbox] = useState<string | null>(null);
  const [customLinks, setCustomLinks] = useState<Record<string, string>>({});
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [tempLinkText, setTempLinkText] = useState<string>('');

  // Sandbox states
  // 1. Apex Health
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [selectedService, setSelectedService] = useState('Dental Hygiene Clean');
  const [selectedDate, setSelectedDate] = useState('2026-07-15');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  // 2. Bella Italia
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const menuItems = [
    { name: 'Truffle Tagliolini', price: 24, desc: 'Fresh egg pasta, black summer truffles, Parmigiano-Reggiano.' },
    { name: 'Wood-fired Diavola Pizza', price: 19, desc: 'Spianata Calabrese, fresh mozzarella, hot honey infusion.' },
    { name: 'Florentine Steak (Saporito)', price: 42, desc: '30-day dry-aged Angus, rosemary oil, volcanic sea salt.' },
  ];

  // 3. Elite Fit
  const [tierSelection, setTierSelection] = useState<'standard' | 'elite'>('elite');
  const [memberName, setMemberName] = useState('Alex Carter');
  const [isJoined, setIsJoined] = useState(false);

  // 4. Vanguard Legal
  const [caseType, setCaseType] = useState('Business Contract Dispute');
  const [claimValue, setClaimValue] = useState('$50k - $150k');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const projects: Project[] = [
    {
      id: 'apex-health',
      title: 'Apex Health Portal',
      industry: 'Medical & Dental Clinic',
      tag: 'Healthcare Systems',
      description: 'A beautifully designed client portal with dynamic patient intake forms, automated schedule alerts, and HIPAA-compliant registration pathways.',
      icon: Calendar,
      features: ['Patient Booking Integration', 'Automated SMS Reminders', 'Secure Intake Registers'],
      gradient: 'from-rose-500/10 to-purple-500/5 hover:border-rose-500/20',
      tagColor: 'text-rose-400 bg-rose-500/5 border-rose-500/10',
      defaultUrl: 'https://apex-health-demo.example.com'
    },
    {
      id: 'bella-italia',
      title: 'Bella Italia Digital',
      industry: 'Restaurant & Hospitality',
      tag: 'Interactive Dining',
      description: 'Dynamic interactive online menus with 0% transaction commission, instant SMS table booking alerts, and optimized mobile-first checkout pipelines.',
      icon: Menu,
      features: ['Dynamic Mobile Menus', 'Live Table Reservations', 'Zero-Fee Takeout Engine'],
      gradient: 'from-amber-500/10 to-orange-500/5 hover:border-amber-500/20',
      tagColor: 'text-amber-400 bg-amber-500/5 border-amber-500/10',
      defaultUrl: 'https://bella-italia-demo.example.com'
    },
    {
      id: 'elite-fit',
      title: 'Elite Fit Management',
      industry: 'Gym & Fitness Center',
      tag: 'SaaS Dashboard',
      description: 'Streamlined membership onboarding system featuring customized client billing engines, recurring payment portals, and class scheduling calendars.',
      icon: Users,
      features: ['Recurring Billing Core', 'Class Schedule Planner', 'Interactive Client Dashboards'],
      gradient: 'from-emerald-500/10 to-teal-500/5 hover:border-emerald-500/20',
      tagColor: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10',
      defaultUrl: 'https://elite-fit-demo.example.com'
    },
    {
      id: 'vanguard-legal',
      title: 'Vanguard Legal',
      industry: 'Law & Professional Services',
      tag: 'Lead Capture Funnel',
      description: 'An elite, high-credibility digital landing platform with integrated instant case evaluations and secure encrypted document upload systems.',
      icon: Shield,
      features: ['High-Converting Lead Flows', 'Instant Evaluation Core', 'Secure Intake Gateways'],
      gradient: 'from-cyan-500/10 to-blue-500/5 hover:border-cyan-500/20',
      tagColor: 'text-cyan-400 bg-cyan-500/5 border-cyan-500/10',
      defaultUrl: 'https://vanguard-legal-demo.example.com'
    }
  ];

  // Load custom links from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('agency_project_links');
      if (stored) {
        setCustomLinks(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveCustomLink = (id: string, url: string) => {
    const updated = { ...customLinks, [id]: url };
    setCustomLinks(updated);
    try {
      localStorage.setItem('agency_project_links', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setEditingLinkId(null);
  };

  const startEditingLink = (id: string, currentVal: string) => {
    setEditingLinkId(id);
    setTempLinkText(currentVal || '');
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddToCart = (name: string) => {
    setCart(prev => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
  };

  const handleRemoveFromCart = (name: string) => {
    setCart(prev => {
      const copy = { ...prev };
      if (copy[name] > 1) copy[name]--;
      else delete copy[name];
      return copy;
    });
  };

  const getSubtotal = () => {
    return menuItems.reduce((acc, item) => acc + (cart[item.name] || 0) * item.price, 0);
  };

  const handleLaunchUrl = (project: Project) => {
    const targetUrl = customLinks[project.id] || '';
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If no custom link exists, open the interactive sandbox
      setActiveSandbox(project.id);
    }
  };

  return (
    <section id="portfolio" className="py-24 border-t border-slate-900 bg-[#0B0B0F]/98 relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/25 bg-purple-500/5 text-purple-400 text-xs font-mono mb-4">
            <ExternalLink className="w-3.5 h-3.5" /> PROVEN CLIENT ARCHITECTURES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-white tracking-tight">
            Featured Client Projects
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            We engineer secure, bespoke, and fast systems. Test our live **Sandbox Simulators** below, or configure real external URLs directly as you deploy them.
          </p>
        </div>

        {/* Portfolio Showcase Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => {
            const Icon = project.icon;
            const currentUrl = customLinks[project.id] || '';
            const isEditing = editingLinkId === project.id;

            return (
              <div
                key={project.id}
                className={`group relative bg-gradient-to-br ${project.gradient} border border-slate-900 hover:border-purple-500/20 rounded-2xl p-8 md:p-10 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                <div>
                  {/* Category Tag, Icon & Inline Link Editor */}
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${project.tagColor}`}>
                      {project.tag}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEditingLink(project.id, currentUrl)}
                        title="Configure custom production URL"
                        className="p-1.5 rounded bg-slate-950 border border-slate-900 text-slate-500 hover:text-purple-400 transition"
                      >
                        <Settings className="w-3.5 h-3.5" />
                      </button>
                      <div className="p-2 rounded bg-slate-950/40 border border-slate-900 text-slate-400">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Inline Link Editor Form */}
                  {isEditing && (
                    <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-purple-500/30">
                      <label className="block text-[10px] font-mono text-slate-400 mb-1">CONFIGURE LIVE WEB LINK:</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://your-live-project.com"
                          value={tempLinkText}
                          onChange={(e) => setTempLinkText(e.target.value)}
                          className="w-full bg-[#07070A] border border-slate-800 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                        <button
                          onClick={() => saveCustomLink(project.id, tempLinkText)}
                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 rounded text-xs text-white font-bold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingLinkId(null)}
                          className="px-2 bg-slate-900 hover:bg-slate-800 rounded text-xs text-slate-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Title & Industry */}
                  <h3 className="text-2xl font-bold text-white mt-6 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {project.industry}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Configured URL Tag */}
                  {currentUrl ? (
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-purple-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Mapped to: <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition">{currentUrl}</a></span>
                    </div>
                  ) : (
                    <div className="mt-3 text-[10px] font-mono text-slate-500">
                      ℹ️ Built-in local sandbox simulation active.
                    </div>
                  )}

                  {/* Core Highlight Points */}
                  <div className="mt-6 pt-6 border-t border-slate-900/40">
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Core Deliverables</h4>
                    <ul className="space-y-2">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                          <span className="w-1 h-1 rounded-full bg-purple-500" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action buttons */}
                <div className="mt-8 pt-5 border-t border-slate-900/60 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <button
                    onClick={() => setActiveSandbox(project.id)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-900 hover:border-purple-500/30 text-xs text-slate-300 hover:text-white transition text-center font-semibold font-mono"
                  >
                    ⚡ Test Live Simulator
                  </button>

                  <button
                    onClick={() => handleLaunchUrl(project)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white transition text-center font-bold flex items-center justify-center gap-1.5"
                  >
                    {currentUrl ? (
                      <>
                        Visit Live App <ExternalLink className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        Preview Sandbox <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Lightbox / Modal Simulator */}
      {activeSandbox && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0F0F15] border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">Interactive Sandbox Demo</span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {projects.find(p => p.id === activeSandbox)?.title}
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveSandbox(null);
                  setAppointmentConfirmed(false);
                  setOrderPlaced(false);
                  setIsJoined(false);
                  setFormSubmitted(false);
                }}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Frame Screen content */}
            <div className="p-6">
              
              {/* 1. Apex Health Simulator */}
              {activeSandbox === 'apex-health' && (
                <div className="space-y-5">
                  {!appointmentConfirmed ? (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs text-purple-300">
                        🩺 <strong>HIPAA-compliant Live intake module:</strong> Select your health service & calendar time below to test direct database logging.
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Select Care Service:</label>
                        <select
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full bg-[#07070A] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="Dental Hygiene Clean">🏥 Dental Hygiene Clean & Exam</option>
                          <option value="Orthodontic Consultation">🦷 General Orthodontic Evaluation</option>
                          <option value="Chiropractic Adjustment">💆 Therapeutic Chiropractic Consultation</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Preferred Date:</label>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full bg-[#07070A] border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Preferred Time:</label>
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full bg-[#07070A] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                          >
                            <option value="09:00 AM">09:00 AM</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="01:30 PM">01:30 PM</option>
                            <option value="03:00 PM">03:00 PM</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={() => setAppointmentConfirmed(true)}
                        className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl tracking-wide uppercase transition shadow-lg shadow-rose-900/20"
                      >
                        Confirm Instant Appointment
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
                        <Check className="w-6 h-6 animate-bounce" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Appointment Logged Successfully!</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        In a live production system, our Next.js API immediately synchronizes with **Google Calendar**, dispatches SMS reminders to the patient, and triggers internal logs in the staff database.
                      </p>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 text-left text-xs font-mono space-y-1.5 text-slate-400">
                        <div><span className="text-rose-400">Service:</span> {selectedService}</div>
                        <div><span className="text-rose-400">Scheduled:</span> {selectedDate} at {selectedTime}</div>
                        <div><span className="text-rose-400">Status:</span> <span className="text-emerald-400">Active Pipeline Logged</span></div>
                      </div>
                      <button
                        onClick={() => setAppointmentConfirmed(false)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition"
                      >
                        Restart Demo
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Bella Italia Simulator */}
              {activeSandbox === 'bella-italia' && (
                <div className="space-y-5">
                  {!orderPlaced ? (
                    <div className="space-y-4">
                      <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300">
                        🍳 <strong>0% Commission Direct Takeout Demo:</strong> Add custom wood-fired entrees to your cart to calculate commission-free billing summaries.
                      </div>

                      <div className="space-y-3">
                        {menuItems.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-slate-950 border border-slate-900">
                            <div className="flex-1">
                              <h5 className="text-xs font-bold text-white">{item.name}</h5>
                              <p className="text-[10px] text-slate-400 leading-snug">{item.desc}</p>
                              <span className="text-xs text-amber-400 font-mono font-semibold">${item.price}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {(cart[item.name] || 0) > 0 && (
                                <>
                                  <button
                                    onClick={() => handleRemoveFromCart(item.name)}
                                    className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-xs font-mono text-white w-4 text-center">{cart[item.name]}</span>
                                </>
                              )}
                              <button
                                onClick={() => handleAddToCart(item.name)}
                                className="p-1 rounded bg-amber-600 hover:bg-amber-500 text-white"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Checkout summary */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-900 flex justify-between items-center">
                        <div>
                          <span className="block text-[10px] font-mono text-slate-500">Subtotal:</span>
                          <span className="text-lg font-bold text-white font-mono">${getSubtotal()}</span>
                        </div>
                        <button
                          disabled={getSubtotal() === 0}
                          onClick={() => setOrderPlaced(true)}
                          className="py-2.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 text-xs font-bold font-mono uppercase tracking-wider transition"
                        >
                          Checkout Securely
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
                        <ShoppingCart className="w-6 h-6 animate-pulse" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Takeout Order Transmitted!</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Order compiled perfectly. On a custom live setup, we link this to **Stripe API** for secure billing, print the ticket in the kitchen, and send table updates directly via SMS.
                      </p>
                      <button
                        onClick={() => {
                          setOrderPlaced(false);
                          setCart({});
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition"
                      >
                        Reset Takeout Cart
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Elite Fit Simulator */}
              {activeSandbox === 'elite-fit' && (
                <div className="space-y-5">
                  {!isJoined ? (
                    <div className="space-y-4">
                      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-300">
                        🏋️ <strong>Custom Gym Membership Onboarding:</strong> Preview your direct registration card and billing timeline.
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Your Full Name:</label>
                        <input
                          type="text"
                          value={memberName}
                          onChange={(e) => setMemberName(e.target.value)}
                          className="w-full bg-[#07070A] border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setTierSelection('standard')}
                          className={`p-4 rounded-xl border text-left transition ${
                            tierSelection === 'standard'
                              ? 'border-emerald-500 bg-emerald-500/5'
                              : 'border-slate-900 bg-slate-950/40 hover:border-slate-800'
                          }`}
                        >
                          <span className="block text-[10px] font-mono text-slate-500">Standard Tier</span>
                          <span className="block text-sm font-bold text-white mt-1">$49/mo</span>
                          <span className="block text-[9px] text-slate-400 mt-1">General gym access.</span>
                        </button>
                        
                        <button
                          onClick={() => setTierSelection('elite')}
                          className={`p-4 rounded-xl border text-left transition ${
                            tierSelection === 'elite'
                              ? 'border-emerald-500 bg-emerald-500/5'
                              : 'border-slate-900 bg-slate-950/40 hover:border-slate-800'
                          }`}
                        >
                          <span className="block text-[10px] font-mono text-slate-500">Elite Coach Tier</span>
                          <span className="block text-sm font-bold text-white mt-1">$129/mo</span>
                          <span className="block text-[9px] text-slate-400 mt-1">Custom coaching + spa.</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setIsJoined(true)}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition"
                      >
                        Register Member Card
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-4">
                      {/* Virtual Membership Card Mockup */}
                      <div className="max-w-sm mx-auto p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-indigo-900 border border-emerald-400/20 text-left relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-mono tracking-widest text-emerald-300 uppercase font-bold">Iron Roots Athletics</span>
                            <h4 className="text-lg font-bold text-white mt-0.5">{memberName}</h4>
                          </div>
                          <span className="text-[9px] font-mono text-white/50 border border-white/20 px-2 py-0.5 rounded uppercase">
                            {tierSelection}
                          </span>
                        </div>

                        <div className="mt-8 flex justify-between items-end">
                          <div>
                            <span className="block text-[9px] text-emerald-300 uppercase font-mono">Member ID</span>
                            <span className="text-xs font-mono text-white">#IR-7762-921</span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[9px] text-emerald-300 uppercase font-mono">Status</span>
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Active Card
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Membership active! Real portal setups synchronize client billing cycles with **Stripe Billing**, allowing customers to manage card profiles on autopilot.
                      </p>

                      <button
                        onClick={() => setIsJoined(false)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition"
                      >
                        Change Onboarding Settings
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 4. Vanguard Legal Simulator */}
              {activeSandbox === 'vanguard-legal' && (
                <div className="space-y-5">
                  {!formSubmitted ? (
                    <div className="space-y-4">
                      <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-xs text-cyan-300">
                        ⚖️ <strong>Dynamic Lead Evaluation Engine:</strong> Answer the structural legal checklist questions to generate instant diagnostic files.
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Case Category Type:</label>
                        <select
                          value={caseType}
                          onChange={(e) => setCaseType(e.target.value)}
                          className="w-full bg-[#07070A] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="Business Contract Dispute">💼 Business Contract Dispute / Partnership</option>
                          <option value="Intellectual Property Breach">🛡️ Intellectual Property / Trademarks</option>
                          <option value="Commercial Real Estate Dispute">🏢 Commercial Real Estate / Lease Disputes</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Estimated Business Impact Claim:</label>
                        <select
                          value={claimValue}
                          onChange={(e) => setClaimValue(e.target.value)}
                          className="w-full bg-[#07070A] border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="$10k - $50k">$10k - $50k</option>
                          <option value="$50k - $150k">$50k - $150k</option>
                          <option value="$150k - $500k+">$150k - $500k+</option>
                        </select>
                      </div>

                      <button
                        onClick={() => setFormSubmitted(true)}
                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition"
                      >
                        Submit Secure Evaluation File
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-2">
                        <FileText className="w-6 h-6 animate-pulse" />
                      </div>
                      <h4 className="text-lg font-bold text-white">Evaluation Transmitted Securly!</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Case metadata saved. High-ticket law platforms automatically route these leads directly to custom CRM dashboards, encrypt uploads, and notify defense attorneys instantly.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition"
                      >
                        Restart Case Demo
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Modal footer */}
            <div className="p-5 border-t border-slate-900 bg-slate-950 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Interactive Mock Simulator
              </span>
              <button
                onClick={() => {
                  setActiveSandbox(null);
                  setAppointmentConfirmed(false);
                  setOrderPlaced(false);
                  setIsJoined(false);
                  setFormSubmitted(false);
                  scrollToForm();
                }}
                className="text-purple-400 hover:text-purple-300 font-bold"
              >
                Let's Build Yours Now <ArrowRight className="inline w-3 h-3 ml-1" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
