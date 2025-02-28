import React from 'react';
import { CURRENT_OSCAR_YEAR, AWARD_VENUES } from '../lib/constants';

const AboutSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Oscar Predictor</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          Oscar Predictor uses data science to forecast Academy Award winners based on their 
          performance at precursor award shows and ceremonies that historically correlate with 
          Oscar success.
        </p>
        <p className="mb-4">
          Our prediction model analyzes historical data from {CURRENT_OSCAR_YEAR - 2000}+ years of Oscar ceremonies 
          and precursor awards to identify patterns and correlations that help predict this 
          year's winners.
        </p>
        <p>
          We compare our data-driven predictions with betting odds and predictive markets to give 
          you a comprehensive view of the Oscar race.
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Sources</h2>
        <p className="mb-2">Our predictions incorporate data from:</p>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          {AWARD_VENUES.map(venue => (
            <li key={venue}>{venue}</li>
          ))}
          <li>Historical Oscar winners and nominees</li>
          <li>Current betting odds from major bookmakers</li>
          <li>Predictive markets probabilities</li>
        </ul>
        <p>
          Each award venue's predictive strength varies by category, and our model weighs them 
          accordingly based on historical correlation with Oscar winners.
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Limitations</h2>
        <p className="mb-4">
          While our model is data-driven, Oscar voting is subjective and can be influenced by 
          factors our model cannot fully capture, such as industry politics, late-breaking 
          controversies, or unexpected shifts in momentum.
        </p>
        <p>
          We continuously refine our approach each year to improve accuracy, but upsets 
          always remain possible!
        </p>
      </div>
    </div>
  );
};

export default AboutSection;