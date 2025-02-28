import React, { useState, useEffect } from 'react';
import { NOMINATION_TYPES, NOMINATION_TYPE_DESCRIPTIONS, CURRENT_OSCAR_YEAR } from '../lib/constants';

// Define nominee data type
export type NomineeData = {
  id: number;
  nomineeName: string;
  filmTitle?: string;
  likelihood?: number;
  bettingOdds?: string;
  marketProbability?: number;
  awardSupport?: string;
};

// Mock nominees data for development
const mockNominees: NomineeData[] = [
  {
    id: 1,
    nomineeName: "Christopher Nolan",
    filmTitle: "Oppenheimer",
    likelihood: 92.5,
    bettingOdds: "1/6",
    marketProbability: 89.8,
    awardSupport: "BAFTA, DGA, Golden Globes, Critics Choice"
  },
  {
    id: 2,
    nomineeName: "Greta Gerwig",
    filmTitle: "Barbie",
    likelihood: 45.3,
    bettingOdds: "8/1",
    marketProbability: 42.1,
    awardSupport: "Critics Choice"
  },
  {
    id: 3,
    nomineeName: "Martin Scorsese",
    filmTitle: "Killers of the Flower Moon",
    likelihood: 15.8,
    bettingOdds: "16/1",
    marketProbability: 17.3,
    awardSupport: ""
  }
];

// Simple Nominee Card component
const NomineeCard: React.FC<{ nominee: NomineeData; isTopPick?: boolean }> = ({ nominee, isTopPick = false }) => {
  const likelihoodColor = nominee.likelihood && nominee.likelihood > 80 
    ? 'text-green-600' 
    : nominee.likelihood && nominee.likelihood > 50 
      ? 'text-[#9C27B0]' 
      : 'text-gray-700';

  return (
    <div className={`border rounded-lg p-4 ${isTopPick ? 'border-[#9C27B0] bg-[#F3E5F5] bg-opacity-50' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{nominee.nomineeName}</h3>
          {nominee.filmTitle && (
            <p className="text-sm text-gray-600 mt-1">{nominee.filmTitle}</p>
          )}
        </div>
        <div className={`text-lg font-bold ${likelihoodColor}`}>
          {nominee.likelihood ? `${nominee.likelihood}%` : 'N/A'}
        </div>
      </div>

      {nominee.awardSupport && (
        <div className="text-xs mt-2 text-gray-500">
          Awards won: {nominee.awardSupport}
        </div>
      )}
      
      <div className="flex justify-between mt-3 text-xs text-gray-600">
        <div>Odds: {nominee.bettingOdds || 'N/A'}</div>
        <div>Market: {nominee.marketProbability ? `${nominee.marketProbability}%` : 'N/A'}</div>
      </div>
    </div>
  );
};

// Category Card component
const CategoryCard: React.FC<{ 
  category: string; 
  nominees: NomineeData[] 
}> = ({ category, nominees }) => {
  // Sort nominees by likelihood
  const sortedNominees = [...nominees].sort((a, b) => {
    if (a.likelihood === undefined && b.likelihood === undefined) return 0;
    if (a.likelihood === undefined) return 1;
    if (b.likelihood === undefined) return -1;
    return b.likelihood - a.likelihood;
  });

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-lg font-semibold mb-4">{category}</h2>
      <div className="space-y-3">
        {sortedNominees.slice(0, 3).map((nominee, index) => (
          <NomineeCard 
            key={nominee.id} 
            nominee={nominee} 
            isTopPick={index === 0} 
          />
        ))}
      </div>
    </div>
  );
};

const PredictionsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('awards');
  const [loading, setLoading] = useState<boolean>(true);
  const [predictions, setPredictions] = useState<Record<string, NomineeData[]>>({});
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      // Create mock predictions for each category
      const mockPredictions: Record<string, NomineeData[]> = {};
      
      Object.values(NOMINATION_TYPES).flat().forEach(category => {
        mockPredictions[category] = mockNominees.map((nominee, idx) => {
          // Vary predictions slightly by category
          const variation = Math.sin(category.length * (idx + 1)) * 15;
          return {
            ...nominee,
            id: (idx + 1) * category.length,
            likelihood: nominee.likelihood ? 
              Math.min(99, Math.max(1, nominee.likelihood + variation)) : 
              undefined
          };
        });
      });
      
      setPredictions(mockPredictions);
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9C27B0]"></div>
        <p className="mt-4 text-gray-600">Loading prediction algorithms...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-[#9C27B0]">Predictive {CURRENT_OSCAR_YEAR}</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sophisticated algorithms to predict the top Academy Award winners
      </p>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('awards')}
          className={`px-4 py-2 font-medium -mb-px
            ${activeTab === 'awards' 
              ? 'border-b-2 border-[#9C27B0] text-[#9C27B0]' 
              : 'text-gray-600 hover:text-[#9C27B0]'
            }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('top')}
          className={`px-4 py-2 font-medium -mb-px
            ${activeTab === 'top' 
              ? 'border-b-2 border-[#9C27B0] text-[#9C27B0]' 
              : 'text-gray-600 hover:text-[#9C27B0]'
            }`}
        >
          Top Picks
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'awards' && (
        <div>
          {Object.entries(NOMINATION_TYPES).map(([type, categories]) => (
            <div key={type} className="mb-10">
              <div className="bg-[#F3E5F5] px-4 py-3 rounded-lg font-medium mb-4 text-[#9C27B0]">
                {type} <span className="text-sm ml-2 text-gray-600">{NOMINATION_TYPE_DESCRIPTIONS[type]}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map(category => (
                  <CategoryCard 
                    key={category}
                    category={category}
                    nominees={predictions[category] || []}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'top' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#9C27B0]">Top Picks Across Categories</h2>
          <p className="text-gray-600 mb-6">
            Our algorithm's strongest predictions across all categories
          </p>
          
          <div className="space-y-6">
            {Object.entries(predictions)
              .map(([category, nominees]) => ({
                category,
                topNominee: nominees.sort((a, b) => 
                  (b.likelihood || 0) - (a.likelihood || 0)
                )[0]
              }))
              .filter(item => item.topNominee && (item.topNominee.likelihood || 0) > 80)
              .sort((a, b) => (b.topNominee.likelihood || 0) - (a.topNominee.likelihood || 0))
              .slice(0, 5)
              .map(item => (
                <div key={item.category} className="border-b pb-4 last:border-0">
                  <div className="text-sm font-medium text-gray-500 mb-2">{item.category}</div>
                  <NomineeCard nominee={item.topNominee} isTopPick={true} />
                </div>
              ))
            }
          </div>
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-6 text-right">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default PredictionsSection;