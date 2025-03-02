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
            <h1 className="text-white text-lg font-bold lowercase tracking-tight flex items-center">
              predictive<span className="text-[#8A3FFC]">:film</span>
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
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;