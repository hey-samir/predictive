import React from 'react';
import { 
  CURRENT_OSCAR_YEAR, 
  AWARD_VENUES, 
  NOMINATION_TYPE_DETAILED_DESCRIPTIONS, 
  THEME_COLORS 
} from '../lib/constants';

const AboutSection: React.FC = () => {
  // Use theme colors
  const { primary, primaryLight } = THEME_COLORS;
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2" style={{ color: primary }}>About Predictive</h1>
      <p className="text-lg text-gray-600 mb-8">
        Predictive uses sophisticated algorithms to predict the top Academy Award winners
      </p>
      
      <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
        <div className="h-1" style={{ backgroundColor: primary }}></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: primary }}>How It Works</h2>
          <p className="mb-4 text-gray-700">
            Our prediction model analyzes historical data from {CURRENT_OSCAR_YEAR - 2000}+ years of Academy Award ceremonies 
            and precursor awards to identify patterns and correlations that help predict this 
            year's winners.
          </p>
          <p className="mb-4 text-gray-700">
            We compare our algorithmic predictions with betting odds and predictive markets to give 
            you a comprehensive view of the awards race.
          </p>
          <p className="text-gray-700">
            Each award venue receives a predictive strength rating based on its historical accuracy in 
            predicting Oscar winners. These weightings are then used to calculate the likelihood percentages 
            for each nominee.
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
        <div className="h-1" style={{ backgroundColor: primary }}></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: primary }}>Methodology</h2>
          <p className="mb-4 text-gray-700">
            Our machine learning model is trained on a dataset of past Oscar nominations, wins, and precursor 
            award results from {CURRENT_OSCAR_YEAR - 2000} to {CURRENT_OSCAR_YEAR - 1}.
          </p>
          <p className="mb-4 text-gray-700">
            The model identifies correlations between wins at other award venues (such as BAFTA, Golden Globes, 
            and Critics Choice Awards) and ultimate Oscar success. Different weights are assigned to each award venue 
            based on their historical predictive power for each Oscar category.
          </p>
          <p className="text-gray-700">
            The final predictions incorporate both our algorithmic assessment and real-time data from betting markets 
            to provide the most accurate forecast possible.
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-xl overflow-hidden mb-8">
        <div className="h-1" style={{ backgroundColor: primary }}></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: primary }}>Award Categories Glossary</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: primary }}>Makers</h3>
              <p className="text-gray-700">{NOMINATION_TYPE_DETAILED_DESCRIPTIONS["Makers"]}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Best Picture", "Directing", "Animated Feature Film", "Documentary Feature", "International Feature Film"].map(cat => (
                  <span 
                    key={cat}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ backgroundColor: primaryLight, color: primary }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2" style={{ color: primary }}>Performers</h3>
              <p className="text-gray-700">{NOMINATION_TYPE_DETAILED_DESCRIPTIONS["Performers"]}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Actor in a Leading Role", "Actress in a Leading Role", "Actor in a Supporting Role", "Actress in a Supporting Role"].map(cat => (
                  <span 
                    key={cat}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ backgroundColor: primaryLight, color: primary }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2" style={{ color: primary }}>Creators</h3>
              <p className="text-gray-700">{NOMINATION_TYPE_DETAILED_DESCRIPTIONS["Creators"]}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Writing (Original Screenplay)", "Writing (Adapted Screenplay)", "Music (Original Score)", "Music (Original Song)"].map(cat => (
                  <span 
                    key={cat}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ backgroundColor: primaryLight, color: primary }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2" style={{ color: primary }}>Crafters</h3>
              <p className="text-gray-700">{NOMINATION_TYPE_DETAILED_DESCRIPTIONS["Crafters"]}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Cinematography", "Film Editing", "Production Design", "Costume Design", "Makeup and Hairstyling", "Sound", "Visual Effects"].map(cat => (
                  <span 
                    key={cat}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ backgroundColor: primaryLight, color: primary }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="h-1" style={{ backgroundColor: primary }}></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: primary }}>About</h2>
          <p className="mb-4 text-gray-700">
            Predictive was built by Interspace Ventures for personal use using Replit AI and Streamlit.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://samir.xyz" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium hover:underline"
               style={{ color: primary }}>
              samir.xyz
            </a>
            <span className="text-gray-400">•</span>
            <a href="https://replit.com" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium hover:underline"
               style={{ color: primary }}>
              replit.com
            </a>
            <span className="text-gray-400">•</span>
            <a href="https://streamlit.io" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium hover:underline"
               style={{ color: primary }}>
              streamlit.io
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;