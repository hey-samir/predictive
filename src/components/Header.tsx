import React from 'react';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="sticky top-0 z-10 py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Brand Name - Left-aligned */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setActiveSection('awards')}
          >
            <h1 className="text-white text-xl font-bold lowercase tracking-tight">
              predictive
            </h1>
          </div>
          
          {/* Main Navigation - Right-aligned */}
          <nav className="flex items-center space-x-10">
            {['awards', 'analysis', 'about'].map((section) => (
              <div key={section} className="relative">
                <button
                  onClick={() => setActiveSection(section)}
                  className="font-medium text-base uppercase tracking-wider transition-colors text-white px-1"
                >
                  {section}
                </button>
                {activeSection === section && (
                  <div className="absolute bottom-[-8px] left-0 right-0 h-[2px] bg-[#8A3FFC]"></div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;