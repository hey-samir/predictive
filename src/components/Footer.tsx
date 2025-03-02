import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-80 pt-20 pb-16 px-8 md:px-12 border-t border-gray-800 text-center">
      <div className="max-w-6xl mx-auto">
        <p style={{
          fontSize: '0.7rem', 
          color: '#9E9E9E',
          textAlign: 'center'
        }}>
          © 2025. Built by <a href="https://samir.xyz/ventures" target="_blank" rel="noopener noreferrer" style={{color: '#a0aec0', transition: 'color 0.2s'}} className="hover:text-white">Interspace Ventures</a> and coded with <a href="https://replit.com" target="_blank" rel="noopener noreferrer" style={{color: '#a0aec0', transition: 'color 0.2s'}} className="hover:text-white">Replit</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;