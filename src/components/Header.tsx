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
    <header className="bg-primary sticky top-0 z-10 rounded-xl mx-6 mt-6 mb-10">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="w-8 h-8 mr-3 overflow-hidden cursor-pointer" onClick={() => setActiveSection('predictive25')}>
              <Image 
                src="/predictive-logo.png" 
                alt="Predictive Logo" 
                width={32} 
                height={32} 
                className="rounded-md" 
              />
            </div>
            <div 
              className={`text-white font-medium cursor-pointer ${activeSection === 'predictive25' ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => setActiveSection('predictive25')}
            >
              Predictive
            </div>
            <div 
              className={`mx-4 text-white font-medium cursor-pointer ${activeSection === 'makers' ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => setActiveSection('makers')}
            >
              Makers
            </div>
            <div 
              className={`mr-4 text-white font-medium cursor-pointer ${activeSection === 'performers' ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => setActiveSection('performers')}
            >
              Performers
            </div>
            <div 
              className={`text-white font-medium cursor-pointer ${activeSection === 'history' ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
              onClick={() => setActiveSection('history')}
            >
              History
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex items-center space-x-3">
            <button
              onClick={() => setActiveSection('creators')}
              className="px-5 py-2 font-medium text-sm transition-all rounded-md border border-primary-300 bg-primary-700 flex items-center text-white"
            >
              Creators
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setActiveSection('crafters')}
              className="px-5 py-2 font-medium text-sm transition-all rounded-md bg-primary-600 text-white"
            >
              Crafters
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className="px-5 py-2 font-medium text-sm transition-all rounded-md bg-primary-800 text-white flex items-center"
            >
              About
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Theme toggle - a purple button with white icon */}
            <button className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center ml-2 border border-primary-300">
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