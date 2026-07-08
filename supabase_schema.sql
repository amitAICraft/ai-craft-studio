-- Create the agency_leads table in Supabase
CREATE TABLE IF NOT EXISTS public.agency_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    industry TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on the table
ALTER TABLE public.agency_leads ENABLE ROW LEVEL SECURITY;

-- Create an insert-only public policy (so the frontend/backend anon role can insert leads securely)
CREATE POLICY "Allow anonymous insertions" 
ON public.agency_leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create a policy allowing authenticated users or admin dashboard queries to select (optional)
CREATE POLICY "Allow select for authenticated users" 
ON public.agency_leads 
FOR SELECT 
TO authenticated 
USING (true);

-- Comment on table and columns for clarity
COMMENT ON TABLE public.agency_leads IS 'Captures high-ticket inbound leads for AI Craft Studio';
COMMENT ON COLUMN public.agency_leads.id IS 'Unique identifier for each lead';
COMMENT ON COLUMN public.agency_leads.name IS 'Full name of the contact person';
COMMENT ON COLUMN public.agency_leads.email IS 'Primary contact email';
COMMENT ON COLUMN public.agency_leads.phone IS 'Contact number (WhatsApp preferred)';
COMMENT ON COLUMN public.agency_leads.industry IS 'Sector or business niche of the client';
COMMENT ON COLUMN public.agency_leads.message IS 'Raw message, project description or AI planner details';
COMMENT ON COLUMN public.agency_leads.created_at IS 'Timestamp of lead ingestion';
