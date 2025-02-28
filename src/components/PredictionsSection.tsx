import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { NOMINATION_TYPES, NOMINATION_TYPE_DESCRIPTIONS, CURRENT_OSCAR_YEAR } from '../lib/constants';
import { NomineeData } from './NomineeCard';
import { runPredictions, getNominees } from '../lib/api';

// Enhanced mock data for initial development - will be replaced with API calls
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

const PredictionsSection: React.FC = () => {
  // Tab navigation state
  const [activeTab, setActiveTab] = useState<string>('awards');
  const [predictions, setPredictions] = useState<Record<string, NomineeData[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const refreshPredictions = async () => {
    setRefreshing(true);
    try {
      await runPredictions();
      fetchData();
    } catch (error) {
      console.error("Error refreshing predictions:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // This would be an actual API call in production
      // const data = await getNominees();
      
      // For now, we'll use mock data for development
      const mockPredictions: Record<string, NomineeData[]> = {};
      
      Object.values(NOMINATION_TYPES).flat().forEach(category => {
        mockPredictions[category] = mockNominees.map((nominee, idx) => {
          // Create realistic variations per category
          const variation = Math.sin(category.length * (idx + 1)) * 20; 
          return {
            ...nominee,
            id: (idx + 1) * category.length,
            likelihood: nominee.likelihood !== undefined ? 
              Math.min(99, Math.max(1, nominee.likelihood + variation)) : 
              50 + variation,
          };
        });
      });
      
      setPredictions(mockPredictions);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !refreshing) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9C27B0]"></div>
        <p className="mt-4 text-gray-600">Loading prediction algorithms...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[#9C27B0]">Predictive {CURRENT_OSCAR_YEAR}</h1>
          <p className="text-gray-600">
            Sophisticated algorithms to predict the top Academy Award winners
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">Last updated: {lastUpdated}</p>
          )}
        </div>
        
        <button 
          onClick={refreshPredictions}
          disabled={refreshing}
          className={`mt-4 sm:mt-0 px-4 py-2 rounded-full text-sm font-medium 
            ${refreshing ? 'bg-gray-300 text-gray-600' : 'bg-[#9C27B0] text-white hover:bg-[#7B1FA2]'} 
            transition-colors flex items-center shadow-sm`}
        >
          {refreshing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Recalculating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Recalculate Predictions
            </>
          )}
        </button>
      </div>
      
      {/* Prediction Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('awards')}
            className={`px-4 py-2 font-medium text-sm -mb-px
              ${activeTab === 'awards' 
                ? 'border-b-2 border-[#9C27B0] text-[#9C27B0]' 
                : 'text-gray-600 hover:text-[#9C27B0]'
              }`}
          >
            Award Predictive
          </button>
          <button
            onClick={() => setActiveTab('venues')}
            className={`px-4 py-2 font-medium text-sm -mb-px
              ${activeTab === 'venues' 
                ? 'border-b-2 border-[#9C27B0] text-[#9C27B0]' 
                : 'text-gray-600 hover:text-[#9C27B0]'
              }`}
          >
            Venue Predictive
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`px-4 py-2 font-medium text-sm -mb-px
              ${activeTab === 'market' 
                ? 'border-b-2 border-[#9C27B0] text-[#9C27B0]' 
                : 'text-gray-600 hover:text-[#9C27B0]'
              }`}
          >
            Market Comparison
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="tab-content">
        {/* Award Predictive Tab */}
        {activeTab === 'awards' && (
          <>
            {Object.entries(NOMINATION_TYPES).map(([type, categories]) => (
              <div key={type} className="mb-10">
                <div className="bg-[#F3E5F5] px-4 py-3 rounded-lg font-semibold mb-4 text-[#6A1B9A] flex items-center">
                  <span>{type}</span>
                  <span className="text-sm ml-3 font-normal text-gray-600">
                    {NOMINATION_TYPE_DESCRIPTIONS[type]}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </>
        )}
        
        {/* Venue Predictive Tab */}
        {activeTab === 'venues' && (
          <div className="bg-white rounded-xl shadow p-6 border border-[#EEEEEE]">
            <h2 className="text-xl font-semibold mb-4 text-[#9C27B0]">Award Venue Analysis</h2>
            <p className="mb-6 text-gray-600">
              This section analyzes how predictive each award venue is for Oscar success across different categories.
            </p>
            
            <div className="space-y-6">
              {/* Mock venue strength data */}
              {AWARD_VENUES.map((venue, index) => (
                <div key={venue} className="border-b pb-4 border-gray-100 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-800">{venue}</h3>
                    <span className="font-semibold text-[#9C27B0]">
                      {(85 - index * 7).toFixed(1)}% Overall
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-[#9C27B0] h-2.5 rounded-full" 
                      style={{ width: `${85 - index * 7}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Strongest for: {index % 2 === 0 ? 'Acting Categories' : 'Technical Categories'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Market Comparison Tab */}
        {activeTab === 'market' && (
          <div className="bg-white rounded-xl shadow p-6 border border-[#EEEEEE]">
            <h2 className="text-xl font-semibold mb-4 text-[#9C27B0]">Market Comparison</h2>
            <p className="mb-6 text-gray-600">
              This section compares our algorithmic predictions with betting odds and predictive markets.
            </p>
            
            <div className="space-y-6">
              {/* Mock market comparison data */}
              {Object.keys(predictions).slice(0, 5).map((category) => {
                const nominees = predictions[category];
                if (!nominees || nominees.length === 0) return null;
                
                const sortedNominees = [...nominees].sort((a, b) => {
                  if (a.likelihood === undefined && b.likelihood === undefined) return 0;
                  if (a.likelihood === undefined) return 1;
                  if (b.likelihood === undefined) return -1;
                  return b.likelihood - a.likelihood;
                });
                
                return (
                  <div key={category} className="border-b pb-4 border-gray-100 last:border-0">
                    <h3 className="font-medium text-gray-800 mb-2">{category}</h3>
                    
                    <div className="space-y-3">
                      {sortedNominees.slice(0, 3).map((nominee) => (
                        <div key={nominee.id} className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{nominee.nomineeName}</span>
                            {nominee.filmTitle && (
                              <span className="text-sm text-gray-500 ml-1">({nominee.filmTitle})</span>
                            )}
                          </div>
                          <div className="flex space-x-4 text-sm">
                            <div>
                              <span className="text-gray-500 mr-1">Model:</span>
                              <span className={nominee.likelihood && nominee.likelihood > 70 ? 'text-[#2E7D32] font-semibold' : ''}>
                                {nominee.likelihood?.toFixed(1)}%
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 mr-1">Market:</span>
                              <span>{nominee.marketProbability?.toFixed(1)}%</span>
                            </div>
                            <div>
                              <span className="text-gray-500 mr-1">Odds:</span>
                              <span>{nominee.bettingOdds}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-[#F3E5F5] border border-[#E1BEE7] rounded-lg p-4 mt-8 mb-4 text-sm text-gray-700">
        <p className="font-medium text-[#9C27B0] mb-2">How predictions work</p>
        <p>
          Predictions are calculated using historical data from {CURRENT_OSCAR_YEAR - 2000}+ years of Academy Award ceremonies, 
          combined with current season awards data, betting odds, and predictive markets. Each category uses a specialized 
          algorithm optimized for its unique characteristics and historical patterns.
        </p>
      </div>
    </div>
  );
};

export default PredictionsSection;