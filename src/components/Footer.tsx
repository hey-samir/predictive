import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 px-8 md:px-12 border-t border-gray-800 text-center">
      <div className="max-w-6xl mx-auto">
        <p className="text-gray-400 text-xs" style={{textAlign: 'center'}}>
          © 2025. Built by <a href="https://samir.xyz/ventures" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Interspace Ventures</a> and coded with <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Replit</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;