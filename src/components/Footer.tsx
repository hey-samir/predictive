import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center">
          <p className="text-gray-400 text-sm text-center">
            © 2025. Built by <a href="https://samir.xyz/ventures" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Interspace Ventures</a> and coded with <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Replit</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;