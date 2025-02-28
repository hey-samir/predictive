import React from 'react';
import { 
  CURRENT_OSCAR_YEAR, 
  AWARD_VENUES, 
  NOMINATION_TYPE_DETAILED_DESCRIPTIONS, 
  THEME_COLORS 
} from '../lib/constants';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-app-purple">About Predictive</h1>
      <p className="text-lg text-gray-400 mb-8">
        Predictive uses sophisticated algorithms to predict the top Academy Award winners
      </p>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-8">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-app-purple">How It Works</h2>
          <p className="mb-4 text-gray-300">
            Our prediction model analyzes historical data from {CURRENT_OSCAR_YEAR - 2000}+ years of Academy Award ceremonies 
            and precursor awards to identify patterns and correlations that help predict this 
            year's winners.
          </p>
          <p className="mb-4 text-gray-300">
            We compare our algorithmic predictions with betting odds and predictive markets to give 
            you a comprehensive view of the awards race.
          </p>
          <p className="text-gray-300">
            Each award venue receives a predictive strength rating based on its historical accuracy in 
            predicting Oscar winners. These weightings are then used to calculate the likelihood percentages 
            for each nominee.
          </p>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-8">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-app-purple">Methodology</h2>
          <p className="mb-4 text-gray-300">
            Our machine learning model is trained on a dataset of past Oscar nominations, wins, and precursor 
            award results from {CURRENT_OSCAR_YEAR - 2000} to {CURRENT_OSCAR_YEAR - 1}.
          </p>
          <p className="mb-4 text-gray-300">
            The model identifies correlations between wins at other award venues (such as BAFTA, Golden Globes, 
            and Critics Choice Awards) and ultimate Oscar success. Different weights are assigned to each award venue 
            based on their historical predictive power for each Oscar category.
          </p>
          <p className="text-gray-300">
            The final predictions incorporate both our algorithmic assessment and real-time data from betting markets 
            to provide the most accurate forecast possible.
          </p>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-8">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-app-purple">Award Categories Glossary</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 text-app-purple">Makers</h3>
              <p className="text-gray-300">{NOMINATION_TYPE_DETAILED_DESCRIPTIONS["Makers"]}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Best Picture", "Directing", "Animated Feature Film", "Documentary Feature", "International Feature Film"].map(cat => (
                  <span 
                    key={cat}
                    className="px-2 py-1 text-xs rounded-full bg-app-purple/20 text-app-purple"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-app-purple">Performers</h3>
              <p className="text-gray-300">{NOMINATION_TYPE_DETAILED_DESCRIPTIONS["Performers"]}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Actor in a Leading Role", "Actress in a Leading Role", "Actor in a Supporting Role", "Actress in a Supporting Role"].map(cat => (
                  <span 
                    key={cat}
                    className="px-2 py-1 text-xs rounded-full bg-app-purple/20 text-app-purple"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-app-purple">Creators</h3>
              <p className="text-gray-300">{NOMINATION_TYPE_DETAILED_DESCRIPTIONS["Creators"]}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Writing (Original Screenplay)", "Writing (Adapted Screenplay)", "Music (Original Score)", "Music (Original Song)"].map(cat => (
                  <span 
                    key={cat}
                    className="px-2 py-1 text-xs rounded-full bg-app-purple/20 text-app-purple"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2 text-app-purple">Crafters</h3>
              <p className="text-gray-300">{NOMINATION_TYPE_DETAILED_DESCRIPTIONS["Crafters"]}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {["Cinematography", "Film Editing", "Production Design", "Costume Design", "Makeup and Hairstyling", "Sound", "Visual Effects"].map(cat => (
                  <span 
                    key={cat}
                    className="px-2 py-1 text-xs rounded-full bg-app-purple/20 text-app-purple"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-app-purple">About</h2>
          <p className="mb-4 text-gray-300">
            Predictive was built by Interspace Ventures for personal use using Replit AI and Streamlit.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://samir.xyz" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium text-app-purple hover:underline">
              samir.xyz
            </a>
            <span className="text-gray-400">•</span>
            <a href="https://replit.com" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium text-app-purple hover:underline">
              replit.com
            </a>
            <span className="text-gray-400">•</span>
            <a href="https://streamlit.io" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium text-app-purple hover:underline">
              streamlit.io
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;