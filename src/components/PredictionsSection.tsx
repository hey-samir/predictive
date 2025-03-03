import React, { useState, useEffect } from 'react';
import { 
  NOMINATION_TYPES, 
  NOMINATION_CATEGORIES,
  CURRENT_OSCAR_YEAR 
} from '../lib/constants';
import LoadingCard from '@/components/ui/loading-card';
import NomineeCard from './NomineeCard';
import CategoryCard from './CategoryCard';
import { getNominees } from '@/lib/api';

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
  nominationType: string;
  year: number;
  wonOscar?: boolean;
};

// Award Card component
const AwardCard: React.FC<{ 
  category: string;
  topNominee: NomineeData;
}> = ({ category, topNominee }) => {
  const randomDelay = Math.random() * 0.4;

  return (
    <div 
      className="award-card animate-fadeInUp rounded-lg"
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
        <div className="mt-2 text-xs bg-gray-700/60 rounded p-1 inline-block">
          <span className="font-medium text-app-purple">{topNominee.category}</span>
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
  const [predictions, setPredictions] = useState<NomineeData[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filter dropdown
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch nominees data
        const nomineesData = await getNominees(CURRENT_OSCAR_YEAR);
        
        // Transform the data to flat array format
        const nomineesList: NomineeData[] = [];
        Object.entries(nomineesData).forEach(([category, nominees]) => {
          nominees.forEach((nominee) => {
            nomineesList.push({
              ...nominee,
              category
            });
          });
        });
        
        setPredictions(nomineesList.filter(nominee => nominee.year === CURRENT_OSCAR_YEAR));
        setLastUpdated(new Date().toLocaleString());
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load predictions data.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
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
      
      if (sortedNominees.length > 0) {
        result[category] = sortedNominees[0];
      }
    });
    
    return result;
  };

  // Get categories filtered by nomination type
  const getFilteredCategories = () => {
    if (activeCategory === "All") {
      return Object.keys(NOMINATION_TYPES).flatMap(type => NOMINATION_TYPES[type]);
    }
    
    return NOMINATION_TYPES[activeCategory] || [];
  };

  // Group nominees by category
  const getNomineesByCategory = (category: string) => {
    return predictions.filter(nominee => nominee.category === category);
  };

  const topNomineesMap = getTopNomineesMap();
  const filteredCategories = getFilteredCategories();

  // Handle different UI states
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="py-12 flex justify-center items-center min-h-[60vh]">
          <LoadingCard 
            spinnerSize="large"
            className="max-w-md mx-auto"
          />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-md">
            <h3 className="text-red-500 font-semibold text-lg mb-2">Error Loading Data</h3>
            <p className="text-gray-300">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="py-6">
        {filteredCategories.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No categories found for this filter.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const nominees = getNomineesByCategory(category);
              if (nominees.length === 0) return null;
              
              return (
                <div key={category} className="category-container">
                  <CategoryCard 
                    category={category} 
                    nominees={nominees}
                    nominationType={nominees[0]?.nominationType} 
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="predictions" className="py-16 relative">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {CURRENT_OSCAR_YEAR} Oscar Predictions
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-8">
            Our predictions for the {CURRENT_OSCAR_YEAR} Academy Awards, based on data from other award shows, 
            betting markets, and historical correlations.
          </p>
          
          {/* Category filter */}
          <div className="filter-container relative z-20 max-w-xs mx-auto mb-10">
            <div className="filter-dropdown-container">
              <div 
                className="filter-dropdown-header bg-gray-800 text-white p-3 rounded-lg cursor-pointer flex items-center justify-between"
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              >
                <span>{activeCategory} Categories</span>
                <svg 
                  className={`transform transition-transform duration-300 ${filterDropdownOpen ? 'rotate-180' : ''}`}
                  width="16" 
                  height="10" 
                  viewBox="0 0 16 10" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 1L8 8L15 1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              {filterDropdownOpen && (
                <div className="filter-dropdown-content absolute left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-xl z-20">
                  <div 
                    className={`p-3 cursor-pointer hover:bg-purple-900/30 ${activeCategory === 'All' ? 'bg-purple-900/30' : ''}`}
                    onClick={() => {
                      setActiveCategory('All');
                      setFilterDropdownOpen(false);
                    }}
                  >
                    All Categories
                  </div>
                  {Object.keys(NOMINATION_TYPES).map((type) => (
                    <div 
                      key={type}
                      className={`p-3 cursor-pointer hover:bg-purple-900/30 ${activeCategory === type ? 'bg-purple-900/30' : ''}`}
                      onClick={() => {
                        setActiveCategory(type);
                        setFilterDropdownOpen(false);
                      }}
                    >
                      {type} Categories
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Last updated timestamp */}
          {lastUpdated && (
            <div className="text-sm text-gray-500 mb-6">
              Last updated: {lastUpdated}
            </div>
          )}
        </div>
        
        {renderContent()}
      </div>
    </section>
  );
};

export default PredictionsSection;