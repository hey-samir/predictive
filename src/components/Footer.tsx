import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 px-8 md:px-12 border-t border-gray-800 text-center">
      <div className="max-w-6xl mx-auto">
        <p className="text-gray-500 text-xs" style={{textAlign: 'center'}}>
          © 2025. Built by <a href="https://samir.xyz/ventures" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">Interspace Ventures</a> and coded with <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">Replit</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;