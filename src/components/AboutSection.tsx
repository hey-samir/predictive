import React from 'react';
import { CURRENT_OSCAR_YEAR, AWARD_VENUES } from '../lib/constants';

const AboutSection: React.FC = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-[#9C27B0]">About Predictive</h1>
        <p className="text-lg text-gray-600 mb-8">
          Predictive uses sophisticated algorithms to predict the top Academy Award winners
        </p>
        
        <div className="bg-white shadow rounded-xl p-6 mb-8 border border-[#EEEEEE]">
          <h2 className="text-xl font-semibold mb-4 text-[#9C27B0] flex items-center">
            <span className="bg-[#F3E5F5] p-2 rounded-full mr-3 text-[#9C27B0]">🧠</span>
            How It Works
          </h2>
          <p className="mb-4 text-gray-700">
            Predictive uses sophisticated algorithms to forecast Academy Award winners based on their 
            performance at precursor award shows and ceremonies that historically correlate with 
            Oscar success.
          </p>
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
        
        <div className="bg-white shadow rounded-xl p-6 mb-8 border border-[#EEEEEE]">
          <h2 className="text-xl font-semibold mb-4 text-[#9C27B0] flex items-center">
            <span className="bg-[#F3E5F5] p-2 rounded-full mr-3 text-[#9C27B0]">📊</span>
            Data Sources
          </h2>
          <p className="mb-2 text-gray-700">Our predictions incorporate data from:</p>
          <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700">
            {AWARD_VENUES.map(venue => (
              <li key={venue}>{venue}</li>
            ))}
            <li>Historical Academy Award winners and nominees</li>
            <li>Current betting odds from major bookmakers</li>
            <li>Predictive markets probabilities</li>
          </ul>
          <p className="text-gray-700">
            Each award venue's predictive strength varies by category, and our model weighs them 
            accordingly based on historical correlation with Academy Award winners.
          </p>
        </div>
        
        <div className="bg-white shadow rounded-xl p-6 border border-[#EEEEEE]">
          <h2 className="text-xl font-semibold mb-4 text-[#9C27B0] flex items-center">
            <span className="bg-[#F3E5F5] p-2 rounded-full mr-3 text-[#9C27B0]">⚠️</span>
            Limitations
          </h2>
          <p className="mb-4 text-gray-700">
            While our model is data-driven, Academy Award voting is subjective and can be influenced by 
            factors our algorithms cannot fully capture, such as industry politics, late-breaking 
            controversies, or unexpected shifts in momentum.
          </p>
          <p className="text-gray-700">
            We continuously refine our approach each year to improve accuracy, but surprises 
            always remain possible in award shows!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;