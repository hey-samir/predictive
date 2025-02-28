'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import PredictionsSection from '../components/PredictionsSection';
import HistorySection from '../components/HistorySection';
import AboutSection from '../components/AboutSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('predictive25');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-['Inter']">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-grow px-4 py-8">
        {activeSection === 'predictive25' && <PredictionsSection />}
        {activeSection === 'history' && <HistorySection />}
        {activeSection === 'about' && <AboutSection />}
      </main>
      
      <footer className="bg-[#8A3FFC] text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="font-medium">Predictive © {new Date().getFullYear()}</p>
            <p className="text-sm mt-2 text-gray-200">
              Built by <a href="https://samir.xyz" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Interspace Ventures</a> for personal use using <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Replit AI</a> and <a href="https://streamlit.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Streamlit</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}