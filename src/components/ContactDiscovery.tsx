import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Sparkles, 
  Loader2, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Bot, 
  RefreshCw, 
  Calendar, 
  Layers, 
  Clock, 
  Check, 
  HelpCircle,
  Building,
  User,
  Zap,
  DollarSign
} from 'lucide-react';
import { ContactInquiry } from '../types';

export default function ContactDiscovery() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    industry: 'medical_clinic',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blueprint, setBlueprint] = useState<ContactInquiry | null>(null);

  // Simple Estimator Interactive State
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'online_booking',
    'mobile_ready'
  ]);

  const featuresList = [
    { id: 'mobile_ready', label: '📱 Mobile-Friendly Design', desc: 'Looks stunning on all phones', duration: 1 },
    { id: 'online_booking', label: '📅 Easy Booking System', desc: 'Customers book slots online', duration: 3 },
    { id: 'whatsapp_alerts', label: '💬 WhatsApp/SMS Alerts', desc: 'Sends reminders to customers', duration: 2 },
    { id: 'online_payments', label: '💳 Safe Online Payments', desc: 'Accept cards, GPay, UPI directly', duration: 2 },
    { id: 'ai_assistant', label: '🤖 Smart AI Assistant Chatbot', desc: 'Answers questions 24/7 for you', duration: 3 },
    { id: 'admin_dashboard', label: '📊 Admin Dashboard', desc: 'See your customers & orders in one place', duration: 3 }
  ];

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      if (selectedFeatures.length > 1) { // keep at least one
        setSelectedFeatures(selectedFeatures.filter(f => f !== id));
      }
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const calculateEstimation = () => {
    let totalDays = 5; // Base website days
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build description automatically including features selected if they want
    const featuresLabelList = featuresList
      .filter(f => selectedFeatures.includes(f.id))
      .map(f => f.label)
      .join(', ');

    const detailedDescription = `[Selected Features: ${featuresLabelList}] - ${formData.description}`;

    try {
      const response = await fetch('/api/v1/agency/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          description: detailedDescription
        }),
      });

      const result = await response.json();
      if (result.success) {
        setBlueprint(result.data);
      } else {
        setError(result.error || 'Oops, we had a connection error. Please try again.');
      }
    } catch (err) {
      setError('Connection refused. Ensure full-stack server is active.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBlueprint(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      industry: 'medical_clinic',
      description: '',
    });
  };

  const industryLabels: Record<string, string> = {
    medical_clinic: '🏥 Medical, Dental & Healthcare',
    professional_services: '💼 Law, CA & Professional Office',
    restaurant: '🍳 Restaurant, Cafe & Bakery',
    school: '🏫 School, Coaching & Academy',
    gym: '🏋️ Gym, Yoga & Health Center',
    other: '⚙️ Other Local Business (Contractor, Shop, etc.)',
  };

  return (
    <section id="contact-us" className="py-24 border-t border-slate-900 bg-[#07070A] relative overflow-hidden">
      {/* Decorative ambient spots */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with simple welcoming copy */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> FREE DRAFT & WEBSITE ESTIMATION
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold font-sans text-white tracking-tight leading-tight"
          >
            Let's Start Your Website Journey
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Tell us about your business in normal, simple language. Our team and smart AI system will immediately draft your 
            <span className="text-purple-400 font-semibold"> custom proposal</span>, estimated timeframe, and recommended features!
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT PANEL: Interactive Estimator & Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Interactive Feature Planner Widget */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-slate-800 bg-[#0F0F16]/90 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded bg-purple-500/10 text-purple-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Interactive Website Planner</h3>
                  <p className="text-[11px] text-slate-400">Select options to see estimated project scale</p>
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
                          ? 'bg-purple-600/10 border-purple-500/40 text-white' 
                          : 'bg-slate-950 border-slate-900/60 text-slate-400 hover:border-slate-800 hover:text-slate-300'
                      }`}
                    >
                      <div className={`w-4.5 h-4.5 rounded mt-0.5 flex items-center justify-center border transition ${
                        isChecked ? 'bg-purple-600 border-purple-400 text-white' : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                      </div>
                      <div>
                        <span className="text-xs font-semibold block">{feature.label}</span>
                        <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">{feature.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Running estimate output */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-500 block uppercase text-[10px]">Estimated Delivery</span>
                  <span className="text-white font-bold text-sm flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> ~{estimation.days} Business Days
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block uppercase text-[10px]">Project Category</span>
                  <span className="text-purple-400 font-bold block text-xs mt-1">{estimation.complexity}</span>
                </div>
              </div>
            </motion.div>

            {/* Instant Contact Anchors */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-400 tracking-wide font-mono uppercase px-1">Or Reach Us Instantly:</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-purple-500/30 hover:bg-[#12121A]/50 transition-all group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600/10 border border-purple-500/20 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Call Direct</span>
                    <span className="text-xs font-semibold text-white group-hover:text-purple-400 transition-colors">+91 98765 43210</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210?text=Hello%20AI%20Craft%20Studio%21%20I%20run%20a%20local%20business%20and%20want%20to%20create%20a%20website%20using%20your%20services."
                  target="_blank"
                  referrerPolicy="no-referrer"
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
            </div>

            {/* Map Canvas */}
            <div className="relative h-44 rounded-2xl border border-slate-900 overflow-hidden bg-[#0A0A0E]">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#161622_1px,transparent_1px),linear-gradient(to_bottom,#161622_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />
              
              <svg className="absolute inset-0 w-full h-full opacity-20 text-slate-700" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="40" x2="400" y2="40" stroke="currentColor" strokeWidth="1" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="1" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth="1.5" />
                <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="1" />
                <line x1="220" y1="0" x2="220" y2="200" stroke="currentColor" strokeWidth="1.5" />
              </svg>

              {/* Pulsing Locator Pin */}
              <div className="absolute top-[80px] left-[180px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-2 bg-purple-500 rounded-full blur opacity-55 animate-ping" />
                  <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#0B0B0F] border border-purple-500 text-purple-400 shadow-lg shadow-black">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                </div>
                <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-900 text-[8px] font-mono text-slate-300">
                  Mumbai Studio Office
                </div>
              </div>

              {/* Bottom Address Overlay */}
              <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg border border-slate-900/60 bg-slate-950/80 backdrop-blur-md flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span className="truncate">📍 Mira Road, Mumbai, Maharashtra</span>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=501,+3A,+NG+silver+spring,+Mira+Road+(E),+Mumbai-401107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 font-bold uppercase shrink-0 transition ml-2"
                >
                  Directions 🚗
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Friendly, Easy-to-Understand Form or AI Strategy Output */}
          <div className="lg:col-span-7 relative flex">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25" />
            
            <div className="relative w-full bg-[#12121A]/85 border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
              
              <AnimatePresence mode="wait">
                {!blueprint ? (
                  // Simple Intake Form
                  <motion.form 
                    key="intake-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" /> Web Project Inquiry Form
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Please fill in these simple details. We will prepare an exact price quote, timeline, and feature recommendations.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-950/40 border border-red-900/50 text-red-400 rounded-lg text-xs">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
                          <User className="w-3.5 h-3.5 text-purple-400" /> Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
                          <Mail className="w-3.5 h-3.5 text-purple-400" /> Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. rajesh@mybakery.com"
                          className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
                          <Phone className="w-3.5 h-3.5 text-purple-400" /> Phone Number (WhatsApp preferred)
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
                          <Building className="w-3.5 h-3.5 text-purple-400" /> What kind of business do you run?
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-sans cursor-pointer"
                        >
                          <option value="restaurant">🍳 Restaurant, Cafe & Bakery</option>
                          <option value="medical_clinic">🏥 Medical & Dental Clinic</option>
                          <option value="professional_services">💼 Law, CA & Consultation</option>
                          <option value="school">🏫 School, Coaching & Academy</option>
                          <option value="gym">🏋️ Gym, Yoga & Health Center</option>
                          <option value="other">⚙️ Other Local Shops / Service</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Tell us what you want on your website (Simple language is perfect!):
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="e.g. 'I run a local bakery and cafe. I need a modern website where people can view our regular menu, order party cakes in advance, and get WhatsApp reminders. It should be clean, attractive, and fast on mobile phones.'"
                        className="w-full bg-[#0B0B0F] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none font-sans leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm transition shadow-lg shadow-purple-900/30 hover:shadow-purple-500/20 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" /> Planning, Analyzing & Structuring Your Proposal...
                        </>
                      ) : (
                        <>
                          Generate My Custom Proposal & Plan <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  // Custom Generated Proposal Result Card
                  <motion.div 
                    key="proposal-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    {/* Strategy Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div>
                        <h4 className="text-[9px] font-mono text-purple-400 tracking-widest uppercase">✨ YOUR CUSTOM PROPOSAL IS READY</h4>
                        <h3 className="text-lg sm:text-xl font-bold text-white mt-1">Recommended Solution & Strategy</h3>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                        {blueprint.aiBlueprint?.estimatedRoi}
                      </div>
                    </div>

                    {/* Simple Explanation */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">How we will build it:</span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#0B0B0F]/90 p-4 rounded-xl border border-slate-900 font-sans">
                        {blueprint.aiBlueprint?.analysis}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Core Website Pages & Modules:</span>
                      <div className="flex flex-wrap gap-2">
                        {blueprint.aiBlueprint?.suggestedModules.map((mod, i) => (
                          <span key={i} className="text-[11px] bg-purple-500/10 border border-purple-500/20 text-white px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1">
                            ✨ {mod}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Automated Workflows (AI voice & chat helpers) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl border border-slate-900 bg-[#0B0B0F]/50">
                        <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[11px] mb-1.5 font-mono uppercase">
                          <PhoneCall className="w-3.5 h-3.5 text-purple-400 shrink-0" /> AI Phone Assistant Call-Intake
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {blueprint.aiBlueprint?.voiceAgentUseCase}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-900 bg-[#0B0B0F]/50">
                        <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[11px] mb-1.5 font-mono uppercase">
                          <Bot className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Web Smart Helper Bot
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {blueprint.aiBlueprint?.supportBotUseCase}
                        </p>
                      </div>
                    </div>

                    {/* Client CTA Panel */}
                    <div className="p-4 rounded-xl border border-dashed border-purple-500/25 bg-purple-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-white">Love this solution draft?</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Let's hop on a quick 10-minute call or WhatsApp to finalize your colors, images, and domain name!</p>
                      </div>
                      <a
                        href={`https://wa.me/919876543210?text=Hi!%20My%20name%20is%20${encodeURIComponent(formData.name)}.%20I%20just%20generated%20a%20website%20proposal%20on%20your%20site%20for%20my%20${encodeURIComponent(industryLabels[formData.industry] || 'business')}%20and%20I'd%20love%20to%20get%20started!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold font-sans tracking-wide transition shrink-0 whitespace-nowrap text-center w-full sm:w-auto"
                      >
                        Let's Talk & Build! 🚀
                      </a>
                    </div>

                    {/* Actions footer */}
                    <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex flex-col text-[9px] font-mono text-slate-500">
                        <span>Status: Proposal Ready ({estimation.complexity})</span>
                        <span>Estimated Turnaround: ~{estimation.days} Business Days</span>
                      </div>
                      <button
                        onClick={resetForm}
                        className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase border border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/10 px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" /> Start Another Estimate
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
