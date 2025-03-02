import React from 'react';
import Image from 'next/image';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 50,
      backgroundColor: '#1a202c',
      borderBottom: '1px solid #2D3748'
    }}>
      <div className="navbar">
        <div className="logo-container">
          <div 
            className="cursor-pointer" 
            onClick={() => setActiveSection('awards')}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div style={{ marginRight: '8px', width: '24px', height: '24px', position: 'relative' }}>
              <Image 
                src="/images/predictive-icon.png" 
                alt="Predictive Film Icon" 
                width={24} 
                height={24}
              />
            </div>
            <h1 className="text-white font-bold lowercase tracking-tight flex items-center" style={{ fontSize: '1rem' }}>
              predictive<span className="text-purple-500 font-bold">:film</span>
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