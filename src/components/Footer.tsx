import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          Built using{' '}
          <a 
            href="https://nextjs.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-app-purple hover:underline"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a 
            href="https://replit.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-app-purple hover:underline"
          >
            Replit
          </a>
        </p>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 text-sm">© {new Date().getFullYear()} Predictive</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;