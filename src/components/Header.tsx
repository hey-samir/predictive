import React from 'react';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="sticky top-0 z-10 py-6 px-6 md:px-12" style={{background: 'transparent'}}>
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
          <nav style={{ 
            display: 'flex', 
            flexDirection: 'row', /* Explicitly set to row */
            alignItems: 'center',
            gap: '2.5rem' /* Using gap instead of space-x for better control */
          }}>
            {['awards', 'analysis', 'about'].map((section) => (
              <div key={section} className="relative" style={{ display: 'inline-block' }}>
                <button
                  onClick={() => setActiveSection(section)}
                  style={{
                    fontWeight: 500,
                    fontSize: '14px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'white',
                    background: 'transparent',
                    border: 'none',
                    padding: '4px 2px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {section.toUpperCase()}
                </button>
                {activeSection === section && (
                  <div className="absolute bottom-[-8px] left-0 right-0 h-[2px]" 
                    style={{backgroundColor: '#8A3FFC'}}></div>
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