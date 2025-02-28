import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveSection('predictive25')}>
            <div className="w-10 h-10 mr-3 bg-gradient-to-br from-[#9C27B0] to-[#6A1B9A] rounded-lg flex items-center justify-center shadow-md overflow-hidden">
              <span className="text-xl filter grayscale brightness-200 contrast-200">🎬</span>
            </div>
            <div>
              <div className="text-xl font-bold text-[#9C27B0]">
                Predictive
              </div>
              <div className="text-xs text-gray-500 -mt-1">
                Sophisticated algorithms for Academy Awards
              </div>
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => setActiveSection('predictive25')}
              className={`px-3 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'predictive25' 
                  ? 'bg-[#F3E5F5] text-[#9C27B0]' 
                  : 'text-gray-600 hover:text-[#9C27B0] hover:bg-[#F3E5F5]'
                }`}
            >
              Predictive 25
            </button>
            <button
              onClick={() => setActiveSection('history')}
              className={`px-3 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'history' 
                  ? 'bg-[#F3E5F5] text-[#9C27B0]' 
                  : 'text-gray-600 hover:text-[#9C27B0] hover:bg-[#F3E5F5]'
                }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-3 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'about' 
                  ? 'bg-[#F3E5F5] text-[#9C27B0]' 
                  : 'text-gray-600 hover:text-[#9C27B0] hover:bg-[#F3E5F5]'
                }`}
            >
              About
            </button>
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`px-3 py-2 font-medium text-sm transition-all rounded
                ${settingsOpen 
                  ? 'bg-[#F3E5F5] text-[#9C27B0]' 
                  : 'text-gray-600 hover:text-[#9C27B0] hover:bg-[#F3E5F5]'
                }`}
            >
              Settings
            </button>
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              className="text-gray-500 hover:text-[#9C27B0] p-2 rounded hover:bg-[#F3E5F5]"
              title="Compare with Streamlit app"
              onClick={() => window.open('/streamlit', '_blank')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button 
              className="text-gray-500 hover:text-[#9C27B0] p-2 rounded hover:bg-[#F3E5F5]"
              title="Refresh predictions"
              onClick={() => window.location.reload()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Settings Panel */}
        {settingsOpen && (
          <div className="bg-white border-t border-gray-100 mt-3 py-4 px-2 rounded-b-lg shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Display Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-2" defaultChecked />
                    <span className="text-sm text-gray-600">Show betting odds</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-2" defaultChecked />
                    <span className="text-sm text-gray-600">Show market probability</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-2" defaultChecked />
                    <span className="text-sm text-gray-600">Highlight likely winners</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Model Settings</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-2" defaultChecked />
                    <span className="text-sm text-gray-600">Include historical trends</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-2" defaultChecked />
                    <span className="text-sm text-gray-600">Include betting data</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-[#9C27B0] mr-2" defaultChecked />
                    <span className="text-sm text-gray-600">Include predictive markets</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Data Sources</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Historical Oscar data: 2000-2024</p>
                  <p>• Current betting odds: Updated daily</p>
                  <p>• Predictive markets: Updated hourly</p>
                  <p>• Award venues: 7 major ceremonies</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;