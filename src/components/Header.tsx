import React from 'react';
import Image from 'next/image';
import { THEME_COLORS } from '../lib/constants';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  // Use theme colors
  const { primary, primaryLight } = THEME_COLORS;
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveSection('predictive25')}>
            <div className="w-10 h-10 mr-3 overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="Predictive Logo" 
                width={40} 
                height={40} 
                className="rounded-md" 
              />
            </div>
            <div>
              <div className="text-xl font-semibold" style={{ color: primary }}>
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
              className="px-4 py-2 font-medium text-sm transition-all rounded"
              style={{ 
                backgroundColor: activeSection === 'predictive25' ? primary : 'transparent',
                color: activeSection === 'predictive25' ? 'white' : '#666666'
              }}
            >
              Predictive 25
            </button>
            <button
              onClick={() => setActiveSection('history')}
              className="px-4 py-2 font-medium text-sm transition-all rounded"
              style={{ 
                backgroundColor: activeSection === 'history' ? primary : 'transparent',
                color: activeSection === 'history' ? 'white' : '#666666'
              }}
            >
              History
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className="px-4 py-2 font-medium text-sm transition-all rounded"
              style={{ 
                backgroundColor: activeSection === 'about' ? primary : 'transparent',
                color: activeSection === 'about' ? 'white' : '#666666'
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