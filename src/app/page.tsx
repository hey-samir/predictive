'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import PredictionsSection from '../components/PredictionsSection';
import HistorySection from '../components/HistorySection';
import AboutSection from '../components/AboutSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('predictive25');

  return (
    <div className="min-h-screen flex flex-col bg-app-background font-['Inter']">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-grow px-4 py-8">
        {activeSection === 'predictive25' && <PredictionsSection />}
        {activeSection === 'predictives' && <PredictionsSection />}
        {activeSection === 'awards' && <PredictionsSection />}
        {activeSection === 'history' && <HistorySection />}
        {activeSection === 'about' && <AboutSection />}
      </main>
      
      <footer className="bg-app-purple text-white py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="font-medium">Predictive © {new Date().getFullYear()}</p>
            <p className="text-sm mt-2 text-gray-200">
              Accurate Academy Award predictions using advanced data analysis and machine learning
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}