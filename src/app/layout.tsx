import '../styles/globals.css';
import type { Metadata } from 'next';
import React from 'react';
import { inter } from '../lib/fonts';

export const metadata: Metadata = {
  title: 'Predictive | Oscar Predictions',
  description: 'Predictive uses sophisticated algorithms to predict the top Academy Award winners',
  icons: {
    icon: [
      {
        url: '/images/logo.png',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/images/logo.png',
        type: 'image/png',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-app-background text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}