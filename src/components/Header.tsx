import React from 'react';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="sticky top-0 z-10 bg-[#121212] py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Brand Name - Left-aligned */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setActiveSection('awards')}
          >
            <h1 className="text-white text-xl font-bold lowercase tracking-tight">
              predictive.film
            </h1>
          </div>
          
          {/* Main Navigation - Right-aligned */}
          <nav className="flex items-center space-x-10">
            {['awards', 'analysis', 'about'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`font-medium text-sm uppercase tracking-wider transition-colors ${
                  activeSection === section 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;