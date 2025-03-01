import React from 'react';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="sticky top-0 z-10 mx-6 mt-6 mb-10 border border-[#8A3FFC]/20 shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--app-card)' }}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveSection('awards')}>
            <div className="w-8 h-8 mr-2 overflow-hidden">
              <img 
                src="/images/predictive_logo.svg" 
                alt="Predictive Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-white text-lg font-bold lowercase tracking-tight ml-1">
              predictive.film
            </div>
          </div>
          
          {/* Main Navigation - Centered */}
          <nav className="flex items-center">
            {['awards', 'analysis', 'about'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-5 py-2 mx-2 font-medium text-sm transition-all text-white hover:bg-[#8A3FFC]/20 ${
                  activeSection === section 
                    ? 'bg-[#8A3FFC] shadow-md border border-[#8A3FFC]/50' 
                    : 'bg-transparent border border-[#8A3FFC]/20'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
          
          {/* User section to balance layout */}
          <div className="opacity-0 w-24">
            placeholder
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;