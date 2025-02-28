import React from 'react';

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
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => setActiveSection('predictive25')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'predictive25' 
                  ? 'bg-[#F3E5F5] text-[#9C27B0]' 
                  : 'text-gray-600 hover:text-[#9C27B0] hover:bg-[#F3E5F5]'
                }`}
            >
              Predictive 25
            </button>
            <button
              onClick={() => setActiveSection('history')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'history' 
                  ? 'bg-[#F3E5F5] text-[#9C27B0]' 
                  : 'text-gray-600 hover:text-[#9C27B0] hover:bg-[#F3E5F5]'
                }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'about' 
                  ? 'bg-[#F3E5F5] text-[#9C27B0]' 
                  : 'text-gray-600 hover:text-[#9C27B0] hover:bg-[#F3E5F5]'
                }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveSection('settings')}
              className={`px-4 py-2 font-medium text-sm transition-all rounded
                ${activeSection === 'settings' 
                  ? 'bg-[#F3E5F5] text-[#9C27B0]' 
                  : 'text-gray-600 hover:text-[#9C27B0] hover:bg-[#F3E5F5]'
                }`}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;