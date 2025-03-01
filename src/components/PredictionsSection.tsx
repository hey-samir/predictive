import React, { useState } from 'react';
import { 
  NOMINATION_TYPES, 
  CURRENT_OSCAR_YEAR 
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

// Mock nominees data for 2025
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

// Award Card component
const AwardCard: React.FC<{ 
  category: string;
  topNominee: NomineeData;
}> = ({ category, topNominee }) => {
  return (
    <div className="bg-app-card shadow-card rounded-xl overflow-hidden hover:shadow-lg p-5 flex flex-col justify-between h-full transition-shadow duration-200">
      <div>
        <div className="text-xl font-semibold text-white mb-2 tracking-tight">
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
      <div className="flex justify-between items-end mt-4">
        <div className="text-lg font-bold text-app-purple">
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

const PredictionsSection: React.FC = () => {
  // Filter category state
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Data states
  const [predictions] = useState<NomineeData[]>(generateMockNomineesData());
  const [lastUpdated] = useState<string>(new Date().toLocaleString());

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

  const topNomineesMap = getTopNomineesMap();
  const filteredCategories = getFilteredCategories();

  return (
    <div className="max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-2 text-app-purple tracking-tight">
        Predictive {CURRENT_OSCAR_YEAR}
      </h1>
      <p className="text-lg text-gray-400 mb-8 font-light">
        Academy Award predictions using sophisticated algorithms
      </p>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-1 mb-8 bg-gray-100 w-fit rounded-full p-1">
        {["All", "Makers", "Performers", "Creators", "Crafters"].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === category ? 'text-white' : 'text-app-background'
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
      
      <div className="text-xs text-gray-500 mt-8 text-right">
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};

export default PredictionsSection;