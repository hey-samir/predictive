import React, { useState, useEffect } from 'react';
import { 
  NOMINATION_TYPES, 
  NOMINATION_TYPE_DESCRIPTIONS, 
  CURRENT_OSCAR_YEAR, 
  AWARD_VENUES, 
  NOMINATION_CATEGORIES,
  THEME_COLORS 
} from '../lib/constants';

// Define nominee data type
export type NomineeData = {
  id: number;
  nomineeName: string;
  filmTitle?: string;
  likelihood?: number;
  bettingOdds?: string;
  marketProbability?: number;
  awardSupport?: string;
  category: string;
};

// Define venue strength type
type VenueStrength = {
  venue: string;
  strength: number;
  categories: string[];
};

// Mock nominees data for 2025 (ensuring we use future predictions, not 2024 results)
const generateMockNomineesData = (): NomineeData[] => {
  // Best Picture
  const bestPictureNominees = [
    {
      id: 101,
      category: "Best Picture",
      nomineeName: "Mission: Impossible — Impossible Fate",
      filmTitle: "Christopher McQuarrie",
      likelihood: 74.8,
      bettingOdds: "3/1",
      marketProbability: 71.2,
      awardSupport: "PGA, Critics Choice"
    },
    {
      id: 102,
      category: "Best Picture",
      nomineeName: "Jurassic World: Rebirth",
      filmTitle: "David Koepp",
      likelihood: 38.3,
      bettingOdds: "8/1",
      marketProbability: 35.4,
      awardSupport: "NBR"
    }
  ];
  
  // Directing
  const directingNominees = [
    {
      id: 201,
      category: "Directing",
      nomineeName: "Denis Villeneuve",
      filmTitle: "Dune Messiah",
      likelihood: 82.5,
      bettingOdds: "2/1",
      marketProbability: 79.8,
      awardSupport: "BAFTA, DGA, Golden Globes"
    },
    {
      id: 202,
      category: "Directing",
      nomineeName: "Greta Gerwig",
      filmTitle: "The Chronicles of Narnia",
      likelihood: 64.8,
      bettingOdds: "4/1",
      marketProbability: 62.7,
      awardSupport: "NYFCC"
    }
  ];
  
  // Actor in a Leading Role
  const actorLeadingNominees = [
    {
      id: 301,
      category: "Actor in a Leading Role",
      nomineeName: "Robert Downey Jr.",
      filmTitle: "Sherlock Holmes 3",
      likelihood: 78.2,
      bettingOdds: "2/1",
      marketProbability: 76.5,
      awardSupport: "BAFTA, Golden Globes, SAG"
    },
    {
      id: 302,
      category: "Actor in a Leading Role",
      nomineeName: "Leonardo DiCaprio",
      filmTitle: "Jim Jones",
      likelihood: 69.3,
      bettingOdds: "3/1",
      marketProbability: 67.8,
      awardSupport: "Critics Choice"
    }
  ];
  
  // Actress in a Leading Role
  const actressLeadingNominees = [
    {
      id: 401,
      category: "Actress in a Leading Role",
      nomineeName: "Zendaya",
      filmTitle: "Dune Messiah",
      likelihood: 85.7,
      bettingOdds: "5/4",
      marketProbability: 82.3,
      awardSupport: "Golden Globes, Critics Choice"
    },
    {
      id: 402,
      category: "Actress in a Leading Role",
      nomineeName: "Jennifer Lawrence",
      filmTitle: "The Wives",
      likelihood: 71.1,
      bettingOdds: "5/2",
      marketProbability: 69.2,
      awardSupport: "SAG"
    }
  ];
  
  // Screenplay nominees
  const screenplayNominees = [
    {
      id: 501,
      category: "Writing (Original Screenplay)",
      nomineeName: "Jordan Peele",
      filmTitle: "Nope 2",
      likelihood: 79.4,
      bettingOdds: "2/1",
      marketProbability: 76.8,
      awardSupport: "WGA, Critics Choice"
    },
    {
      id: 502,
      category: "Writing (Adapted Screenplay)",
      nomineeName: "Emerald Fennell",
      filmTitle: "Wuthering Heights",
      likelihood: 68.3,
      bettingOdds: "7/2",
      marketProbability: 65.4,
      awardSupport: "BAFTA"
    }
  ];
  
  // Technical categories
  const technicalNominees = [
    {
      id: 601,
      category: "Cinematography",
      nomineeName: "Roger Deakins",
      filmTitle: "Blade Runner 2099",
      likelihood: 91.2,
      bettingOdds: "1/3",
      marketProbability: 89.4,
      awardSupport: "BAFTA, ASC"
    },
    {
      id: 602,
      category: "Film Editing",
      nomineeName: "Thelma Schoonmaker",
      filmTitle: "Roosevelt",
      likelihood: 87.3,
      bettingOdds: "1/2",
      marketProbability: 84.7,
      awardSupport: "ACE Eddie"
    },
    {
      id: 603,
      category: "Visual Effects",
      nomineeName: "Dune Messiah",
      filmTitle: "DNEG",
      likelihood: 93.8,
      bettingOdds: "1/5",
      marketProbability: 92.6,
      awardSupport: "VES Awards"
    }
  ];
  
  return [
    ...bestPictureNominees,
    ...directingNominees,
    ...actorLeadingNominees,
    ...actressLeadingNominees,
    ...screenplayNominees,
    ...technicalNominees
  ];
};

// Mock venue strength data
const mockVenueStrengths: VenueStrength[] = [
  {
    venue: "BAFTA",
    strength: 0.85,
    categories: ["Best Picture", "Directing", "Actor in a Leading Role"]
  },
  {
    venue: "Golden Globes",
    strength: 0.72,
    categories: ["Best Picture", "Actress in a Leading Role", "Actor in a Supporting Role"]
  },
  {
    venue: "Critics Choice",
    strength: 0.68,
    categories: ["Best Picture", "Directing", "Writing (Original Screenplay)"]
  },
  {
    venue: "SAG Awards",
    strength: 0.91,
    categories: ["Actor in a Leading Role", "Actress in a Leading Role", "Actor in a Supporting Role", "Actress in a Supporting Role"]
  },
  {
    venue: "DGA",
    strength: 0.89,
    categories: ["Directing"]
  }
];

// Award Card component styled like the reference
const AwardCard: React.FC<{ 
  category: string;
  topNominee: NomineeData;
}> = ({ category, topNominee }) => {
  // Use theme colors
  const { primary, textSecondary, cardBackground } = THEME_COLORS;
  
  return (
    <div 
      className="bg-[#2a3548] shadow rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg p-5 flex flex-col justify-between h-full"
      style={{ backgroundColor: cardBackground }}
    >
      <div className="flex items-start">
        <div className="text-purple-400 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
        <div>
          <div className="text-xl font-semibold text-white mb-2">
            {topNominee.nomineeName}
          </div>
          {topNominee.filmTitle && (
            <div className="text-sm text-gray-400 mb-2 italic">
              {topNominee.filmTitle}
            </div>
          )}
          <div className="text-sm text-gray-400">
            {category}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end mt-4">
        <div className="text-lg font-bold text-purple-400">
          {topNominee.likelihood?.toFixed(0)}%
        </div>
        {topNominee.awardSupport && (
          <div className="text-xs text-gray-400">
            {topNominee.awardSupport}
          </div>
        )}
      </div>
    </div>
  );
};

// Venue Strength Card component
const VenueStrengthCard: React.FC<{
  venue: VenueStrength
}> = ({ venue }) => {
  // Use theme colors
  const { primary, cardBackground } = THEME_COLORS;
  
  return (
    <div 
      className="shadow rounded-xl overflow-hidden"
      style={{ backgroundColor: cardBackground }}
    >
      <div className="p-5">
        <div className="flex items-start">
          <div className="text-purple-400 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-3 text-white">{venue.venue}</h2>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
              <div 
                className="h-2.5 rounded-full bg-purple-500" 
                style={{ width: `${venue.strength * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mb-3">Predictive strength: {(venue.strength * 100).toFixed(1)}%</p>
            <div className="flex flex-wrap gap-2">
              {venue.categories.map(category => (
                <span 
                  key={category} 
                  className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-300"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PredictionsSection: React.FC = () => {
  // Use theme colors
  const { primary, primaryLight } = THEME_COLORS;
  
  // Filter category state for portfolio view
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Tab state for sliding format
  const [activeTab, setActiveTab] = useState<string>('awardPredictive');
  
  // Data states
  const [loading, setLoading] = useState<boolean>(true);
  const [predictions, setPredictions] = useState<NomineeData[]>([]);
  const [venueStrengths, setVenueStrengths] = useState<VenueStrength[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Get top nominees for each category
  const getTopNomineesMap = () => {
    const result: Record<string, NomineeData> = {};
    
    // Group nominees by category
    const categorizedNominees: Record<string, NomineeData[]> = {};
    predictions.forEach(nominee => {
      if (!categorizedNominees[nominee.category]) {
        categorizedNominees[nominee.category] = [];
      }
      categorizedNominees[nominee.category].push(nominee);
    });
    
    // Find top nominee for each category
    Object.entries(categorizedNominees).forEach(([category, nominees]) => {
      const sortedNominees = [...nominees].sort((a, b) => {
        if (a.likelihood === undefined && b.likelihood === undefined) return 0;
        if (a.likelihood === undefined) return 1;
        if (b.likelihood === undefined) return -1;
        return b.likelihood - a.likelihood;
      });
      
      result[category] = sortedNominees[0];
    });
    
    return result;
  };

  // Get categories filtered by nomination type
  const getFilteredCategories = () => {
    if (activeCategory === "All") {
      return Object.values(NOMINATION_TYPES).flat();
    }
    
    return NOMINATION_TYPES[activeCategory] || [];
  };

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setPredictions(generateMockNomineesData());
      setVenueStrengths(mockVenueStrengths);
      setLastUpdated(new Date().toLocaleString());
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: primary }}></div>
        <p className="mt-4 text-gray-600">Loading prediction algorithms...</p>
      </div>
    );
  }

  const topNomineesMap = getTopNomineesMap();
  const filteredCategories = getFilteredCategories();

  return (
    <div className="max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-2" style={{ color: primary }}>Predictive {CURRENT_OSCAR_YEAR}</h1>
      <p className="text-lg text-gray-400 mb-6">
        Predictive uses sophisticated algorithms to predict the top Academy Award winners
      </p>
      
      {/* Tab Navigation - Sliding format */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('awardPredictive')}
          className={`px-4 py-2 font-medium -mb-px transition-all
            ${activeTab === 'awardPredictive' 
              ? 'border-b-2' 
              : 'text-gray-400 hover:text-[#8A3FFC]'
            }`}
          style={{ 
            color: activeTab === 'awardPredictive' ? primary : '', 
            borderColor: activeTab === 'awardPredictive' ? primary : '' 
          }}
        >
          Award Predictive
        </button>
        <button
          onClick={() => setActiveTab('venuePredictive')}
          className={`px-4 py-2 font-medium -mb-px transition-all
            ${activeTab === 'venuePredictive' 
              ? 'border-b-2' 
              : 'text-gray-400 hover:text-[#8A3FFC]'
            }`}
          style={{ 
            color: activeTab === 'venuePredictive' ? primary : '', 
            borderColor: activeTab === 'venuePredictive' ? primary : '' 
          }}
        >
          Venue Predictive
        </button>
        <button
          onClick={() => setActiveTab('topPicks')}
          className={`px-4 py-2 font-medium -mb-px transition-all
            ${activeTab === 'topPicks' 
              ? 'border-b-2' 
              : 'text-gray-400 hover:text-[#8A3FFC]'
            }`}
          style={{ 
            color: activeTab === 'topPicks' ? primary : '', 
            borderColor: activeTab === 'topPicks' ? primary : '' 
          }}
        >
          Top Picks
        </button>
      </div>
      
      {/* Award Predictive Tab Content - Portfolio Style */}
      {activeTab === 'awardPredictive' && (
        <div>
          {/* Category Filter - Styled like samir.xyz/portfolio */}
          <div className="flex flex-wrap gap-1 mb-8 bg-gray-100 w-fit rounded-full p-1">
            {["All", "Makers", "Performers", "Creators", "Crafters"].map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category ? 'text-white' : 'text-[#1e2638]'
                }`}
                style={{ 
                  backgroundColor: activeCategory === category ? '#8A3FFC' : 'transparent',
                }}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Award Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map(category => (
              topNomineesMap[category] && (
                <AwardCard 
                  key={category}
                  category={category}
                  topNominee={topNomineesMap[category]}
                />
              )
            ))}
          </div>
        </div>
      )}
      
      {/* Venue Predictive Tab Content */}
      {activeTab === 'venuePredictive' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Awards Venue Analysis</h2>
            <p className="text-gray-400 mb-6">
              How strongly each award venue predicts Oscar winners across categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venueStrengths.sort((a, b) => b.strength - a.strength).map(venue => (
              <VenueStrengthCard key={venue.venue} venue={venue} />
            ))}
          </div>
        </div>
      )}
      
      {/* Top Picks Tab Content */}
      {activeTab === 'topPicks' && (
        <div className="bg-[#2a3548] rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Top Picks Across Categories</h2>
          <p className="text-gray-400 mb-6">
            Our algorithm's strongest predictions across all categories
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(topNomineesMap)
              .filter(([_, nominee]) => (nominee.likelihood || 0) > 75)
              .sort(([_, a], [__, b]) => (b.likelihood || 0) - (a.likelihood || 0))
              .slice(0, 6)
              .map(([category, nominee]) => (
                <AwardCard 
                  key={category}
                  category={category}
                  topNominee={nominee}
                />
              ))
            }
          </div>
        </div>
      )}
      
      <div className="text-xs text-gray-400 mt-8 text-right">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default PredictionsSection;