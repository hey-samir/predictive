import React from 'react';
import { CURRENT_OSCAR_YEAR, AWARD_VENUES } from '../lib/constants';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-[#9C27B0]">About Predictive</h1>
      <p className="text-lg text-gray-600 mb-8">
        Predictive uses sophisticated algorithms to predict the top Academy Award winners
      </p>
      
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#9C27B0]">How It Works</h2>
        <p className="mb-4 text-gray-700">
          Our prediction model analyzes historical data from {CURRENT_OSCAR_YEAR - 2000}+ years of Academy Award ceremonies 
          and precursor awards to identify patterns and correlations that help predict this 
          year's winners.
        </p>
        <p className="text-gray-700">
          We compare our algorithmic predictions with betting odds and predictive markets to give 
          you a comprehensive view of the awards race.
        </p>
      </div>
      
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#9C27B0]">The Team</h2>
        <p className="mb-4 text-gray-700">
          Predictive was built by Interspace Ventures for personal use using Replit AI and Streamlit.
        </p>
        <div className="flex space-x-4 mt-6">
          <a href="https://samir.xyz" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-[#9C27B0] font-medium hover:underline">
            samir.xyz
          </a>
          <span className="text-gray-400">•</span>
          <a href="https://replit.com" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-[#9C27B0] font-medium hover:underline">
            replit.com
          </a>
          <span className="text-gray-400">•</span>
          <a href="https://streamlit.io" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-[#9C27B0] font-medium hover:underline">
            streamlit.io
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;