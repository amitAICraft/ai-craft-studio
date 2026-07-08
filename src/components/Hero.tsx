import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Bot, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Activity,
  Heart,
  Briefcase,
  Utensils,
  GraduationCap,
  Dumbbell,
  Globe
} from 'lucide-react';

interface NicheMetadata {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  accentColor: string;
  appTitle: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  stat3Label: string;
  stat3Value: string;
  liveLogs: string[];
  features: string[];
}

export default function Hero() {
  const [selectedNiche, setSelectedNiche] = useState<string>('medical_clinic');
  const [activeTab, setActiveTab] = useState<'analytics' | 'activity' | 'settings'>('analytics');
  const [logCounter, setLogCounter] = useState<number>(0);
  const [customLogs, setCustomLogs] = useState<string[]>([]);

  const niches: NicheMetadata[] = [
    {
      id: 'medical_clinic',
      name: 'Medical/Dental',
      icon: Heart,
      accentColor: 'from-emerald-400 to-teal-500',
      appTitle: 'MediFlow Clinic Portal',
      stat1Label: 'Patient Check-ins',
      stat1Value: '142',
      stat2Label: 'Appt. Automation',
      stat2Value: '98.4%',
      stat3Label: 'No-Show Reduction',
      stat3Value: '-34%',
      liveLogs: [
        'Dr. Arthur approved patient check-in brief',
        'SMS reminder sent to Mrs. Davis for 4 PM cleaning',
        'Auto-synced dental records with secure cloud insurance endpoint',
        'New patient completed intake form via digital dashboard'
      ],
      features: [
        'HIPAA-Compliant Database',
        'Auto-SMS & Call Reminders',
        'Insurance Verification Engine',
        'Doctor-Patient Custom Portal'
      ]
    },
    {
      id: 'professional_services',
      name: 'Law/Finance',
      icon: Briefcase,
      accentColor: 'from-blue-400 to-indigo-500',
      appTitle: 'LexSecure Client Hub',
      stat1Label: 'Active Cases',
      stat1Value: '48',
      stat2Label: 'Client Portal Logs',
      stat2Value: '100%',
      stat3Label: 'Retainer Volume',
      stat3Value: '$124K',
      liveLogs: [
        'Secure retainer agreement e-signed by client',
        'Automated billing trigger updated on active docket',
        'New custom inquiry decrypted & logged inside CRM database',
        'Consultation booked automatically for Monday 10:00 AM'
      ],
      features: [
        'Secure Document Vault',
        'E-Signature Automation',
        'Encrypted Inquiry Pipeline',
        'Retainer Billing Integration'
      ]
    },
    {
      id: 'restaurant',
      name: 'Restaurant/Café',
      icon: Utensils,
      accentColor: 'from-amber-400 to-orange-500',
      appTitle: 'GastroTable Custom Engine',
      stat1Label: 'Covers Today',
      stat1Value: '380',
      stat2Label: 'Online Reserves',
      stat2Value: '84%',
      stat3Label: 'Order Speed-up',
      stat3Value: '15.2 Min',
      liveLogs: [
        'Table 14 reservation auto-assigned via smart seating logic',
        'Pre-order deposit processed for High-Ticket VIP room',
        'Live menu pricing auto-updated on web frontend',
        'Customer feedback automated sms dispatched'
      ],
      features: [
        'Dynamic Floor Management',
        'Pre-Order Payment Gateways',
        'Zero-Commission Booking',
        'Instant Multi-Channel Alerts'
      ]
    },
    {
      id: 'school',
      name: 'Academia/School',
      icon: GraduationCap,
      accentColor: 'from-purple-400 to-violet-500',
      appTitle: 'EduSphere Academic Portal',
      stat1Label: 'Active Students',
      stat1Value: '850',
      stat2Label: 'Parent Inquiries',
      stat2Value: '12',
      stat3Label: 'Staff Hours Saved',
      stat3Value: '35h/wk',
      liveLogs: [
        'Parent-teacher scheduler block auto-reserved by parent',
        'Admission portal intake data saved to primary database',
        'Dynamic digital report cards compiled for standard V',
        'Live emergency notices synced across student devices'
      ],
      features: [
        'Secure Parent-Teacher Schedulers',
        'Self-Serve Admissions Portal',
        'Staff Time Optimization Hub',
        'Student Profile Databases'
      ]
    },
    {
      id: 'gym',
      name: 'Gym/Fitness',
      icon: Dumbbell,
      accentColor: 'from-rose-400 to-red-500',
      appTitle: 'AeroGym Active Portal',
      stat1Label: 'Member Check-ins',
      stat1Value: '290',
      stat2Label: 'Class Occupancy',
      stat2Value: '94%',
      stat3Label: 'Recurring Revenue',
      stat3Value: '+$14.2K',
      liveLogs: [
        'QR Code scanned at turnstile — member verified',
        'Class waitlist auto-promoted member 4 to active slot',
        'Automated renewal invoice processed successfully',
        'New PT consultation scheduled with Trainer Sam'
      ],
      features: [
        'Integrated QR Attendance Check',
        'Dynamic Session Waitlists',
        'Automated Subscription Engine',
        'Trainer-Client Fitness Boards'
      ]
    }
  ];

  const currentNiche = niches.find(n => n.id === selectedNiche) || niches[0];

  useEffect(() => {
    // Periodically shift activity logs to simulate a real, live web app database running
    const interval = setInterval(() => {
      setLogCounter(prev => (prev + 1) % currentNiche.liveLogs.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [selectedNiche, currentNiche]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToWork = () => {
    const workSection = document.getElementById('portfolio');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-[#07070A] flex items-center overflow-hidden">
      {/* Dynamic ambient grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#11111a_1px,transparent_1px),linear-gradient(to_bottom,#11111a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40" />

      {/* Decorative premium neon glowing elements */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: Persuasive value proposition focusing on custom web applications */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Elegant Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-6 w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> BESPOKE WEB APPLICATION DESIGN
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans text-white tracking-tight leading-[1.1]"
            >
              We Build High-Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
                Web Applications
              </span> <br />
              For Local Businesses.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-slate-300 text-base md:text-lg leading-relaxed max-w-xl"
            >
              Stop settling for basic templates. We engineer advanced, custom web applications fitted with live booking schedulers, customer databases, real-time lead pipelines, and integrated AI helpers that run your operations automatically.
            </motion.p>

            {/* Strategic proof points */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 grid sm:grid-cols-2 gap-5 max-w-xl"
            >
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Full Database Integration</h4>
                  <p className="text-xs text-slate-400 mt-1">Keep client profiles, transaction databases, and booking logs synced securely.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Automated Booking Engines</h4>
                  <p className="text-xs text-slate-400 mt-1">Dynamic schedules mapped directly to your workflow to reduce phone-call workload.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Premium Customer Portals</h4>
                  <p className="text-xs text-slate-400 mt-1">Give clients a high-end personal interface to book, e-sign, and pay online.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Fluid Mobile-First UI</h4>
                  <p className="text-xs text-slate-400 mt-1">Liquid layout, lightning load speeds, and stunning visual touchpoints.</p>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center max-w-md"
            >
              <button
                onClick={scrollToContact}
                className="group relative flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-purple-900/30 hover:shadow-purple-500/20 active:scale-[0.99] cursor-pointer"
              >
                Launch Your App Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={scrollToWork}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-[#12121A]/50 hover:border-purple-500/20 text-slate-300 hover:text-white text-sm font-semibold transition cursor-pointer"
              >
                View Live Mockups
              </button>
            </motion.div>

            {/* Micro Trust Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 p-3.5 rounded-xl border border-slate-900 bg-slate-950/30 backdrop-blur-sm flex items-center gap-3.5 max-w-lg"
            >
              <ShieldCheck className="w-5.5 h-5.5 text-purple-500 shrink-0" />
              <p className="text-xs text-slate-400 leading-snug">
                <span className="text-white font-medium">Built to Scale:</span> Every web application incorporates optimized cloud databases, serverless architecture, and enterprise security as standard.
              </p>
            </motion.div>
          </div>

          {/* RIGHT: High-Converting Dynamic Web Application Interactive Mockup Dashboard */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative w-full"
          >
            {/* Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-25 animate-pulse" />
            
            {/* Core Card Container */}
            <div className="relative bg-[#0F0F16] border border-slate-800/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden min-h-[580px]">
              
              {/* Top Section: App Header and Niche Tabs */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <div>
                      <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest">Active Application Preview</h3>
                      <h2 className="text-base font-bold text-white tracking-tight mt-0.5">{currentNiche.appTitle}</h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-800/85 px-2.5 py-1 rounded-lg">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-[10px] font-mono text-slate-400 font-medium">SERVER LIVE</span>
                  </div>
                </div>

                {/* Industry Selector Tabs */}
                <div className="flex flex-wrap gap-1.5 mb-5 p-1 rounded-xl bg-slate-950 border border-slate-900">
                  {niches.map(n => {
                    const NicheIcon = n.icon;
                    const isSelected = selectedNiche === n.id;
                    return (
                      <button
                        key={n.id}
                        onClick={() => setSelectedNiche(n.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                          isSelected 
                            ? 'bg-purple-600 text-white shadow-md' 
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <NicheIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{n.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Simulated App Core Navigation Tabs */}
                <div className="flex gap-4 border-b border-slate-900 pb-3 mb-5">
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`text-xs font-semibold pb-1 border-b-2 transition cursor-pointer ${
                      activeTab === 'analytics' ? 'border-purple-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    📊 Live Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('activity')}
                    className={`text-xs font-semibold pb-1 border-b-2 transition cursor-pointer ${
                      activeTab === 'activity' ? 'border-purple-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    ⚡ Automated Pipelines
                  </button>
                </div>

                {/* Dynamic Screen Content container */}
                <AnimatePresence mode="wait">
                  {activeTab === 'analytics' ? (
                    <motion.div
                      key={`analytics-${selectedNiche}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      {/* Metric Bento Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl flex flex-col justify-between">
                          <span className="text-[10px] font-mono text-slate-500 uppercase">{currentNiche.stat1Label}</span>
                          <span className="text-lg font-bold text-white mt-1">{currentNiche.stat1Value}</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl flex flex-col justify-between">
                          <span className="text-[10px] font-mono text-slate-500 uppercase">{currentNiche.stat2Label}</span>
                          <span className="text-lg font-bold text-white mt-1 text-purple-400">{currentNiche.stat2Value}</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl flex flex-col justify-between">
                          <span className="text-[10px] font-mono text-slate-500 uppercase">{currentNiche.stat3Label}</span>
                          <span className="text-lg font-bold text-emerald-400 mt-1">{currentNiche.stat3Value}</span>
                        </div>
                      </div>

                      {/* Visual Booking Graph Simulation */}
                      <div className="bg-slate-950/70 border border-slate-900/80 p-4 rounded-xl relative overflow-hidden">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-purple-400" /> Weekly Activity Load
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">MON - SUN</span>
                        </div>
                        {/* Custom visual SVG chart representing smooth analytics */}
                        <div className="h-24 flex items-end justify-between gap-1 pt-4 relative">
                          <svg className="absolute inset-x-0 bottom-0 h-16 w-full text-purple-500/20" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <path d="M0,80 Q15,40 30,70 T60,30 T90,50 T100,10 L100,100 L0,100 Z" fill="currentColor" />
                            <path d="M0,80 Q15,40 30,70 T60,30 T90,50 T100,10" fill="none" stroke="rgb(168, 85, 247)" strokeWidth="2.5" />
                          </svg>
                          <div className="w-full flex justify-between px-1 text-[9px] font-mono text-slate-600 mt-1 z-10 absolute bottom-0">
                            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                          </div>
                          {/* Interactive live pulsing coordinates */}
                          <div className="absolute top-2 right-12 flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-600 border border-purple-400/20 text-[9px] font-bold text-white">
                            Active peak load: +120%
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`pipelines-${selectedNiche}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Interactive Automation Status Indicators */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-3">
                          <div className="p-2 bg-purple-600/10 border border-purple-500/20 rounded-lg text-purple-400">
                            <Bot className="w-4 h-4 shrink-0" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">Voice Agent</h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">Active & Booking</p>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-3">
                          <div className="p-2 bg-emerald-600/10 border border-emerald-500/20 rounded-lg text-emerald-400">
                            <MessageSquare className="w-4 h-4 shrink-0" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">SMS Autopilot</h4>
                            <p className="text-[10px] text-slate-500 mt-0.5">Sent logs: 1,420</p>
                          </div>
                        </div>
                      </div>

                      {/* Configured Features checklist for customer */}
                      <div className="bg-slate-950/70 border border-slate-900/80 p-4 rounded-xl">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2.5">Engineered Modules Active</span>
                        <div className="grid grid-cols-2 gap-2">
                          {currentNiche.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                              <span className="text-emerald-400">✔</span>
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Live Simulated Activity Feed */}
                <div className="mt-5 bg-slate-950/90 border border-slate-900 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" /> LIVE APP DATABASE EVENTS
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">Real-time Feed</span>
                  </div>
                  <div className="space-y-2 max-h-24 overflow-hidden relative">
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
                    <AnimatePresence mode="popLayout">
                      {currentNiche.liveLogs.map((log, index) => {
                        const isSelectedLog = index === logCounter;
                        return (
                          <motion.div
                            key={`${selectedNiche}-log-${index}-${isSelectedLog}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isSelectedLog ? 1 : 0.25, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex items-start gap-2.5 text-[11px] font-mono text-slate-300"
                          >
                            <span className="text-purple-400 font-semibold shrink-0">[{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                            <span className="leading-snug">{log}</span>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Trigger Area */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/40 p-4 rounded-xl">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">WANT A CUSTOM PORTAL LIKE THIS?</span>
                  <span className="text-xs font-semibold text-white mt-0.5">Let's build one tailored to your business sector.</span>
                </div>
                <button
                  onClick={scrollToContact}
                  className="w-full sm:w-auto px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold font-mono tracking-wide uppercase transition cursor-pointer"
                >
                  Configure My App ⚡
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
