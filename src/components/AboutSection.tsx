import React from 'react';
import { 
  CURRENT_OSCAR_YEAR, 
  AWARD_VENUES, 
  NOMINATION_TYPE_DETAILED_DESCRIPTIONS, 
  THEME_COLORS 
} from '../lib/constants';

const TableRow = ({ isHighlighted = false, name, description, details }: { isHighlighted?: boolean, name: string, description: string, details: string }) => (
  <tr className={`${isHighlighted ? 'bg-[#8A3FFC]/10' : ''} border-b border-[#8A3FFC]/30`}>
    <td className="px-6 py-4 text-sm font-medium text-[#8A3FFC]">{name}</td>
    <td className="px-6 py-4 text-sm text-white text-center">{description}</td>
    <td className="px-6 py-4 text-sm text-white">{details}</td>
  </tr>
);

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-[#8A3FFC]">And the Algorithm Goes To...</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Predictive uses data science to forecast Oscar winners, because even AI loves a good acceptance speech. 🎬
        </p>
      </div>
      
      {/* The Plot */}
      <div className="bg-[#2a3548] rounded-xl p-6 mb-12 shadow-lg border border-gray-700">
        <div className="flex items-center mb-5 border-b border-gray-700 pb-3">
          <h2 className="text-2xl font-bold text-[#8A3FFC]">The Plot</h2>
        </div>
        <p className="mb-4 text-gray-200 text-lg leading-relaxed">
          We crunch 25+ years of Academy Awards history and precursor awards data through our prediction engine. 
          Think of it as "Moneyball" meets "La La Land" - where statistics take center stage.
        </p>
      </div>
      
      {/* The Screenplay (Behind the Scenes) */}
      <div className="bg-[#2a3548] rounded-xl p-6 mb-12 shadow-lg border border-gray-700">
        <div className="flex items-center mb-5 border-b border-gray-700 pb-3">
          <h2 className="text-2xl font-bold text-[#8A3FFC]">The Screenplay</h2>
        </div>
        <ul className="mb-4 text-gray-200 pl-5 space-y-5 text-lg list-none">
          <li className="flex items-start">
            <span className="text-[#8A3FFC] mr-3 text-xl">⭐</span>
            <span>Machine learning model trained on Oscar data (1999-2024)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8A3FFC] mr-3 text-xl">⭐</span>
            <span>Real-time betting odds integration</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8A3FFC] mr-3 text-xl">⭐</span>
            <span>Weighted analysis of precursor awards (BAFTA, Golden Globes, etc.)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8A3FFC] mr-3 text-xl">⭐</span>
            <span>Historical accuracy tracking for each award predictor</span>
          </li>
        </ul>
      </div>
      
      {/* The Awards (Categories) */}
      <div className="bg-[#2a3548] rounded-xl p-6 mb-12 shadow-lg border border-gray-700">
        <div className="flex items-center mb-5 border-b border-gray-700 pb-3">
          <h2 className="text-2xl font-bold text-[#8A3FFC]">The Awards</h2>
        </div>
        
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border-2 border-[#8A3FFC]/30 rounded-lg">
            <thead className="bg-[#8A3FFC]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-[#8A3FFC]/30">Category Group</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider border-b border-[#8A3FFC]/30">What They Do</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-[#8A3FFC]/30">Awards</th>
              </tr>
            </thead>
            <tbody>
              <TableRow 
                isHighlighted={true}
                name="Makers" 
                description="The big-picture visionaries" 
                details="Best Picture, Directing, Animated Feature, Documentary, International Film" 
              />
              <TableRow 
                name="Performers" 
                description="The faces on screen" 
                details="Leading & Supporting Actor/Actress" 
              />
              <TableRow 
                isHighlighted={true}
                name="Creators" 
                description="The storytellers" 
                details="Original/Adapted Screenplay, Original Score/Song" 
              />
              <TableRow 
                name="Crafters" 
                description="The technical wizards" 
                details="Cinematography, Editing, Production Design, Costume, Makeup, Sound, VFX" 
              />
            </tbody>
          </table>
        </div>
        <div className="h-px bg-gray-600 w-full my-4"></div>
      </div>
      
      {/* The Venues (Award Season Tour) */}
      <div className="bg-[#2a3548] rounded-xl p-6 mb-12 shadow-lg border border-gray-700">
        <div className="flex items-center mb-5 border-b border-gray-700 pb-3">
          <h2 className="text-2xl font-bold text-[#8A3FFC]">The Venues</h2>
        </div>
        
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border-2 border-[#8A3FFC]/30 rounded-lg">
            <thead className="bg-[#8A3FFC]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-[#8A3FFC]/30">Award Show</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider border-b border-[#8A3FFC]/30">Hosted By</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-[#8A3FFC]/30">When It Happens</th>
              </tr>
            </thead>
            <tbody>
              <TableRow 
                isHighlighted={true}
                name="Academy Awards (Oscars)" 
                description="Academy of Motion Picture Arts and Sciences" 
                details="March" 
              />
              <TableRow 
                name="Golden Globe Awards" 
                description="Hollywood Foreign Press Association"
                details="January" 
              />
              <TableRow 
                isHighlighted={true}
                name="BAFTA Awards" 
                description="British Academy of Film and Television Arts" 
                details="February" 
              />
              <TableRow 
                name="Screen Actors Guild (SAG)" 
                description="SAG-AFTRA" 
                details="February" 
              />
              <TableRow 
                isHighlighted={true}
                name="Critics Choice Awards" 
                description="Critics Choice Association" 
                details="January" 
              />
              <TableRow 
                name="Directors Guild (DGA)" 
                description="Directors Guild of America" 
                details="February" 
              />
              <TableRow 
                isHighlighted={true}
                name="Producers Guild (PGA)" 
                description="Producers Guild of America" 
                details="February" 
              />
              <TableRow 
                name="Writers Guild (WGA)" 
                description="Writers Guild of America" 
                details="February" 
              />
            </tbody>
          </table>
        </div>
        <div className="h-px bg-gray-600 w-full my-4"></div>
      </div>
      
      {/* The Credits */}
      <div className="bg-[#2a3548] rounded-xl p-6 mb-12 shadow-lg border border-gray-700">
        <div className="flex items-center mb-5 border-b border-gray-700 pb-3">
          <h2 className="text-2xl font-bold text-[#8A3FFC]">The Credits</h2>
        </div>
        
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border-2 border-[#8A3FFC]/30 rounded-lg">
            <thead className="bg-[#8A3FFC]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-[#8A3FFC]/30">Data Source</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider border-b border-[#8A3FFC]/30">What It Tells Us</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider border-b border-[#8A3FFC]/30">Why It Matters</th>
              </tr>
            </thead>
            <tbody>
              <TableRow 
                isHighlighted={true}
                name="Academy Awards Database" 
                description="Historical nominations and wins" 
                details="Official Oscar records since 1927" 
              />
              <TableRow 
                name="IMDb Awards Central" 
                description="Comprehensive awards coverage" 
                details="Tracks 24 major film awards globally" 
              />
              <TableRow 
                isHighlighted={true}
                name="The Numbers" 
                description="Box office performance" 
                details="Financial success metrics" 
              />
              <TableRow 
                name="Variety Awards Circuit" 
                description="Industry insider coverage" 
                details="Breaking news and analysis" 
              />
              <TableRow 
                isHighlighted={true}
                name="Rotten Tomatoes" 
                description="Critics' Metascore" 
                details="Professional reception and consensus" 
              />
              <TableRow 
                name="IMDb Ratings" 
                description="Audience Score" 
                details="Public opinion and engagement" 
              />
              <TableRow 
                isHighlighted={true}
                name="Kalshi" 
                description="Prediction Markets" 
                details="Crowd-sourced probability estimates" 
              />
              <TableRow 
                name="Betting Markets" 
                description="Real-time Odds" 
                details="Market-driven likelihood assessments" 
              />
            </tbody>
          </table>
        </div>
        <div className="h-px bg-gray-600 w-full my-4"></div>
      </div>
      
      {/* Footer */}
      <div className="bg-[#2a3548] rounded-xl p-6 shadow-lg border border-gray-700">
        <div className="p-4">
          <div className="h-px bg-gray-600 w-full mb-8"></div>
          <p className="text-gray-200 text-center italic text-lg">
            Crafted by{' '}
            <a href="https://samir.xyz/ventures" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium text-[#8A3FFC] hover:underline">
              Interspace Ventures
            </a>{' '}
            using{' '}
            <a href="https://replit.com" 
               target="_blank" 
               rel="noopener noreferrer"
               className="font-medium text-[#8A3FFC] hover:underline">
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