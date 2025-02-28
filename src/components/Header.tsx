import React from 'react';
import Image from 'next/image';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  // Defining bright purple from samir.xyz
  const brightPurple = '#8A3FFC';
  const lightPurple = '#F6F2FF';
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveSection('predictive25')}>
            <div className="w-10 h-10 mr-3 bg-gradient-to-br from-[#3F51B5] to-[#8A3FFC] rounded-md flex items-center justify-center">
              <span className="text-white text-xl">🎬</span>
            </div>
            <div>
              <div className="text-xl font-semibold" style={{ color: brightPurple }}>
                Predictive
              </div>
              <div className="text-xs text-gray-500 -mt-1">
                Academy Award predictions
              </div>
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex items-center space-x-1">
            <button
              onClick={() => setActiveSection('predictive25')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'predictive25' 
                  ? `bg-${lightPurple} text-${brightPurple}` 
                  : 'text-gray-600 hover:text-[#8A3FFC]'
                }`}
              style={{ 
                backgroundColor: activeSection === 'predictive25' ? lightPurple : '',
                color: activeSection === 'predictive25' ? brightPurple : ''
              }}
            >
              Predictive 25
            </button>
            <button
              onClick={() => setActiveSection('history')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'history' 
                  ? `bg-${lightPurple} text-${brightPurple}` 
                  : 'text-gray-600 hover:text-[#8A3FFC]'
                }`}
              style={{ 
                backgroundColor: activeSection === 'history' ? lightPurple : '',
                color: activeSection === 'history' ? brightPurple : ''
              }}
            >
              History
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'about' 
                  ? `bg-${lightPurple} text-${brightPurple}` 
                  : 'text-gray-600 hover:text-[#8A3FFC]'
                }`}
              style={{ 
                backgroundColor: activeSection === 'about' ? lightPurple : '',
                color: activeSection === 'about' ? brightPurple : ''
              }}
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