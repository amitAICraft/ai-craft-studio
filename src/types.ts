export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  description: string;
  createdAt?: string;
  // AI-generated consultation details
  aiBlueprint?: {
    estimatedRoi: string;
    suggestedModules: string[];
    analysis: string;
    voiceAgentUseCase: string;
    supportBotUseCase: string;
  };
}

export type Industry = 'medical_clinic' | 'restaurant' | 'school' | 'gym' | 'professional_services' | 'other';

export interface Testimonial {
  id: string;
  clientName: string;
  companyName: string;
  industry: string;
  metric: string;
  quote: string;
  avatarUrl: string;
}

export interface ServiceModule {
  id: string;
  title: string;
  description: string;
  features: string[];
  isAiExpansion: boolean;
  techStack: string[];
  roiMetric: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  type: 'project' | 'retainer';
  tagline: string;
  features: string[];
  ctaText: string;
  isPopular: boolean;
}
