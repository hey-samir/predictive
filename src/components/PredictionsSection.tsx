import React, { useState, useEffect } from 'react';
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

// Nominees data for 2024 (for 2025 Oscars)
const generateMockNomineesData = (): NomineeData[] => {
  // Best Picture
  const bestPictureNominees = [
    {
      id: 101,
      category: "Best Picture",
      nomineeName: "Oppenheimer",
      filmTitle: "Universal Pictures",
      likelihood: 92.8,
      bettingOdds: "1/4",
      marketProbability: 91.2,
      awardSupport: "PGA, BAFTA, Critics Choice, Golden Globes"
    },
    {
      id: 102,
      category: "Best Picture",
      nomineeName: "Poor Things",
      filmTitle: "Searchlight Pictures",
      likelihood: 64.3,
      bettingOdds: "6/1",
      marketProbability: 62.4,
      awardSupport: "Golden Globes"
    },
    {
      id: 103,
      category: "Best Picture",
      nomineeName: "The Holdovers",
      filmTitle: "Focus Features",
      likelihood: 47.5,
      bettingOdds: "12/1",
      marketProbability: 45.2,
      awardSupport: "Critics Choice"
    },
    {
      id: 104,
      category: "Best Picture",
      nomineeName: "Killers of the Flower Moon",
      filmTitle: "Apple/Paramount",
      likelihood: 42.6,
      bettingOdds: "16/1",
      marketProbability: 40.3,
      awardSupport: "NBR"
    },
    {
      id: 105,
      category: "Best Picture",
      nomineeName: "American Fiction",
      filmTitle: "MGM",
      likelihood: 38.1,
      bettingOdds: "20/1",
      marketProbability: 35.8,
      awardSupport: "WGA"
    }
  ];
  
  // Directing
  const directingNominees = [
    {
      id: 201,
      category: "Directing",
      nomineeName: "Christopher Nolan",
      filmTitle: "Oppenheimer",
      likelihood: 96.5,
      bettingOdds: "1/9",
      marketProbability: 95.8,
      awardSupport: "BAFTA, DGA, Golden Globes, Critics Choice"
    },
    {
      id: 202,
      category: "Directing",
      nomineeName: "Martin Scorsese",
      filmTitle: "Killers of the Flower Moon",
      likelihood: 48.3,
      bettingOdds: "12/1",
      marketProbability: 46.7,
      awardSupport: "NBR"
    },
    {
      id: 203,
      category: "Directing",
      nomineeName: "Yorgos Lanthimos",
      filmTitle: "Poor Things",
      likelihood: 38.9,
      bettingOdds: "18/1",
      marketProbability: 36.2,
      awardSupport: "Golden Globes"
    }
  ];
  
  // Actor in a Leading Role
  const actorLeadingNominees = [
    {
      id: 301,
      category: "Actor in a Leading Role",
      nomineeName: "Cillian Murphy",
      filmTitle: "Oppenheimer",
      likelihood: 88.2,
      bettingOdds: "1/3",
      marketProbability: 86.5,
      awardSupport: "BAFTA, SAG, Golden Globes"
    },
    {
      id: 302,
      category: "Actor in a Leading Role",
      nomineeName: "Paul Giamatti",
      filmTitle: "The Holdovers",
      likelihood: 73.6,
      bettingOdds: "4/1",
      marketProbability: 71.2,
      awardSupport: "Critics Choice, Golden Globes (Comedy)"
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
      bettingOdds: "2/5",
      marketProbability: 80.3,
      awardSupport: "Golden Globes, Critics Choice, BAFTA"
    },
    {
      id: 402,
      category: "Actress in a Leading Role",
      nomineeName: "Lily Gladstone",
      filmTitle: "Killers of the Flower Moon",
      likelihood: 71.1,
      bettingOdds: "7/2",
      marketProbability: 69.2,
      awardSupport: "SAG, Golden Globes (Drama)"
    }
  ];
  
  // Supporting Actor
  const actorSupportingNominees = [
    {
      id: 501,
      category: "Actor in a Supporting Role",
      nomineeName: "Robert Downey Jr.",
      filmTitle: "Oppenheimer",
      likelihood: 94.8,
      bettingOdds: "1/8",
      marketProbability: 93.9,
      awardSupport: "BAFTA, SAG, Golden Globes, Critics Choice"
    },
    {
      id: 502,
      category: "Actor in a Supporting Role",
      nomineeName: "Ryan Gosling",
      filmTitle: "Barbie",
      likelihood: 42.5,
      bettingOdds: "16/1",
      marketProbability: 40.7,
      awardSupport: "Critics Choice"
    }
  ];
  
  // Supporting Actress
  const actressSupportingNominees = [
    {
      id: 601,
      category: "Actress in a Supporting Role",
      nomineeName: "Da'Vine Joy Randolph",
      filmTitle: "The Holdovers",
      likelihood: 95.2,
      bettingOdds: "1/12",
      marketProbability: 94.7,
      awardSupport: "SAG, BAFTA, Golden Globes, Critics Choice"
    },
    {
      id: 602,
      category: "Actress in a Supporting Role",
      nomineeName: "Emily Blunt",
      filmTitle: "Oppenheimer",
      likelihood: 38.6,
      bettingOdds: "20/1",
      marketProbability: 36.4,
      awardSupport: "BAFTA nom, SAG nom"
    }
  ];
  
  // Screenplay nominees
  const screenplayNominees = [
    {
      id: 701,
      category: "Writing (Original Screenplay)",
      nomineeName: "Anatomy of a Fall",
      filmTitle: "Justine Triet, Arthur Harari",
      likelihood: 82.4,
      bettingOdds: "1/2",
      marketProbability: 80.8,
      awardSupport: "WGA, BAFTA, Golden Globes"
    },
    {
      id: 702,
      category: "Writing (Adapted Screenplay)",
      nomineeName: "American Fiction",
      filmTitle: "Cord Jefferson",
      likelihood: 76.3,
      bettingOdds: "2/3",
      marketProbability: 74.4,
      awardSupport: "WGA, BAFTA, USC Scripter"
    }
  ];
  
  // Technical categories
  const technicalNominees = [
    {
      id: 801,
      category: "Cinematography",
      nomineeName: "Hoyte van Hoytema",
      filmTitle: "Oppenheimer",
      likelihood: 89.2,
      bettingOdds: "1/3",
      marketProbability: 88.4,
      awardSupport: "BAFTA, ASC"
    },
    {
      id: 802,
      category: "Film Editing",
      nomineeName: "Jennifer Lame",
      filmTitle: "Oppenheimer",
      likelihood: 87.3,
      bettingOdds: "1/2",
      marketProbability: 84.7,
      awardSupport: "ACE Eddie, BAFTA, Critics Choice"
    },
    {
      id: 803,
      category: "Visual Effects",
      nomineeName: "Godzilla Minus One",
      filmTitle: "Takashi Yamazaki",
      likelihood: 76.8,
      bettingOdds: "4/5",
      marketProbability: 75.6,
      awardSupport: "VES Awards, Critics Choice"
    }
  ];
  
  // International Feature
  const internationalNominees = [
    {
      id: 901,
      category: "International Feature Film",
      nomineeName: "The Zone of Interest",
      filmTitle: "United Kingdom",
      likelihood: 88.3,
      bettingOdds: "1/3",
      marketProbability: 86.9,
      awardSupport: "BAFTA, Critics Choice"
    }
  ];
  
  // Animated Feature
  const animatedNominees = [
    {
      id: 1001,
      category: "Animated Feature Film",
      nomineeName: "The Boy and the Heron",
      filmTitle: "Hayao Miyazaki",
      likelihood: 85.9,
      bettingOdds: "2/5",
      marketProbability: 84.3,
      awardSupport: "PGA, Golden Globes, Critics Choice, Annie Awards"
    }
  ];
  
  // Documentary Feature
  const documentaryNominees = [
    {
      id: 1101,
      category: "Documentary Feature Film",
      nomineeName: "20 Days in Mariupol",
      filmTitle: "Mstyslav Chernov",
      likelihood: 76.2,
      bettingOdds: "4/6",
      marketProbability: 74.8,
      awardSupport: "DGA, Critics Choice"
    }
  ];
  
  // Production Design
  const productionDesignNominees = [
    {
      id: 1201,
      category: "Production Design",
      nomineeName: "Poor Things",
      filmTitle: "James Price, Shona Heath",
      likelihood: 86.7,
      bettingOdds: "1/3",
      marketProbability: 85.4,
      awardSupport: "BAFTA, ADG, Critics Choice"
    }
  ];
  
  // Costume Design
  const costumeDesignNominees = [
    {
      id: 1301,
      category: "Costume Design",
      nomineeName: "Poor Things",
      filmTitle: "Holly Waddington",
      likelihood: 82.9,
      bettingOdds: "2/5",
      marketProbability: 81.6,
      awardSupport: "BAFTA, CDG"
    }
  ];
  
  // Makeup and Hairstyling
  const makeupNominees = [
    {
      id: 1401,
      category: "Makeup and Hairstyling",
      nomineeName: "Poor Things",
      filmTitle: "Nadia Stacey, Mark Coulier",
      likelihood: 90.4,
      bettingOdds: "1/4",
      marketProbability: 89.8,
      awardSupport: "BAFTA, Critics Choice"
    }
  ];
  
  // Sound
  const soundNominees = [
    {
      id: 1501,
      category: "Sound",
      nomineeName: "Oppenheimer",
      filmTitle: "Willie Burton, Richard King",
      likelihood: 88.1,
      bettingOdds: "1/3",
      marketProbability: 87.5,
      awardSupport: "BAFTA, MPSE, CAS"
    }
  ];
  
  // Original Score
  const scoreNominees = [
    {
      id: 1601,
      category: "Music (Original Score)",
      nomineeName: "Ludwig Göransson",
      filmTitle: "Oppenheimer",
      likelihood: 93.8,
      bettingOdds: "1/5",
      marketProbability: 92.6,
      awardSupport: "Golden Globes, Critics Choice, BAFTA"
    }
  ];
  
  // Original Song
  const songNominees = [
    {
      id: 1701,
      category: "Music (Original Song)",
      nomineeName: "What Was I Made For?",
      filmTitle: "Barbie",
      likelihood: 82.6,
      bettingOdds: "1/2",
      marketProbability: 81.3,
      awardSupport: "Golden Globes, Critics Choice, Grammy"
    }
  ];
  
  return [
    ...bestPictureNominees,
    ...directingNominees,
    ...actorLeadingNominees,
    ...actressLeadingNominees,
    ...actorSupportingNominees,
    ...actressSupportingNominees,
    ...screenplayNominees,
    ...technicalNominees,
    ...internationalNominees,
    ...animatedNominees,
    ...documentaryNominees,
    ...productionDesignNominees,
    ...costumeDesignNominees,
    ...makeupNominees,
    ...soundNominees,
    ...scoreNominees,
    ...songNominees
  ];
};

// Award Card component
const AwardCard: React.FC<{ 
  category: string;
  topNominee: NomineeData;
}> = ({ category, topNominee }) => {
  return (
    <div style={{
      backgroundColor: 'var(--app-card)',
      border: '1px solid rgba(138, 63, 252, 0.15)',
      padding: '1.25rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{textAlign: 'center', marginBottom: '12px'}}>
        <div style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'white',
          marginBottom: '8px'
        }}>
          {topNominee.nomineeName}
        </div>
        {topNominee.filmTitle && (
          <div style={{
            fontSize: '0.8rem',
            color: '#a0aec0',
            marginBottom: '8px',
            fontStyle: 'italic'
          }}>
            {topNominee.filmTitle}
          </div>
        )}
        <div style={{
          fontSize: '0.7rem',
          color: '#a0aec0',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          opacity: 0.8
        }}>
          {category}
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '12px'}}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--app-purple)',
          marginTop: '8px'
        }}>
          {topNominee.likelihood?.toFixed(0)}%
        </div>
        {topNominee.awardSupport && (
          <div style={{
            fontSize: '0.7rem',
            color: '#a0aec0',
            textAlign: 'center',
            lineHeight: 1.4,
            marginTop: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
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
  const [lastUpdated, setLastUpdated] = useState<string>("");
  
  // State for filter dropdown
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // Use useEffect to set the date on the client side only to avoid hydration errors
  useEffect(() => {
    setLastUpdated(new Date().toLocaleString());
    
    // Add event listener to close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown-container')) {
        setFilterDropdownOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
    <div className="max-w-6xl mx-auto px-8 md:px-12 py-10 text-white">
      {/* Category Filter - Adaptive based on viewport width */}
      <div className="max-w-5xl mx-auto mb-10 px-4">
        {/* CSS for responsiveness */}
        <style jsx>{`
          /* Filter button styles */
          .category-filter {
            font-size: 0.875rem;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          /* Dropdown styles */
          .filter-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: #222;
            border-radius: 0.375rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 50;
            padding: 0.5rem;
            margin-top: 0.5rem;
          }
          
          .filter-dropdown button {
            width: 100%;
            text-align: left;
            padding: 0.5rem 0.75rem;
            border-radius: 0.25rem;
            margin: 0.25rem 0;
          }
          
          /* Responsive behaviors */
          @media (max-width: 640px) {
            .filter-button-group {
              display: none;
            }
            .filter-dropdown-container {
              display: block;
            }
          }
          
          @media (min-width: 641px) {
            .filter-button-group {
              display: flex;
            }
            .filter-dropdown-container {
              display: none;
            }
          }
        `}</style>
        
        {/* Desktop/tablet view - All buttons in a row */}
        <div className="filter-button-group justify-center items-center space-x-4">
          {["All", "Makers", "Performers", "Creators", "Crafters"].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-filter ${
                activeCategory === category 
                  ? 'category-filter-active' 
                  : 'category-filter-inactive'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Mobile view - Dropdown menu */}
        <div className="filter-dropdown-container relative text-center">
          <button 
            className="category-filter category-filter-active uppercase tracking-wider"
            onClick={(e) => {
              e.stopPropagation();
              setFilterDropdownOpen(!filterDropdownOpen);
            }}
          >
            FILTER: {activeCategory}
          </button>
          
          {filterDropdownOpen && (
            <div className="filter-dropdown">
              {["All", "Makers", "Performers", "Creators", "Crafters"].map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setFilterDropdownOpen(false);
                  }}
                  className={`hover:bg-gray-700 ${
                    activeCategory === category ? 'text-[#8A3FFC]' : 'text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Award Cards Grid - using flexbox for 2 per row with consistent layout */}
      <div className="max-w-5xl mx-auto py-6">
        <div className="flex flex-wrap" style={{ margin: "-10px" }}>
          {filteredCategories.map(category => (
            topNomineesMap[category] && (
              <div key={category} 
                style={{ 
                  width: "100%", 
                  padding: "10px", 
                  boxSizing: "border-box" 
                }}
                className="sm:!w-1/2"
              >
                <AwardCard 
                  category={category}
                  topNominee={topNomineesMap[category]}
                />
              </div>
            )
          ))}
        </div>
      </div>
      
      {/* Last updated removed as requested */}
    </div>
  );
};

export default PredictionsSection;