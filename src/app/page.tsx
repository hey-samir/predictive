'use client';

import { useState } from 'react';
import Header from '../components/Header';
import PredictionsSection from '../components/PredictionsSection';
import HistorySection from '../components/HistorySection';
import AboutSection from '../components/AboutSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('predictions');

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="flex-grow">
        {activeSection === 'predictions' && <PredictionsSection />}
        {activeSection === 'history' && <HistorySection />}
        {activeSection === 'about' && <AboutSection />}
      </div>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>Oscar Predictor © {new Date().getFullYear()} | The Predictive 25</p>
            <p className="text-sm mt-2 text-gray-400">
              Using data science to forecast Academy Award winners
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}