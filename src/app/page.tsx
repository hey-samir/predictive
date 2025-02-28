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
        {activeSection === 'settings' && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-6 text-[#9C27B0]">Settings</h1>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-medium mb-3 text-gray-800">Display Options</h2>
                <div className="bg-gray-50 p-4 rounded space-y-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-[#9C27B0]" defaultChecked />
                    <span>Show betting odds</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-[#9C27B0]" defaultChecked />
                    <span>Show market probabilities</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-[#9C27B0]" defaultChecked />
                    <span>Show award venue support</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-3 text-gray-800">Data Preferences</h2>
                <div className="bg-gray-50 p-4 rounded space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Award venue weight</label>
                    <select className="w-full p-2 border rounded text-sm">
                      <option>Default algorithm weights</option>
                      <option>Equal weights</option>
                      <option>Recent years preference</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Years of data to consider</label>
                    <select className="w-full p-2 border rounded text-sm">
                      <option>All available years</option>
                      <option>Last 10 years only</option>
                      <option>Last 5 years only</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-[#9C27B0] text-white py-6 mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <p className="font-medium">Predictive © {new Date().getFullYear()}</p>
            <p className="text-sm mt-2 text-gray-200">
              Built by Interspace Ventures for personal use using Replit AI
            </p>
            <div className="flex justify-center mt-4 space-x-4 text-xs text-gray-200">
              <a href="https://samir.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                samir.xyz
              </a>
              <span>•</span>
              <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                replit.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}