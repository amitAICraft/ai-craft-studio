import '../src/index.css';

export const metadata = {
  title: 'AI Craft Studio | Premium Website Development & AI Support Solutions',
  description: 'AI Craft Studio is an elite digital agency specializing in premium website development, modern web design, enterprise-grade web applications, and custom AI support solutions such as voice receptionists and automated chatbot systems.',
  keywords: [
    'website development',
    'web design',
    'AI support solutions',
    'custom web design',
    'enterprise applications',
    'voice receptionists',
    'chatbot support solutions',
    'full-stack agency'
  ],
  metadataBase: new URL('https://ais-pre-3tfay2ht46gd6lwpbu7byu-114211182897.asia-east1.run.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AI Craft Studio | Premium Website Development & AI Support Solutions',
    description: 'Bespoke website development, high-end web design, and integrated AI agent systems.',
    url: 'https://ais-pre-3tfay2ht46gd6lwpbu7byu-114211182897.asia-east1.run.app',
    siteName: 'AI Craft Studio',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#0B0B0F] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
