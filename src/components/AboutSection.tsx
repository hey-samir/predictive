import React from 'react';
import { 
  CURRENT_OSCAR_YEAR, 
  AWARD_VENUES, 
  NOMINATION_TYPE_DETAILED_DESCRIPTIONS, 
  THEME_COLORS 
} from '../lib/constants';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6 text-app-purple">And the Algorithm Goes To...</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Predictive uses data science to forecast Oscar winners, because even AI loves a good acceptance speech. 🎬
        </p>
      </div>
      
      {/* The Plot */}
      <div className="bg-app-card shadow-lg rounded-xl overflow-hidden mb-16">
        <div className="h-2 bg-app-purple"></div>
        <div className="p-10">
          <h2 className="text-3xl font-semibold mb-6 text-app-purple">The Plot</h2>
          <p className="mb-4 text-gray-300 text-lg leading-relaxed">
            We crunch 25+ years of Academy Awards history and precursor awards data through our prediction engine. 
            Think of it as "Moneyball" meets "La La Land" - where statistics take center stage.
          </p>
        </div>
      </div>
      
      {/* Behind the Scenes */}
      <div className="bg-app-card shadow-lg rounded-xl overflow-hidden mb-16">
        <div className="h-2 bg-app-purple"></div>
        <div className="p-10">
          <h2 className="text-3xl font-semibold mb-6 text-app-purple">Behind the Scenes</h2>
          <ul className="mb-4 text-gray-300 pl-5 space-y-5 text-lg list-none">
            <li className="flex items-start">
              <span className="text-app-purple mr-3 text-xl">⭐</span>
              <span>Machine learning model trained on Oscar data (1999-2024)</span>
            </li>
            <li className="flex items-start">
              <span className="text-app-purple mr-3 text-xl">⭐</span>
              <span>Real-time betting odds integration</span>
            </li>
            <li className="flex items-start">
              <span className="text-app-purple mr-3 text-xl">⭐</span>
              <span>Weighted analysis of precursor awards (BAFTA, Golden Globes, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-app-purple mr-3 text-xl">⭐</span>
              <span>Historical accuracy tracking for each award predictor</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Award Season Tour */}
      <div className="bg-app-card shadow-lg rounded-xl overflow-hidden mb-16">
        <div className="h-2 bg-app-purple"></div>
        <div className="p-10">
          <h2 className="text-3xl font-semibold mb-6 text-app-purple">Award Season Tour 🏆</h2>
          
          <div className="overflow-x-auto mb-2">
            <table className="min-w-full border border-app-purple/30 rounded-lg">
              <thead className="bg-app-purple">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider border-b border-app-purple/30">Award Show</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider border-b border-app-purple/30">Hosted By</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider border-b border-app-purple/30">When It Happens</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Academy Awards (Oscars)</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Academy of Motion Picture Arts and Sciences</td>
                  <td className="px-6 py-4 text-sm text-gray-300">March</td>
                </tr>
                <tr className="border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Golden Globe Awards</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Hollywood Foreign Press Association</td>
                  <td className="px-6 py-4 text-sm text-gray-300">January</td>
                </tr>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">BAFTA Awards</td>
                  <td className="px-6 py-4 text-sm text-gray-300">British Academy of Film and Television Arts</td>
                  <td className="px-6 py-4 text-sm text-gray-300">February</td>
                </tr>
                <tr className="border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Screen Actors Guild (SAG)</td>
                  <td className="px-6 py-4 text-sm text-gray-300">SAG-AFTRA</td>
                  <td className="px-6 py-4 text-sm text-gray-300">February</td>
                </tr>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Critics Choice Awards</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Critics Choice Association</td>
                  <td className="px-6 py-4 text-sm text-gray-300">January</td>
                </tr>
                <tr className="border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Directors Guild (DGA)</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Directors Guild of America</td>
                  <td className="px-6 py-4 text-sm text-gray-300">February</td>
                </tr>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Producers Guild (PGA)</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Producers Guild of America</td>
                  <td className="px-6 py-4 text-sm text-gray-300">February</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Writers Guild (WGA)</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Writers Guild of America</td>
                  <td className="px-6 py-4 text-sm text-gray-300">February</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* The Credits Roll */}
      <div className="bg-app-card shadow-lg rounded-xl overflow-hidden mb-16">
        <div className="h-2 bg-app-purple"></div>
        <div className="p-10">
          <h2 className="text-3xl font-semibold mb-6 text-app-purple">The Credits Roll 🎬</h2>
          
          <div className="overflow-x-auto mb-2">
            <table className="min-w-full border border-app-purple/30 rounded-lg">
              <thead className="bg-app-purple">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider border-b border-app-purple/30">Data Source</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider border-b border-app-purple/30">What It Tells Us</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider border-b border-app-purple/30">Why It Matters</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Academy Awards Database</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Historical nominations and wins</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Official Oscar records since 1927</td>
                </tr>
                <tr className="border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">IMDb Awards Central</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Comprehensive awards coverage</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Tracks 24 major film awards globally</td>
                </tr>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">The Numbers</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Box office performance</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Financial success metrics</td>
                </tr>
                <tr className="border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Variety Awards Circuit</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Industry insider coverage</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Breaking news and analysis</td>
                </tr>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Rotten Tomatoes</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Critics' Metascore</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Professional reception and consensus</td>
                </tr>
                <tr className="border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">IMDb Ratings</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Audience Score</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Public opinion and engagement</td>
                </tr>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Kalshi</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Prediction Markets</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Crowd-sourced probability estimates</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Betting Markets</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Real-time Odds</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Market-driven likelihood assessments</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Award Categories */}
      <div className="bg-app-card shadow-lg rounded-xl overflow-hidden mb-16">
        <div className="h-2 bg-app-purple"></div>
        <div className="p-10">
          <h2 className="text-3xl font-semibold mb-6 text-app-purple">Award Categories</h2>
          
          <div className="overflow-x-auto mb-2">
            <table className="min-w-full border border-app-purple/30 rounded-lg">
              <thead className="bg-app-purple">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider border-b border-app-purple/30">Category Group</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider border-b border-app-purple/30">What They Do</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider border-b border-app-purple/30">Awards</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Makers</td>
                  <td className="px-6 py-4 text-sm text-gray-300">The big-picture visionaries</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Best Picture, Directing, Animated Feature, Documentary, International Film</td>
                </tr>
                <tr className="border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Performers</td>
                  <td className="px-6 py-4 text-sm text-gray-300">The faces on screen</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Leading & Supporting Actor/Actress</td>
                </tr>
                <tr className="bg-app-purple/5 border-b border-app-purple/20">
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Creators</td>
                  <td className="px-6 py-4 text-sm text-gray-300">The storytellers</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Original/Adapted Screenplay, Original Score/Song</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-app-purple">Crafters</td>
                  <td className="px-6 py-4 text-sm text-gray-300">The technical wizards</td>
                  <td className="px-6 py-4 text-sm text-gray-300">Cinematography, Editing, Production Design, Costume, Makeup, Sound, VFX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-app-card shadow-lg rounded-xl overflow-hidden">
        <div className="h-2 bg-app-purple"></div>
        <div className="p-10">
          <hr className="border-gray-700 mb-8" />
          <p className="text-gray-300 text-center italic text-lg">
            Crafted by{' '}
            <a href="https://samir.xyz/ventures" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium text-app-purple hover:underline">
              Interspace Ventures
            </a>{' '}
            using{' '}
            <a href="https://replit.com" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium text-app-purple hover:underline">
              Replit AI
            </a>{' '}
            & Streamlit - because even robots dream in technicolor
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;