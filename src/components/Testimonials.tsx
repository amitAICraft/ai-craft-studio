import React from 'react';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Heart, Utensils, GraduationCap, Dumbbell, Quote } from 'lucide-react';
import { Testimonial } from '../types';

export default function Testimonials() {
  const cases: Testimonial[] = [
    {
      id: 'medical_case',
      clientName: 'Dr. Evelyn Harris',
      companyName: 'Apex Family Orthodontics',
      industry: 'medical_clinic',
      metric: '45% Fewer Phone Calls & 30+ Hrs Saved/Wk',
      quote: 'AI Craft Studio replaced our manual phone scheduling with a custom automated online booking calendar. Now, 45% of patients book their appointments completely on autopilot. It completely saved our receptionists from burnout.',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150&q=80',
    },
    {
      id: 'restaurant_case',
      clientName: 'Marcello Moretti',
      companyName: 'Venezia Culinary Group',
      industry: 'restaurant',
      metric: 'Recaptured $8,200/Mo in Phone Takeout Losses',
      quote: 'We were losing dozens of reservation calls during weekend rushes. The digital menu and automated reservation assistant answer customer inquiries instantly, log reservations, and notify us of orders with zero mistakes.',
      avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&h=150&q=80',
    },
    {
      id: 'gym_case',
      clientName: 'Sarah Jenkins',
      companyName: 'Iron Roots Athletic Clubs',
      industry: 'gym',
      metric: '52% More Trial Sign-ups via Mobile Portal',
      quote: 'Our old website had very poor conversion rates. AI Craft Studio deployed a custom, lightning-fast membership portal with built-in billing. Trial registrations are now completed in under two minutes.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
    },
    {
      id: 'school_case',
      clientName: 'Dean Robert Vance',
      companyName: 'Oakridge Preparatory Academy',
      industry: 'school',
      metric: 'Saved 65% of Admissions Inquiries Overload',
      quote: 'Oakridge was buried in repetitive admissions emails. The smart web assistant they integrated answers parent questions with direct school policy citations in under three seconds. Our administrative load has plummeted.',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
    },
  ];

  const getIndustryIcon = (ind: string) => {
    switch (ind) {
      case 'medical_clinic': return <Heart className="w-4 h-4 text-rose-400" />;
      case 'restaurant': return <Utensils className="w-4 h-4 text-amber-400" />;
      case 'gym': return <Dumbbell className="w-4 h-4 text-cyan-400" />;
      case 'school': return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      default: return <Star className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section id="validation" className="py-24 border-t border-slate-900 bg-[#0B0B0F]/95 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> CLIENT TESTIMONIALS & RESULTS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-sans text-white tracking-tight"
          >
            Real Impact for Real Businesses
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            See how our custom web systems and modern online tools help local clinics, cafes, academies, and clubs grow without technical stress.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cases.map((cs, idx) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-[#12121A]/50 border border-slate-900 hover:border-purple-500/20 rounded-2xl p-8 relative flex flex-col justify-between transition-all duration-300"
            >
              <div className="absolute top-6 right-8 text-slate-800 pointer-events-none">
                <Quote className="w-16 h-16 opacity-10" />
              </div>

              <div>
                {/* Verification Badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-900 w-fit mb-6">
                  {getIndustryIcon(cs.industry)}
                  <span className="font-mono text-[10px] text-slate-300 uppercase tracking-widest font-semibold">{cs.companyName}</span>
                </div>

                {/* ROI Highlight */}
                <h4 className="text-lg font-bold text-white tracking-tight">
                  ⚡ Business Impact: <span className="text-purple-400 font-extrabold">{cs.metric}</span>
                </h4>

                {/* Case quote */}
                <p className="text-slate-300 text-sm mt-4 leading-relaxed italic">
                  "{cs.quote}"
                </p>
              </div>

              {/* User profile */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-900/80">
                <img
                  src={cs.avatarUrl}
                  alt={cs.clientName}
                  className="w-11 h-11 rounded-full object-cover border border-purple-500/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="text-sm font-bold text-white">{cs.clientName}</h5>
                  <p className="text-xs text-slate-500">{cs.companyName} • Business Owner</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
