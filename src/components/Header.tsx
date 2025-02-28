import React from 'react';
import Image from 'next/image';
import { THEME_COLORS } from '../lib/constants';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  // Use theme colors
  const { primary, primaryLight, text, textSecondary } = THEME_COLORS;
  
  return (
    <header className="bg-app-card sticky top-0 z-10 rounded-xl mx-6 mt-6 mb-10 border border-app-purple/20 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 overflow-hidden cursor-pointer" onClick={() => setActiveSection('predictive25')}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-app-purple rounded-md flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div 
              className={`text-white text-lg font-semibold cursor-pointer ${activeSection === 'predictive25' ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => setActiveSection('predictive25')}
            >
              Predictive 2025
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => setActiveSection('awards')}
              className={`px-5 py-2.5 font-medium text-sm transition-all rounded-md ${activeSection === 'awards' ? 'bg-app-purple shadow-md' : 'bg-app-card hover:bg-app-purple/20'} text-white`}
            >
              Awards
            </button>
            <button
              onClick={() => setActiveSection('predictives')}
              className={`px-5 py-2.5 font-medium text-sm transition-all rounded-md ${activeSection === 'predictives' ? 'bg-app-purple shadow-md' : 'bg-app-card hover:bg-app-purple/20'} text-white`}
            >
              Predictives
            </button>
            <button
              onClick={() => setActiveSection('history')}
              className={`px-5 py-2.5 font-medium text-sm transition-all rounded-md ${activeSection === 'history' ? 'bg-app-purple shadow-md' : 'bg-app-card hover:bg-app-purple/20'} text-white`}
            >
              History
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-5 py-2.5 font-medium text-sm transition-all rounded-md ${activeSection === 'about' ? 'bg-app-purple shadow-md' : 'bg-app-card hover:bg-app-purple/20'} text-white`}
            >
              About
            </button>
            
            {/* Theme toggle */}
            <button className="w-10 h-10 rounded-full bg-app-purple flex items-center justify-center ml-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;