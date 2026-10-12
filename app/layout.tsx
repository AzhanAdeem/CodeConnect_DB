import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'Code//Connect’26 — "You Hungry? A Karachi Startup Story" Database Design Challenge',
  description:
    'UBIT, University of Karachi presents Code//Connect 2026: A 3-Round Database Design & System Architecture Challenge. 22-24 October 2026.',
  keywords: [
    'CodeConnect 2026',
    'UBIT',
    'University of Karachi',
    'Database Design',
    'Hackathon',
    'PostgreSQL',
    'SQL',
    'Sharding',
    'NoSQL',
  ],
  openGraph: {
    title: 'Code//Connect’26 — Database Design Challenge',
    description: 'A 3-Round Database Design Challenge: "You Hungry? - A Karachi Startup Story"',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
