'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PredictionsSection from '../components/PredictionsSection';
import HistorySection from '../components/HistorySection';
import AboutSection from '../components/AboutSection';
import VisualizationsSection from '../components/VisualizationsSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('awards');

  return (
    <div className="flex flex-col min-h-screen">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 px-6 pt-6 pb-0 max-w-7xl mx-auto w-full">
        {activeSection === 'awards' && <PredictionsSection />}
        {activeSection === 'analysis' && <HistorySection />}
        {activeSection === 'about' && <AboutSection />}
      </main>
      
      <Footer />
    </div>
  );
}