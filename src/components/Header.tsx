import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
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
          </nav>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-[#9C27B0] p-2 rounded hover:bg-[#F3E5F5]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-[#9C27B0] p-2 rounded hover:bg-[#F3E5F5]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-[#9C27B0] p-2 rounded hover:bg-[#F3E5F5]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;