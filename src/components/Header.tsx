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
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-12 h-12 mr-3 bg-gradient-to-br from-primary-600 to-primary-900 rounded-lg flex items-center justify-center shadow-md overflow-hidden">
              <div className="w-9 h-9 flex items-center justify-center bg-white bg-opacity-10 rounded-md">
                <span className="text-2xl filter grayscale opacity-90">🎬</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-700">
                Predictive
              </div>
              <div className="text-xs text-gray-500 -mt-1">
                Academy Awards Forecast
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <nav className="flex space-x-1 p-1 bg-gray-100 rounded-full shadow-inner">
            <button
              onClick={() => setActiveSection('predictions')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded-full
                ${activeSection === 'predictions' 
                  ? 'bg-white text-primary-700 shadow-sm' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-white hover:bg-opacity-50'
                }`}
            >
              Predictive 25
            </button>
            <button
              onClick={() => setActiveSection('history')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded-full
                ${activeSection === 'history' 
                  ? 'bg-white text-primary-700 shadow-sm' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-white hover:bg-opacity-50'
                }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded-full
                ${activeSection === 'about' 
                  ? 'bg-white text-primary-700 shadow-sm' 
                  : 'text-gray-600 hover:text-primary-600 hover:bg-white hover:bg-opacity-50'
                }`}
            >
              About
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;