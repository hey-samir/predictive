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
      
      <div className="flex-grow container mx-auto px-4 py-8">
        {activeSection === 'predictive25' && <PredictionsSection />}
        {activeSection === 'history' && <HistorySection />}
        {activeSection === 'about' && <AboutSection />}
      </div>
      
      <footer className="bg-[#9C27B0] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="font-medium">Predictive © {new Date().getFullYear()}</p>
            <p className="text-sm mt-2 text-gray-200">
              Built by Interspace Ventures for personal use using Replit AI and Streamlit
            </p>
            <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-200">
              <a href="https://samir.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Interspace Labs
              </a>
              <span>•</span>
              <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Replit AI
              </a>
              <span>•</span>
              <a href="https://streamlit.io" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Streamlit
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}