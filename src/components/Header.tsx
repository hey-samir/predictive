import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎬</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              Predictive
            </div>
          </div>
          
          <nav className="flex space-x-6">
            <button
              onClick={() => setActiveSection('predictions')}
              className={`px-3 py-2 font-medium transition-colors border-b-2 
                ${activeSection === 'predictions' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-700 hover:text-primary'
                }`}
            >
              Predictive 25
            </button>
            <button
              onClick={() => setActiveSection('history')}
              className={`px-3 py-2 font-medium transition-colors border-b-2 
                ${activeSection === 'history' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-700 hover:text-primary'
                }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-3 py-2 font-medium transition-colors border-b-2 
                ${activeSection === 'about' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-700 hover:text-primary'
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