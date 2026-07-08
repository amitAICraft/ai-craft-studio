import React from 'react';
import { motion } from 'motion/react';
import { Laptop, Database, ShoppingBag, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServiceGrid() {
  const services = [
    {
      title: 'Custom Web Development',
      description: 'Stunning, lightning-fast, and mobile-ready websites engineered to establish your business online, attract local customers, and convert them into regulars.',
      features: ['SEO-optimized to rank on Google Maps', 'Super easy-to-use layouts on phones', 'Clean and modern design matching your brand'],
      icon: Laptop,
      colorClass: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
      badge: 'Local Presence'
    },
    {
      title: 'Booking & Customer Portals',
      description: 'Interactive portals that allow your clients to schedule slots, sign contracts, and access services online without you having to manage phone calls 24/7.',
      features: ['Self-serve booking & calendar slots', 'Client profile & history dashboard', 'Automated text/email confirmations'],
      icon: Database,
      colorClass: 'text-violet-400 border-violet-500/20 bg-violet-500/5',
      badge: 'Time Saver'
    },
    {
      title: 'E-Commerce & Online Orders',
      description: 'Secure, hassle-free online stores and order systems. Perfect for restaurants, local shops, and delivery models looking to capture sales without commissions.',
      features: ['One-click safe payments (Stripe, UPI, Cards)', 'Easy inventory & menu manager', 'Direct order alerts to your phone'],
      icon: ShoppingBag,
      colorClass: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
      badge: 'Boost Revenue'
    },
    {
      title: 'AI Customer Helpers',
      description: 'Modern artificial intelligence assistants that run on your website to answer questions, explain pricing, and book clients even when you are asleep.',
      features: ['24/7 smart assistant answering FAQs', 'Instantly gets user details for follow-ups', 'Customized knowledge on your services'],
      icon: Sparkles,
      colorClass: 'text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5',
      badge: 'AI Systems'
    }
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact-us');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-24 border-t border-slate-900 bg-[#0B0B0F]/95 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> CUSTOM WEB SOLUTIONS
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-sans text-white tracking-tight"
          >
            Websites & Systems That Build Businesses
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            We design, develop, and host completely custom, modern, and highly interactive websites and portals so you can stand out from competition.
          </motion.p>
        </div>

        {/* Dynamic Solutions Grid */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-[#12121A]/50 border border-slate-900 hover:border-purple-500/35 rounded-2xl p-8 md:p-10 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual hover glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl group-hover:bg-purple-600/10 transition-all duration-300" />

                <div>
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-xl border ${service.colorClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-slate-950 border border-slate-900 text-slate-400">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mt-8 group-hover:text-purple-400 transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-400">
                        <CheckCircle2 className="w-4.5 h-4.5 text-purple-400 shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-900/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">Tailored For You</span>
                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 transition-all font-semibold cursor-pointer"
                  >
                    Discuss This Service <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
