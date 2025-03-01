import React from 'react';

type HeaderProps = {
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  return (
    <header className="bg-app-card sticky top-0 z-10 rounded-xl mx-6 mt-6 mb-10 border border-app-purple/20 shadow-lg">
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
            <button
              onClick={() => setActiveSection('awards')}
              className={`px-5 py-2 font-medium text-sm transition-all rounded-md ${
                activeSection === 'awards' ? 'bg-app-purple shadow-md' : 'bg-app-card hover:bg-app-purple/20'
              } text-white`}
            >
              Awards
            </button>
            <button
              onClick={() => setActiveSection('analysis')}
              className={`px-5 py-2 font-medium text-sm transition-all rounded-md ${
                activeSection === 'analysis' ? 'bg-app-purple shadow-md' : 'bg-app-card hover:bg-app-purple/20'
              } text-white`}
            >
              Analysis
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`px-5 py-2 font-medium text-sm transition-all rounded-md ${
                activeSection === 'about' ? 'bg-app-purple shadow-md' : 'bg-app-card hover:bg-app-purple/20'
              } text-white`}
            >
              About
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;