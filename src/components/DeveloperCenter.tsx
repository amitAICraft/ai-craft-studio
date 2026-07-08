import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, Database, Cpu, Globe, Users, RefreshCw, Layers, PhoneCall, Bot, ArrowRight } from 'lucide-react';
import { ContactInquiry } from '../types';

export default function DeveloperCenter() {
  const [activeTab, setActiveTab] = useState<'fastapi' | 'postgres' | 'nextjs' | 'pipeline'>('fastapi');
  const [copied, setCopied] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  
  // Pipeline state
  const [submissions, setSubmissions] = useState<ContactInquiry[]>([]);
  const [selectedLead, setSelectedLead] = useState<ContactInquiry | null>(null);
  const [loadingPipeline, setLoadingPipeline] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Fetch submissions from local full-stack server
  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoadingPipeline(true);
      try {
        const response = await fetch('/api/v1/agency/submissions');
        const data = await response.json();
        if (data.success) {
          setSubmissions(data.submissions);
          if (data.submissions.length > 0 && !selectedLead) {
            setSelectedLead(data.submissions[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load lead pipeline submissions from server:', err);
      } finally {
        setLoadingPipeline(false);
      }
    };

    fetchSubmissions();
  }, [refreshTrigger, activeTab]);

  const fastapiCode = `from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import logging
from typing import List, Optional
from enum import Enum

# Setup logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("AICraftStudio")

app = FastAPI(
    title="AI Craft Studio - Production Engine",
    description="High-ticket B2B CRM, Intake & AI Orchestration Gateway API",
    version="1.0.0"
)

# Open CORS Policy - Configured for cross-origin local and cloud clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Strict Enum for requested Niche Sectors
class NicheSector(str, Enum):
    medical_clinic = "Medical/Dental Clinic"
    law_firm = "Law/Accountancy Firm"
    restaurant = "Restaurant & Hospitality"
    school = "Schools & Colleges"
    gym = "Gym & Health Center"
    other = "Other Commercial Sectors"

# Pydantic Schemas for Strict Input Validation
class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Contact display name")
    email: EmailStr = Field(..., description="Corporate business email")
    phone: str = Field(..., min_length=10, max_length=20, description="International business telephone")
    industry: NicheSector = Field(..., description="Target high-ticket business sector")
    description: str = Field(..., min_length=10, max_length=2000, description="Detailed bottleneck analysis")

class ContactInquiryResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
    industry: str
    description: str
    created_at: str

# Database Connection Pool Dependency
def get_db_connection():
    try:
        conn = psycopg2.connect(
            dsn=os.getenv("DATABASE_URL"),
            cursor_factory=RealDictCursor
        )
        try:
            yield conn
        finally:
            conn.close()
    except Exception as e:
        logger.error(f"PostgreSQL connection pool failure: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="High-availability database tier is currently unreachable."
        )

@app.post(
    "/api/v1/agency/contact",
    status_code=status.HTTP_201_CREATED,
    response_description="Successfully ingested, parsed, and logged lead inquiry into database."
)
async def create_contact_inquiry(
    payload: ContactInquiryCreate,
    db=Depends(get_db_connection)
):
    """
    Highly secure POST endpoint to ingest and validate client intake data,
    parse business bottleneck payloads, and log entries into PostgreSQL database.
    """
    # Map the validated fields and print clean, structured terminal logs
    logger.info("==================================================================")
    logger.info("--- INCOMING HIGH-TICKET DISCOVERY INTAKE VALIDATED ---")
    logger.info(f"Name: {payload.name}")
    logger.info(f"Email: {payload.email}")
    logger.info(f"Phone: {payload.phone}")
    logger.info(f"Sector/Niche: {payload.industry.value}")
    logger.info(f"Description: {payload.description}")
    logger.info("==================================================================")
    
    try:
        cursor = db.cursor()
        
        # SQL Insert with Safe Prepared Parameters to prevent SQL Injection
        insert_query = """
            INSERT INTO lead_inquiries (name, email, phone, industry, description)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, name, email, phone, industry, description, created_at;
        """
        
        cursor.execute(
            insert_query,
            (payload.name, payload.email, payload.phone, payload.industry.value, payload.description)
        )
        
        db.commit()
        inserted_lead = cursor.fetchone()
        cursor.close()
        
        logger.info(f"Successfully committed lead {inserted_lead['id']} into Supabase/PostgreSQL cluster.")
        return {
            "success": True,
            "message": "Lead ingested, sanitized, and stored securely.",
            "data": inserted_lead
        }
        
    except psycopg2.Error as pg_error:
        db.rollback()
        logger.critical(f"Database write failure in psycopg2 context: {str(pg_error)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Secure storage pipeline failed to commit records."
        )
    except Exception as e:
        logger.error(f"Unhandled endpoint exception: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Intake payload could not be parsed."
        )
`;

  const postgresCode = `-- Production Database Migration Setup for AI Craft Studio
-- Implements optimal indexes, strict constraints, and pgvector integrations
-- for future RAG-powered vector search embeddings.

-- Enable pgvector extension for high-performance AI document searching
CREATE EXTENSION IF NOT EXISTS pgvector;

-- Table to store standard sanitized CRM Lead Intakes
CREATE TABLE IF NOT EXISTS lead_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure clean corporate input records
    CONSTRAINT chk_email_format CHECK (email LIKE '%@%.%')
);

-- Optimize lead lookup queries for agency team members
CREATE INDEX IF NOT EXISTS idx_leads_industry ON lead_inquiries(industry);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON lead_inquiries(created_at DESC);


-- Vector Store Table for scaling client documents, transcripts, and voice logs
-- Enables custom RAG-powered chatbot systems and voice state retrieval
CREATE TABLE IF NOT EXISTS client_kb_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES lead_inquiries(id) ON DELETE CASCADE,
    document_title VARCHAR(255) NOT NULL,
    chunk_content TEXT NOT NULL,
    -- 1536-dimensional vector space matching standard Google/Gemini embedding formats
    embedding vector(1536) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- HNSW Vector Index optimized for fast Cosine Distance lookup in RAG pipelines
-- Provides high-concurrency search speed to handle live support queries under 30ms
CREATE INDEX IF NOT EXISTS idx_kb_embedding_hnsw 
ON client_kb_embeddings 
USING hnsw (embedding vector_cosine_ops);
`;

  const nextjsCode = `// Production-Ready Next.js Route Handler (App Router API Route)
// Route: /app/api/v1/agency/contact/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, industry, description } = body;

    // Sanitize input variables
    if (!name || !email || !phone || !industry || !description) {
      return NextResponse.json(
        { error: 'Missing mandatory client metadata parameters.' },
        { status: 400 }
      );
    }

    // Proxy request securely to high-performance FastAPI server
    const apiResponse = await fetch(\`\${process.env.BACKEND_API_URL}/api/v1/agency/contact\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Signature': process.env.API_SECRET_SIGNATURE || '',
      },
      body: JSON.stringify({ name, email, phone, industry, description }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return NextResponse.json(
        { error: errorData.detail || 'Internal database pipe failure.' },
        { status: apiResponse.status }
      );
    }

    const responseData = await apiResponse.json();
    return NextResponse.json(responseData, { status: 201 });

  } catch (err) {
    console.error('Fatal API routing exception in Next.js backend:', err);
    return NextResponse.json(
      { error: 'A critical server-side connection timeout occurred.' },
      { status: 500 }
    );
  }
}
`;

  const getCodeString = () => {
    switch (activeTab) {
      case 'fastapi': return fastapiCode;
      case 'postgres': return postgresCode;
      case 'nextjs': return nextjsCode;
      default: return '';
    }
  };

  const industryLabels: Record<string, string> = {
    medical_clinic: '🏥 Medical Clinic / Dentist',
    restaurant: '🍳 Restaurant & Hospitality',
    school: '🏫 Schools & Colleges',
    gym: '🏋️ Gyms & Fitness Centers',
    professional_services: '💼 Law Firm / Professional Services',
    other: '⚙️ Custom Enterprise / Other',
  };

  return (
    <section id="dev-center" className="py-24 border-t border-slate-900 bg-[#0B0B0F]/90 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" /> SYSTEM ARCHITECTURE & PROTOTYPE CONTROL
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-sans text-white tracking-tight">
            Client Production Architecture
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            We write clean, high-performance, production-ready code. Review the modular backend architecture, PostgreSQL database schemas, and API integration layers below.
          </p>
        </div>

        {!isRevealed ? (
          /* Collapsed Teaser Preview Card with Expand Action */
          <div className="max-w-4xl mx-auto bg-[#12121A]/40 border border-slate-900 rounded-2xl p-8 relative overflow-hidden text-center">
            {/* Ambient terminal-like code backdrop with bottom fade */}
            <div className="absolute inset-0 opacity-15 select-none pointer-events-none font-mono text-[10px] text-left p-6 space-y-1.5 overflow-hidden filter blur-[0.5px]">
              <div>import {`{ GoogleGenAI }`} from "@google/genai";</div>
              <div>const ai = new GoogleGenAI({`{ apiKey: process.env.GEMINI_API_KEY }`});</div>
              <div>CREATE TABLE IF NOT EXISTS lead_inquiries (</div>
              <div>    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),</div>
              <div>    name VARCHAR(150) NOT NULL,</div>
              <div>    email VARCHAR(255) NOT NULL,</div>
              <div>    CONSTRAINT chk_email_format CHECK (email LIKE '%@%.%')</div>
              <div>);</div>
              <div>@app.post("/api/v1/agency/contact")</div>
              <div>async def create_contact_inquiry(payload: ContactInquiryCreate):</div>
              <div>    logger.info("Ingesting client database records...")</div>
            </div>

            {/* Fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/90 to-transparent pointer-events-none" />

            <div className="relative z-10 py-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-400 font-mono uppercase tracking-wider mb-4">
                🔧 Secure Code Blueprints (Optional)
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                Want to review the technical details?
              </h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto mb-6">
                Explore our exact FastAPI route definitions, robust PostgreSQL DDL migration schemas, secure serverless proxy endpoints, and our live submission CRM pipeline dashboard.
              </p>
              
              <button
                onClick={() => setIsRevealed(true)}
                className="py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all shadow-md shadow-purple-900/40 inline-flex items-center gap-2"
              >
                Reveal System Blueprints & Live CRM Pipeline <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Fully Expanded Architecture Dashboard Code Panel */
          <div className="space-y-6 animate-fadeIn">
            {/* Collapse Button Header */}
            <div className="flex justify-end max-w-4xl mx-auto mb-2">
              <button
                onClick={() => setIsRevealed(false)}
                className="text-xs font-mono text-slate-500 hover:text-purple-400 transition"
              >
                ▲ Collapse Architecture panel
              </button>
            </div>

            {/* Tab buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-4xl mx-auto mb-8 bg-[#12121A] p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('fastapi')}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-mono text-xs font-medium transition-all duration-300 ${
                  activeTab === 'fastapi'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Terminal className="w-4 h-4" /> Python FastAPI
              </button>
              <button
                onClick={() => setActiveTab('postgres')}
                className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-mono text-xs font-medium transition-all duration-300 ${
                  activeTab === 'postgres'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
          >
            <Database className="w-4 h-4" /> Postgres SQL
          </button>
          <button
            onClick={() => setActiveTab('nextjs')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-mono text-xs font-medium transition-all duration-300 ${
              activeTab === 'nextjs'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-4 h-4" /> Next.js Route
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-mono text-xs font-medium transition-all duration-300 ${
              activeTab === 'pipeline'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4 animate-pulse" /> Live Lead Pipeline
          </button>
        </div>

        {/* Display Panel */}
        {activeTab !== 'pipeline' ? (
          // Code Terminal view
          <div className="bg-[#0B0B0F] rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl relative">
            <div className="flex items-center justify-between px-6 py-4 bg-[#12121A] border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-slate-500">
                  {activeTab === 'fastapi' && 'app/main.py'}
                  {activeTab === 'postgres' && 'db/migration.sql'}
                  {activeTab === 'nextjs' && 'api/contact/route.js'}
                </span>
              </div>
              <button
                onClick={() => handleCopy(getCodeString(), activeTab)}
                className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 hover:text-white transition bg-slate-800/50 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/50"
              >
                {copied === activeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </>
                )}
              </button>
            </div>

            <div className="p-6 overflow-x-auto font-mono text-[13px] leading-relaxed text-slate-300 max-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre">
                <code>{getCodeString()}</code>
              </pre>
            </div>
            
            <div className="p-4 bg-[#12121A]/50 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
              <span>🛡️ Production-ready secure API validation layer active</span>
              <span className="text-purple-400">Fully-optimized modern Next.js + FastAPI schemas</span>
            </div>
          </div>
        ) : (
          // Live Lead Pipeline View
          <div className="bg-[#0B0B0F] rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl relative min-h-[500px]">
            <div className="flex items-center justify-between px-6 py-4 bg-[#12121A] border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="font-sans font-bold text-sm text-white">Live Lead CRM Dashboard</span>
                <span className="text-xs text-slate-500 font-mono">({submissions.length} leads logged)</span>
              </div>
              <button
                onClick={() => setRefreshTrigger((prev) => prev + 1)}
                disabled={loadingPipeline}
                className="flex items-center gap-1.5 font-mono text-xs text-slate-400 hover:text-white transition bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingPipeline ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>

            {submissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <Users className="w-12 h-12 text-slate-700 mb-4 animate-bounce" />
                <h4 className="text-white font-bold text-lg">No Inbound Leads Detected</h4>
                <p className="text-slate-500 text-sm max-w-md mt-2">
                  Submit the intake diagnostic form in the Hero section above to trigger a server-side diagnostic, write the data to local storage, and watch it populate here in real-time.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
                
                {/* Sidebar list */}
                <div className="md:col-span-4 max-h-[450px] overflow-y-auto divide-y divide-slate-800/50 bg-[#0B0B0F]">
                  {submissions.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedLead(sub)}
                      className={`w-full text-left p-4 hover:bg-slate-900/40 transition flex flex-col gap-1.5 ${
                        selectedLead?.id === sub.id ? 'bg-purple-950/15 border-l-2 border-purple-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white truncate max-w-[120px]">{sub.name}</span>
                        <span className="text-[9px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/15 shrink-0">
                          {sub.aiBlueprint?.estimatedRoi || 'Pending ROI'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 truncate">{sub.email}</span>
                      <span className="text-[10px] font-mono text-slate-400">{industryLabels[sub.industry] || sub.industry}</span>
                    </button>
                  ))}
                </div>

                {/* Main detail content panel */}
                <div className="md:col-span-8 p-6 md:p-8 bg-[#12121A]/30 max-h-[450px] overflow-y-auto">
                  {selectedLead ? (
                    <div className="space-y-6">
                      
                      {/* Meta header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                        <div>
                          <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
                          <p className="text-xs text-slate-400 font-mono mt-1">{selectedLead.email} • {selectedLead.phone}</p>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-xs">
                          <span className="text-purple-400 font-semibold bg-purple-500/10 border border-purple-500/25 px-2.5 py-1 rounded">
                            {selectedLead.aiBlueprint?.estimatedRoi}
                          </span>
                          <span className="text-[10px] text-slate-600 mt-1">Lead ID: {selectedLead.id}</span>
                        </div>
                      </div>

                      {/* Bottleneck description */}
                      <div>
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Original Client Inquiry Bottlenecks</h4>
                        <div className="p-4 bg-[#0B0B0F] border border-slate-800 rounded-xl text-slate-300 text-sm leading-relaxed">
                          "{selectedLead.description}"
                        </div>
                      </div>

                      {/* AI Generated Analysis */}
                      <div>
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Server-Side Gemini Strategic Blueprint</h4>
                        <div className="p-4 bg-purple-500/5 border border-purple-500/15 rounded-xl text-slate-200 text-sm leading-relaxed">
                          {selectedLead.aiBlueprint?.analysis}
                        </div>
                      </div>

                      {/* Upsell channels detail */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-[#0B0B0F] border border-slate-800 rounded-xl">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 mb-1.5 uppercase font-mono">
                            <PhoneCall className="w-3.5 h-3.5" /> AI Voice Agency (Vapi)
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {selectedLead.aiBlueprint?.voiceAgentUseCase}
                          </p>
                        </div>
                        <div className="p-4 bg-[#0B0B0F] border border-slate-800 rounded-xl">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400 mb-1.5 uppercase font-mono">
                            <Bot className="w-3.5 h-3.5" /> Support Bot (RAG/FastAPI)
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {selectedLead.aiBlueprint?.supportBotUseCase}
                          </p>
                        </div>
                      </div>

                      {/* Suggested modules list */}
                      <div>
                        <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2.5">Suggested Architecture Upgrades</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedLead.aiBlueprint?.suggestedModules.map((m, i) => (
                            <span key={i} className="text-xs bg-purple-500/10 border border-purple-500/20 text-white px-3 py-1.5 rounded-lg font-medium">
                              🛠️ {m}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12 text-slate-500">
                      <ArrowRight className="w-8 h-8 text-slate-700 mb-2 rotate-90 md:rotate-0" />
                      Select a lead from the pipeline list on the left to inspect logs and AI insights.
                    </div>
                  )}
                </div>

              </div>
            )}

            <div className="p-4 bg-[#12121A]/50 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
              <span>🚀 Local server-side submission write logs validated.</span>
              <span className="text-purple-400">Database Engine Option: PostgreSQL Relational Schema</span>
            </div>
          </div>
        )}
        </div>
      )}

      </div>
    </section>
  );
}
