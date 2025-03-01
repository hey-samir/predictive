import React from 'react';
import { THEME_COLORS } from '../lib/constants';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          Built by{' '}
          <a 
            href="https://samir.xyz/ventures" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-app-purple hover:underline"
          >
            Interspace Ventures
          </a>{' '}
          for personal use using{' '}
          <a 
            href="https://replit.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-app-purple hover:underline"
          >
            Replit AI
          </a>{' '}
          and Streamlit
        </p>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 text-sm">© {new Date().getFullYear()} Predictive</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;