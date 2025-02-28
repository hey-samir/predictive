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

// Mock nominees data for development (with more complete dataset for portfolio view)
const generateMockNomineesData = (): NomineeData[] => {
  // Best Picture
  const bestPictureNominees = [
    {
      id: 101,
      category: "Best Picture",
      nomineeName: "Oppenheimer",
      filmTitle: "Christopher Nolan, Charles Roven, Emma Thomas",
      likelihood: 89.7,
      bettingOdds: "1/5",
      marketProbability: 86.2,
      awardSupport: "BAFTA, PGA, Critics Choice"
    },
    {
      id: 102,
      category: "Best Picture",
      nomineeName: "Poor Things",
      filmTitle: "Ed Guiney, Yorgos Lanthimos, Andrew Lowe",
      likelihood: 12.3,
      bettingOdds: "16/1",
      marketProbability: 15.4,
      awardSupport: "Golden Globes (Comedy)"
    }
  ];
  
  // Directing
  const directingNominees = [
    {
      id: 201,
      category: "Directing",
      nomineeName: "Christopher Nolan",
      filmTitle: "Oppenheimer",
      likelihood: 92.5,
      bettingOdds: "1/6",
      marketProbability: 89.8,
      awardSupport: "BAFTA, DGA, Golden Globes, Critics Choice"
    },
    {
      id: 202,
      category: "Directing",
      nomineeName: "Yorgos Lanthimos",
      filmTitle: "Poor Things",
      likelihood: 4.8,
      bettingOdds: "25/1",
      marketProbability: 8.7,
      awardSupport: ""
    }
  ];
  
  // Actor in a Leading Role
  const actorLeadingNominees = [
    {
      id: 301,
      category: "Actor in a Leading Role",
      nomineeName: "Cillian Murphy",
      filmTitle: "Oppenheimer",
      likelihood: 78.2,
      bettingOdds: "1/3",
      marketProbability: 76.5,
      awardSupport: "BAFTA, Golden Globes (Drama), SAG"
    },
    {
      id: 302,
      category: "Actor in a Leading Role",
      nomineeName: "Paul Giamatti",
      filmTitle: "The Holdovers",
      likelihood: 21.3,
      bettingOdds: "5/1",
      marketProbability: 19.8,
      awardSupport: "Golden Globes (Comedy), Critics Choice"
    }
  ];
  
  // Actress in a Leading Role
  const actressLeadingNominees = [
    {
      id: 401,
      category: "Actress in a Leading Role",
      nomineeName: "Emma Stone",
      filmTitle: "Poor Things",
      likelihood: 82.7,
      bettingOdds: "1/4",
      marketProbability: 80.3,
      awardSupport: "BAFTA, Golden Globes (Comedy), Critics Choice"
    },
    {
      id: 402,
      category: "Actress in a Leading Role",
      nomineeName: "Lily Gladstone",
      filmTitle: "Killers of the Flower Moon",
      likelihood: 17.1,
      bettingOdds: "6/1",
      marketProbability: 19.2,
      awardSupport: "Golden Globes (Drama), SAG"
    }
  ];
  
  // Screenplay nominees
  const screenplayNominees = [
    {
      id: 501,
      category: "Writing (Original Screenplay)",
      nomineeName: "Justine Triet & Arthur Harari",
      filmTitle: "Anatomy of a Fall",
      likelihood: 75.4,
      bettingOdds: "4/9",
      marketProbability: 72.8,
      awardSupport: "BAFTA, Golden Globes, Critics Choice"
    },
    {
      id: 502,
      category: "Writing (Adapted Screenplay)",
      nomineeName: "Cord Jefferson",
      filmTitle: "American Fiction",
      likelihood: 68.3,
      bettingOdds: "8/15",
      marketProbability: 65.4,
      awardSupport: "BAFTA, Critics Choice"
    }
  ];
  
  // Technical categories
  const technicalNominees = [
    {
      id: 601,
      category: "Cinematography",
      nomineeName: "Hoyte van Hoytema",
      filmTitle: "Oppenheimer",
      likelihood: 88.2,
      bettingOdds: "1/7",
      marketProbability: 86.4,
      awardSupport: "BAFTA, ASC, Critics Choice"
    },
    {
      id: 602,
      category: "Film Editing",
      nomineeName: "Jennifer Lame",
      filmTitle: "Oppenheimer",
      likelihood: 84.3,
      bettingOdds: "1/5",
      marketProbability: 82.7,
      awardSupport: "BAFTA, ACE Eddie, Critics Choice"
    },
    {
      id: 603,
      category: "Visual Effects",
      nomineeName: "Godzilla Minus One",
      filmTitle: "Visual Effects Team",
      likelihood: 79.8,
      bettingOdds: "1/4",
      marketProbability: 77.6,
      awardSupport: "BAFTA, VES Awards"
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

// Award Card component for portfolio style
const AwardCard: React.FC<{ 
  category: string;
  topNominee: NomineeData;
}> = ({ category, topNominee }) => {
  // Use theme colors
  const { primary, primaryLight } = THEME_COLORS;
  
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="h-1" style={{ backgroundColor: primary }}></div>
      <div className="p-5">
        <h3 className="font-medium text-gray-500 text-sm mb-3">{category}</h3>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="font-semibold text-lg" style={{ color: primary }}>{topNominee.nomineeName}</h2>
            {topNominee.filmTitle && (
              <p className="text-sm text-gray-600 mt-1">{topNominee.filmTitle}</p>
            )}
          </div>
          
          <div className="text-2xl font-bold" style={{ color: primary }}>
            {topNominee.likelihood?.toFixed(0)}%
          </div>
        </div>
        
        {topNominee.awardSupport && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-xs text-gray-500 mb-2">Supported by</h4>
            <div className="flex flex-wrap gap-1">
              {topNominee.awardSupport.split(', ').map(award => (
                <span 
                  key={award} 
                  className="px-2 py-1 text-xs rounded-full"
                  style={{ backgroundColor: primaryLight, color: primary }}
                >
                  {award}
                </span>
              ))}
            </div>
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
  const { primary, primaryLight } = THEME_COLORS;
  
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <div className="h-1" style={{ backgroundColor: primary }}></div>
      <div className="p-5">
        <h2 className="font-semibold text-lg mb-3" style={{ color: primary }}>{venue.venue}</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="h-2.5 rounded-full" 
            style={{ width: `${venue.strength * 100}%`, backgroundColor: primary }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mb-3">Predictive strength: {(venue.strength * 100).toFixed(1)}%</p>
        <div className="flex flex-wrap gap-2">
          {venue.categories.map(category => (
            <span 
              key={category} 
              className="px-2 py-1 text-xs rounded-full"
              style={{ backgroundColor: primaryLight, color: primary }}
            >
              {category}
            </span>
          ))}
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
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2" style={{ color: primary }}>Predictive {CURRENT_OSCAR_YEAR}</h1>
      <p className="text-lg text-gray-600 mb-6">
        Predictive uses sophisticated algorithms to predict the top Academy Award winners
      </p>
      
      {/* Tab Navigation - Sliding format */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('awardPredictive')}
          className={`px-4 py-2 font-medium -mb-px transition-all
            ${activeTab === 'awardPredictive' 
              ? 'border-b-2' 
              : 'text-gray-600 hover:text-[#8A3FFC]'
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
              : 'text-gray-600 hover:text-[#8A3FFC]'
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
              : 'text-gray-600 hover:text-[#8A3FFC]'
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
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {NOMINATION_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all`}
                style={{ 
                  backgroundColor: activeCategory === category ? primary : 'transparent',
                  color: activeCategory === category ? 'white' : primary,
                  border: `1px solid ${primary}`
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
            <h2 className="text-xl font-semibold mb-4" style={{ color: primary }}>Awards Venue Analysis</h2>
            <p className="text-gray-600 mb-6">
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
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: primary }}>Top Picks Across Categories</h2>
          <p className="text-gray-600 mb-6">
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
      
      <div className="text-xs text-gray-500 mt-8 text-right">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default PredictionsSection;