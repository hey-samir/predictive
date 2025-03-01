import React from 'react';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header style={{ backgroundColor: 'var(--app-card)' }} className="sticky top-0 z-10 mx-6 mt-6 mb-10 border border-[#8A3FFC]/20 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center">
          {/* Logo and Brand */}
          <div className="flex items-center cursor-pointer" onClick={() => setActiveSection('awards')}>
            <div className="w-6 h-6 mr-2 overflow-hidden">
              <img 
                src="/images/predictive_logo.png" 
                alt="Predictive Logo" 
                className="w-6 h-6 object-contain"
              />
            </div>
            <div className="text-white text-lg font-bold lowercase">
              predictive
            </div>
          </div>
          
          {/* Main Navigation - Centered */}
          <nav className="flex items-center mx-auto">
            {['awards', 'analysis', 'about'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                style={{ 
                  backgroundColor: activeSection === section ? 'var(--app-purple)' : 'transparent',
                  boxShadow: activeSection === section ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
                className="px-5 py-2 mx-2 font-medium text-sm transition-all rounded-md text-white hover:bg-[#8A3FFC]/20"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
          
          {/* Empty div to balance the flex layout */}
          <div style={{ width: "104px" }}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;