import React from 'react';
import Link from 'next/link';
import { APP_SECTIONS } from '../lib/constants';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-2xl font-bold text-primary">
              Oscar Predictor
            </div>
          </div>
          
          <nav className="flex space-x-1 md:space-x-2">
            {Object.entries(APP_SECTIONS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeSection === key 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;