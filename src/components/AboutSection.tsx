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
      <h1 className="text-3xl font-bold mb-4 text-app-purple">And the Algorithm Goes To...</h1>
      <p className="text-lg text-gray-400 mb-12">
        Predictive uses data science to forecast Oscar winners, because even AI loves a good acceptance speech. 🎬
      </p>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-12">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-app-purple">The Plot</h2>
          <p className="mb-4 text-gray-300 text-lg">
            We crunch 25+ years of Academy Awards history and precursor awards data through our prediction engine. 
            Think of it as "Moneyball" meets "La La Land" - where statistics take center stage.
          </p>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-12">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-app-purple">Behind the Scenes</h2>
          <ul className="mb-4 text-gray-300 pl-5 space-y-4 text-lg list-none">
            <li className="flex items-start">
              <span className="text-app-purple mr-2">⭐</span>
              <span>Machine learning model trained on Oscar data (1999-2024)</span>
            </li>
            <li className="flex items-start">
              <span className="text-app-purple mr-2">⭐</span>
              <span>Real-time betting odds integration</span>
            </li>
            <li className="flex items-start">
              <span className="text-app-purple mr-2">⭐</span>
              <span>Weighted analysis of precursor awards (BAFTA, Golden Globes, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-app-purple mr-2">⭐</span>
              <span>Historical accuracy tracking for each award predictor</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-12">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-app-purple">The Awards</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-app-purple/30">
              <thead className="bg-app-purple">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Category Group</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">What They Do</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Awards</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-app-purple/20">
                <tr className="bg-app-purple/5">
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">Makers</td>
                  <td className="px-4 py-4 text-sm text-gray-300">The big-picture visionaries</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Best Picture, Directing, Animated Feature, Documentary, International Film</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">Performers</td>
                  <td className="px-4 py-4 text-sm text-gray-300">The faces on screen</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Leading & Supporting Actor/Actress</td>
                </tr>
                <tr className="bg-app-purple/5">
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">Creators</td>
                  <td className="px-4 py-4 text-sm text-gray-300">The storytellers</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Original/Adapted Screenplay, Original Score/Song</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">Crafters</td>
                  <td className="px-4 py-4 text-sm text-gray-300">The technical wizards</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Cinematography, Editing, Production Design, Costume, Makeup, Sound, VFX</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden mb-12">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-app-purple">The Venues</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-app-purple/30">
              <thead className="bg-app-purple">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Award Show</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">When</th>
                  <th className="px-4 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Predictive Power</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-app-purple/20">
                <tr className="bg-app-purple/5">
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">Golden Globes</td>
                  <td className="px-4 py-4 text-sm text-gray-300">January</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Strong for Acting</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">Critics Choice</td>
                  <td className="px-4 py-4 text-sm text-gray-300">January</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Strong Overall</td>
                </tr>
                <tr className="bg-app-purple/5">
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">SAG Awards</td>
                  <td className="px-4 py-4 text-sm text-gray-300">February</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Best for Acting</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">BAFTAs</td>
                  <td className="px-4 py-4 text-sm text-gray-300">February</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Strong for Crafts</td>
                </tr>
                <tr className="bg-app-purple/5">
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">Guild Awards*</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Jan-Feb</td>
                  <td className="px-4 py-4 text-sm text-gray-300">Category Specific</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-sm font-medium text-app-purple">Academy Awards</td>
                  <td className="px-4 py-4 text-sm text-gray-300">March</td>
                  <td className="px-4 py-4 text-sm text-gray-300">The Final Act</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-400 italic">*Includes PGA, DGA, WGA for respective categories</p>
        </div>
      </div>
      
      <div className="bg-app-card shadow rounded-xl overflow-hidden">
        <div className="h-1 bg-app-purple"></div>
        <div className="p-8">
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