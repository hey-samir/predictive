import React from 'react';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="sticky top-0 z-10">
      <div className="navbar">
        <div className="logo-container">
          <div 
            className="cursor-pointer" 
            onClick={() => setActiveSection('awards')}
          >
            <h1 className="text-white text-xl font-bold lowercase tracking-tight">
              predictive
            </h1>
          </div>
        </div>
        
        {/* Main Navigation - Right-aligned */}
        <nav className="navbar-links">
          {['awards', 'analysis', 'about'].map((section) => (
            <div key={section} className="relative">
              <button
                onClick={() => setActiveSection(section)}
                className={`navbar-link ${activeSection === section ? 'navbar-link-active' : ''}`}
              >
                {section.toUpperCase()}
              </button>
              {activeSection === section && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#8A3FFC]"></div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;