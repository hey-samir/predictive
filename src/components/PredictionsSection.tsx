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

// Nominees data for 2024 (for 2025 Oscars) - Updated with 2024 films
const generateMockNomineesData = (): NomineeData[] => {
  // Best Picture
  const bestPictureNominees = [
    {
      id: 101,
      category: "Best Picture",
      nomineeName: "Dune: Part Two",
      filmTitle: "Warner Bros.",
      likelihood: 88.5,
      bettingOdds: "3/1",
      marketProbability: 85.2,
      awardSupport: "NBR, Critics Choice, PGA"
    },
    {
      id: 102,
      category: "Best Picture",
      nomineeName: "Challengers",
      filmTitle: "MGM/Amazon",
      likelihood: 76.3,
      bettingOdds: "5/1",
      marketProbability: 72.4,
      awardSupport: "Venice Film Festival, Golden Globes"
    },
    {
      id: 103,
      category: "Best Picture",
      nomineeName: "Furiosa: A Mad Max Saga",
      filmTitle: "Warner Bros.",
      likelihood: 68.5,
      bettingOdds: "8/1",
      marketProbability: 65.2,
      awardSupport: "Critics Choice, BAFTA"
    },
    {
      id: 104,
      category: "Best Picture",
      nomineeName: "The Bikeriders",
      filmTitle: "Focus Features",
      likelihood: 62.6,
      bettingOdds: "10/1",
      marketProbability: 60.3,
      awardSupport: "NBR"
    },
    {
      id: 105,
      category: "Best Picture",
      nomineeName: "Gladiator II",
      filmTitle: "Paramount Pictures",
      likelihood: 58.1,
      bettingOdds: "12/1",
      marketProbability: 55.8,
      awardSupport: "PGA nom"
    }
  ];
  
  // Directing
  const directingNominees = [
    {
      id: 201,
      category: "Directing",
      nomineeName: "Denis Villeneuve",
      filmTitle: "Dune: Part Two",
      likelihood: 87.5,
      bettingOdds: "5/2",
      marketProbability: 85.8,
      awardSupport: "NBR, DGA, Critics Choice"
    },
    {
      id: 202,
      category: "Directing",
      nomineeName: "Luca Guadagnino",
      filmTitle: "Challengers",
      likelihood: 76.3,
      bettingOdds: "4/1",
      marketProbability: 72.7,
      awardSupport: "Venice, Golden Globes"
    },
    {
      id: 203,
      category: "Directing",
      nomineeName: "George Miller",
      filmTitle: "Furiosa: A Mad Max Saga",
      likelihood: 68.9,
      bettingOdds: "6/1",
      marketProbability: 66.2,
      awardSupport: "BAFTA nom"
    }
  ];
  
  // Actor in a Leading Role
  const actorLeadingNominees = [
    {
      id: 301,
      category: "Actor in a Leading Role",
      nomineeName: "Timothée Chalamet",
      filmTitle: "Dune: Part Two",
      likelihood: 84.2,
      bettingOdds: "3/1",
      marketProbability: 82.5,
      awardSupport: "Critics Choice, Golden Globes"
    },
    {
      id: 302,
      category: "Actor in a Leading Role",
      nomineeName: "Austin Butler",
      filmTitle: "The Bikeriders",
      likelihood: 78.6,
      bettingOdds: "4/1",
      marketProbability: 76.2,
      awardSupport: "SAG, NBR"
    }
  ];
  
  // Actress in a Leading Role
  const actressLeadingNominees = [
    {
      id: 401,
      category: "Actress in a Leading Role",
      nomineeName: "Zendaya",
      filmTitle: "Challengers",
      likelihood: 88.7,
      bettingOdds: "5/2",
      marketProbability: 86.3,
      awardSupport: "Golden Globes, Critics Choice, BAFTA"
    },
    {
      id: 402,
      category: "Actress in a Leading Role",
      nomineeName: "Anya Taylor-Joy",
      filmTitle: "Furiosa: A Mad Max Saga",
      likelihood: 81.1,
      bettingOdds: "3/1",
      marketProbability: 79.2,
      awardSupport: "SAG, Critics Choice"
    }
  ];
  
  // Supporting Actor
  const actorSupportingNominees = [
    {
      id: 501,
      category: "Actor in a Supporting Role",
      nomineeName: "Josh O'Connor",
      filmTitle: "Challengers",
      likelihood: 87.8,
      bettingOdds: "3/1",
      marketProbability: 85.9,
      awardSupport: "BAFTA, SAG, Golden Globes"
    },
    {
      id: 502,
      category: "Actor in a Supporting Role",
      nomineeName: "Josh Brolin",
      filmTitle: "Dune: Part Two",
      likelihood: 78.5,
      bettingOdds: "4/1",
      marketProbability: 76.7,
      awardSupport: "Critics Choice, SAG nom"
    }
  ];
  
  // Supporting Actress
  const actressSupportingNominees = [
    {
      id: 601,
      category: "Actress in a Supporting Role",
      nomineeName: "Florence Pugh",
      filmTitle: "Dune: Part Two",
      likelihood: 85.2,
      bettingOdds: "5/2",
      marketProbability: 83.7,
      awardSupport: "SAG, BAFTA, Critics Choice"
    },
    {
      id: 602,
      category: "Actress in a Supporting Role",
      nomineeName: "Mike Faist",
      filmTitle: "Challengers",
      likelihood: 75.6,
      bettingOdds: "4/1",
      marketProbability: 73.4,
      awardSupport: "BAFTA nom, SAG nom"
    }
  ];
  
  // Screenplay nominees
  const screenplayNominees = [
    {
      id: 701,
      category: "Writing (Original Screenplay)",
      nomineeName: "Challengers",
      filmTitle: "Justin Kuritzkes",
      likelihood: 86.4,
      bettingOdds: "5/2",
      marketProbability: 84.8,
      awardSupport: "WGA, Golden Globes"
    },
    {
      id: 702,
      category: "Writing (Adapted Screenplay)",
      nomineeName: "Dune: Part Two",
      filmTitle: "Denis Villeneuve, Jon Spaihts",
      likelihood: 82.3,
      bettingOdds: "3/1",
      marketProbability: 80.4,
      awardSupport: "WGA, BAFTA, USC Scripter"
    }
  ];
  
  // Technical categories
  const technicalNominees = [
    {
      id: 801,
      category: "Cinematography",
      nomineeName: "Greig Fraser",
      filmTitle: "Dune: Part Two",
      likelihood: 89.2,
      bettingOdds: "2/1",
      marketProbability: 88.4,
      awardSupport: "BAFTA, ASC"
    },
    {
      id: 802,
      category: "Film Editing",
      nomineeName: "Joe Walker",
      filmTitle: "Dune: Part Two",
      likelihood: 87.3,
      bettingOdds: "2/1",
      marketProbability: 84.7,
      awardSupport: "ACE Eddie, BAFTA, Critics Choice"
    },
    {
      id: 803,
      category: "Visual Effects",
      nomineeName: "Dune: Part Two",
      filmTitle: "DNEG, Wylie Co.",
      likelihood: 92.8,
      bettingOdds: "2/1",
      marketProbability: 90.6,
      awardSupport: "VES Awards, Critics Choice"
    }
  ];
  
  // International Feature
  const internationalNominees = [
    {
      id: 901,
      category: "International Feature Film",
      nomineeName: "All We Imagine as Light",
      filmTitle: "India",
      likelihood: 83.3,
      bettingOdds: "3/1",
      marketProbability: 81.9,
      awardSupport: "Cannes Grand Prix, BAFTA"
    }
  ];
  
  // Animated Feature
  const animatedNominees = [
    {
      id: 1001,
      category: "Animated Feature Film",
      nomineeName: "Inside Out 2",
      filmTitle: "Pixar",
      likelihood: 91.9,
      bettingOdds: "2/1",
      marketProbability: 90.3,
      awardSupport: "PGA, Golden Globes, Critics Choice, Annie Awards"
    }
  ];
  
  // Documentary Feature
  const documentaryNominees = [
    {
      id: 1101,
      category: "Documentary Feature Film",
      nomineeName: "Quiet on Set",
      filmTitle: "Mary Robertson, Emma Schwartz",
      likelihood: 82.2,
      bettingOdds: "3/1",
      marketProbability: 80.8,
      awardSupport: "DGA, Critics Choice"
    }
  ];
  
  // Production Design
  const productionDesignNominees = [
    {
      id: 1201,
      category: "Production Design",
      nomineeName: "Dune: Part Two",
      filmTitle: "Patrice Vermette",
      likelihood: 90.7,
      bettingOdds: "2/1",
      marketProbability: 89.4,
      awardSupport: "BAFTA, ADG, Critics Choice"
    }
  ];
  
  // Costume Design
  const costumeDesignNominees = [
    {
      id: 1301,
      category: "Costume Design",
      nomineeName: "Dune: Part Two",
      filmTitle: "Jacqueline West",
      likelihood: 86.9,
      bettingOdds: "5/2",
      marketProbability: 84.6,
      awardSupport: "BAFTA, CDG"
    }
  ];
  
  // Makeup and Hairstyling
  const makeupNominees = [
    {
      id: 1401,
      category: "Makeup and Hairstyling",
      nomineeName: "Furiosa: A Mad Max Saga",
      filmTitle: "Lesley Vanderwalt, Damian Martin",
      likelihood: 88.4,
      bettingOdds: "2/1",
      marketProbability: 86.8,
      awardSupport: "BAFTA, MUAHS Guild"
    }
  ];
  
  // Sound
  const soundNominees = [
    {
      id: 1501,
      category: "Sound",
      nomineeName: "Dune: Part Two",
      filmTitle: "Mark Mangini, Theo Green, Ron Bartlett",
      likelihood: 90.1,
      bettingOdds: "2/1",
      marketProbability: 89.5,
      awardSupport: "BAFTA, MPSE, CAS"
    }
  ];
  
  // Original Score
  const scoreNominees = [
    {
      id: 1601,
      category: "Music (Original Score)",
      nomineeName: "Hans Zimmer",
      filmTitle: "Dune: Part Two",
      likelihood: 89.8,
      bettingOdds: "2/1",
      marketProbability: 88.6,
      awardSupport: "Golden Globes, Critics Choice, BAFTA"
    }
  ];
  
  // Original Song
  const songNominees = [
    {
      id: 1701,
      category: "Music (Original Song)",
      nomineeName: "For the Throne",
      filmTitle: "Challengers",
      likelihood: 82.6,
      bettingOdds: "5/2",
      marketProbability: 81.3,
      awardSupport: "Golden Globes, Critics Choice"
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
  // Calculate animation delay based on index (since we can't easily access index here)
  // We'll use a random small delay instead
  const randomDelay = Math.random() * 0.4;

  return (
    <div 
      className="award-card animate-fadeInUp"
      style={{
        backgroundColor: 'var(--app-card)',
        border: '1px solid rgba(138, 63, 252, 0.15)',
        padding: '1.25rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        animationDelay: `${randomDelay}s`
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
      {/* Category Filter with larger buttons and proper spacing */}
      <div className="w-full mx-auto mb-16 mt-8">
        <div className="flex flex-wrap justify-center items-center" style={{gap: '12px'}}>
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
      </div>
      
      {/* Award Cards Grid - Force 2-column layout with !important */}
      <div className="w-full mx-auto py-6" style={{maxWidth: '650px'}}>
        <div className="awards-grid" style={{
          display: 'grid !important',
          gridTemplateColumns: 'repeat(2, 1fr) !important',
          gap: '2rem !important',
          width: '100% !important'
        }}>
          {filteredCategories.map(category => (
            topNomineesMap[category] && (
              <div key={category} className="h-full" style={{width: '100%'}}>
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