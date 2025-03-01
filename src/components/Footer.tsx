import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-white font-medium text-lg mb-2">Oscar Predictions</h3>
            <p className="text-gray-400 text-sm">
              Award predictions through data analysis and machine learning
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Predictive. All rights reserved.
          </p>
          
          <p className="text-gray-500 text-sm">
            Built with{' '}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-app-purple hover:underline"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;