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

// This component has been removed and replaced with CategoryCard which is imported above

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
        {/* Simple filter buttons at the top */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all
              ${activeCategory === 'All' 
                ? 'bg-app-purple text-white shadow-md' 
                : 'bg-app-card text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setActiveCategory('All')}
          >
            All
          </button>
          {Object.keys(NOMINATION_TYPES).map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                ${activeCategory === type 
                  ? 'bg-app-purple text-white shadow-md' 
                  : 'bg-app-card text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveCategory(type)}
            >
              {type}
            </button>
          ))}
        </div>
        
        {renderContent()}
      </div>
    </section>
  );
};

export default PredictionsSection;