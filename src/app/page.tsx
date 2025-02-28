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
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeSection === 'predictive25' && <PredictionsSection />}
        {activeSection === 'history' && <HistorySection />}
        {activeSection === 'about' && <AboutSection />}
        {activeSection === 'settings' && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-[#9C27B0]">Settings</h1>
            <div className="grid gap-8">
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Appearance</h2>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-3" defaultChecked />
                    <span>Dark mode</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-3" defaultChecked />
                    <span>Show percentage values</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Data Sources</h2>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-3" defaultChecked />
                    <span>Include betting odds</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-3" defaultChecked />
                    <span>Include market predictions</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-[#9C27B0] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="font-medium">Predictive © {new Date().getFullYear()}</p>
            <p className="text-sm mt-2 text-gray-200">
              Built by Interspace Ventures for personal use using Replit AI and Streamlit
            </p>
            <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-200">
              <a href="https://samir.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                samir.xyz
              </a>
              <span>•</span>
              <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                replit.com
              </a>
              <span>•</span>
              <a href="https://streamlit.io" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                streamlit.io
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}