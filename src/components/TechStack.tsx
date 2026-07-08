import React, { useState } from 'react';
import { Cpu, ShieldCheck, Laptop, Database, Cloud, Sparkles, Terminal } from 'lucide-react';

interface TechItem {
  name: string;
  role: string;
  desc: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: TechItem[];
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: Category[] = [
    {
      id: 'frontend',
      label: 'Frontend Core',
      icon: Laptop,
      items: [
        { name: 'Next.js', role: 'Production Framework', desc: 'Server-side pre-rendering & dynamic routing for stellar SEO performance.' },
        { name: 'React 18', role: 'UI Library', desc: 'Component-driven interactive clients with lightning-fast state updates.' },
        { name: 'Tailwind CSS', role: 'Modern Styling', desc: 'Utility-first framework enabling highly responsive, beautiful designs.' },
        { name: 'TypeScript', role: 'Type Safety', desc: 'Strict compilation rules to eliminate runtime bugs before deployment.' },
        { name: 'Motion', role: 'Animation Engine', desc: 'Polished, performant micro-interactions and transition states.' },
        { name: 'Vite', role: 'Dev Tooling', desc: 'Ultra-fast build pipelines for instant local iteration cycles.' }
      ]
    },
    {
      id: 'backend',
      label: 'Backend & APIs',
      icon: Terminal,
      items: [
        { name: 'Python FastAPI', role: 'High-Performance APIs', desc: 'Asynchronous route execution yielding incredible request concurrency.' },
        { name: 'Node.js', role: 'Server Runtime', desc: 'Event-driven server engine supporting fully customized API layers.' },
        { name: 'Express / CJS', role: 'API Framework', desc: 'Reliable, modular full-stack routing and middleware controllers.' },
        { name: 'WebSockets', role: 'Real-Time Channels', desc: 'Bi-directional persistent pipes for instant data broadcasts & chat.' },
        { name: 'RESTful / JSON', role: 'Standard Schema', desc: 'Structured, human-readable data transport with complete validation.' },
        { name: 'OAuth 2.0', role: 'Secure Auth', desc: 'Industry-standard access delegations for third-party client integrations.' }
      ]
    },
    {
      id: 'database',
      label: 'Database & State',
      icon: Database,
      items: [
        { name: 'PostgreSQL', role: 'Relational Database', desc: 'Durable, acid-compliant relational engine for mission-critical client records.' },
        { name: 'Supabase', role: 'Serverless Database', desc: 'Auto-generated secure APIs, realtime listeners, and cloud buckets.' },
        { name: 'Drizzle ORM', role: 'SQL Companion', desc: 'Strict TypeScript schemas with ultra-fast database query compilation.' },
        { name: 'Redis', role: 'Caching Engine', desc: 'In-memory key-value database for instant cache replies and session states.' },
        { name: 'SQLite', role: 'Local Development', desc: 'Lightweight local filesystem database for rapid local prototype mock audits.' },
        { name: 'pgvector', role: 'Vector Search', desc: 'Specialized database extensions storing AI knowledge-bases and embeddings.' }
      ]
    },
    {
      id: 'cloud',
      label: 'Cloud & Integrations',
      icon: Cloud,
      items: [
        { name: 'Stripe API', role: 'Payment Core', desc: 'Fully compliant checkout processing with zero transaction friction.' },
        { name: 'Vercel Edge', role: 'Global Hosting', desc: 'Servers at the edge closest to your customers for instant response.' },
        { name: 'Docker Containers', role: 'Deployment Units', desc: 'Self-contained reliable builds running on secure Cloud Run infrastructure.' },
        { name: 'Shopify / Headless', role: 'Commerce Engine', desc: 'Robust storefront checkout logic separated from the custom UI layer.' },
        { name: 'AWS S3 Cloud', role: 'Asset Storage', desc: 'Highly durable global file storage buckets for user media uploads.' },
        { name: 'GitHub Actions', role: 'CI/CD Pipeline', desc: 'Automated speed and quality validation on every single code commit.' }
      ]
    }
  ];

  // Flat array of all technologies
  const allItems = categories.flatMap(cat => cat.items.map(item => ({ ...item, categoryId: cat.id })));

  const filteredItems = activeCategory === 'all' 
    ? allItems 
    : allItems.filter(item => item.categoryId === activeCategory);

  return (
    <section id="tech-stack" className="py-24 border-t border-slate-900 bg-[#0B0B0F] relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Intro Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-4">
              <Cpu className="w-3.5 h-3.5" /> THE TOOLS WE TRUST
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-sans text-white tracking-tight leading-none">
              Modern Tech Stack for Speed & Security
            </h2>
            <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
              We leverage an elite, uncompromised suite of technologies to guarantee your website loads in <span className="text-white font-medium">under 1 second</span>, scores perfectly on search engines, and remains completely secure under heavy production traffic.
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-900 bg-slate-950/40 shrink-0 max-w-sm lg:mb-1">
            <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0" />
            <span className="text-xs text-slate-400 leading-tight">
              <span className="text-white font-medium">Fully Configured & Managed:</span> We handle all cloud deployments, certificates, databases, and monitoring pipelines.
            </span>
          </div>
        </div>

        {/* Tab Selection Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-slate-900 pb-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all border ${
              activeCategory === 'all'
                ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/30'
                : 'bg-slate-950/40 text-slate-400 border-slate-900 hover:text-white hover:border-slate-800'
            }`}
          >
            All Tech Stack ({allItems.length})
          </button>
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/30'
                    : 'bg-slate-950/40 text-slate-400 border-slate-900 hover:text-white hover:border-slate-800'
                }`}
              >
                <CatIcon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Categorized Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((tech, i) => (
            <div
              key={i}
              className="group relative p-6 bg-[#12121A]/40 border border-slate-900 hover:border-purple-500/25 rounded-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Corner ambient hint */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-600/5 rounded-full blur-xl group-hover:bg-purple-600/10 transition-all duration-300" />
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-mono text-sm font-bold tracking-tight group-hover:text-purple-400 transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                    {tech.role}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mt-3 group-hover:text-slate-300 transition-colors">
                  {tech.desc}
                </p>
              </div>

              {/* Decorative accent dot */}
              <div className="mt-4 pt-3 border-t border-slate-900/40 flex items-center justify-between text-[10px] text-slate-600 font-mono">
                <span>Production Optimized</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:animate-ping" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
