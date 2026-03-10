
import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

const serif = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  variable: '--font-serif',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'MindFlow | Step Into Your Resonance',
  description: 'A sanctuary for the human mind, sculpted by artificial intelligence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${serif.variable} ${mono.variable} font-mono antialiased bg-background text-foreground`}>
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
