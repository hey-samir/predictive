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
      <h1 className="text-3xl font-bold mb-2 text-app-purple">And the Algorithm Goes To...</h1>
      <p className="text-lg text-gray-400 mb-8">
        Predictive uses data science to forecast Oscar winners, because even AI loves a good acceptance speech. 🎬
      </p>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-8">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-app-purple">The Plot (How It Works)</h2>
          <p className="mb-4 text-gray-300">
            We crunch 25+ years of Academy Awards history and precursor awards data through our prediction engine. 
            Think of it as "Moneyball" meets "La La Land" - where statistics take center stage.
          </p>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-8">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-app-purple">Behind the Scenes</h2>
          <ul className="mb-4 text-gray-300 list-disc pl-5 space-y-2">
            <li>Machine learning model trained on Oscar data (1999-2024)</li>
            <li>Real-time betting odds integration</li>
            <li>Weighted analysis of precursor awards (BAFTA, Golden Globes, etc.)</li>
            <li>Historical accuracy tracking for each award predictor</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-8">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-app-purple">Award Categories</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-app-purple uppercase tracking-wider">Category Group</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-app-purple uppercase tracking-wider">What They Do</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-app-purple uppercase tracking-wider">Awards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-app-purple">Makers</td>
                  <td className="px-4 py-3 text-sm text-gray-300">The big-picture visionaries</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Best Picture, Directing, Animated Feature, Documentary, International Film</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-app-purple">Performers</td>
                  <td className="px-4 py-3 text-sm text-gray-300">The faces on screen</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Leading & Supporting Actor/Actress</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-app-purple">Creators</td>
                  <td className="px-4 py-3 text-sm text-gray-300">The storytellers</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Original/Adapted Screenplay, Original Score/Song</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-app-purple">Crafters</td>
                  <td className="px-4 py-3 text-sm text-gray-300">The technical wizards</td>
                  <td className="px-4 py-3 text-sm text-gray-300">Cinematography, Editing, Production Design, Costume, Makeup, Sound, VFX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-6">
          <hr className="border-gray-700 mb-6" />
          <p className="text-gray-300 text-center italic">
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