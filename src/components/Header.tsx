import React from 'react';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header style={{ backgroundColor: 'var(--app-card)' }} className="sticky top-0 z-10 rounded-xl mx-6 mt-6 mb-10 border border-[#8A3FFC]/20 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 overflow-hidden cursor-pointer" onClick={() => setActiveSection('awards')}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img 
                  src="/images/predictive_logo.svg" 
                  alt="Predictive Logo" 
                  className="w-10 h-10"
                />
              </div>
            </div>
            <div 
              className="text-white text-lg font-semibold cursor-pointer"
              onClick={() => setActiveSection('awards')}
            >
              Predictive
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex items-center space-x-4">
            {['awards', 'analysis', 'about'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                style={{ 
                  backgroundColor: activeSection === section ? 'var(--app-purple)' : 'transparent',
                  boxShadow: activeSection === section ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                className="px-5 py-2 font-medium text-sm transition-all rounded-md text-white hover:bg-[#8A3FFC]/20"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;