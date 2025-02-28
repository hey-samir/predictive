import React, { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { NOMINATION_TYPES, NOMINATION_TYPE_DESCRIPTIONS, CURRENT_OSCAR_YEAR } from '../lib/constants';
import { NomineeData } from './NomineeCard';

// Mock data for initial development - will be replaced with API calls
const mockNominees: NomineeData[] = [
  {
    id: 1,
    nomineeName: "Sample Nominee 1",
    filmTitle: "Sample Film 1",
    likelihood: 75.5,
    bettingOdds: "3/2",
    marketProbability: 68.2,
    awardSupport: "BAFTA, Golden Globes, Critics Choice"
  },
  {
    id: 2,
    nomineeName: "Sample Nominee 2",
    filmTitle: "Sample Film 2",
    likelihood: 45.3,
    bettingOdds: "4/1",
    marketProbability: 42.1,
    awardSupport: "SAG"
  }
];

const PredictionsSection: React.FC = () => {
  const [predictions, setPredictions] = useState<Record<string, NomineeData[]>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true);
      
      // This would be replaced with actual API calls
      // For now, we'll just create mock data for each category
      const mockPredictions: Record<string, NomineeData[]> = {};
      
      Object.values(NOMINATION_TYPES).flat().forEach(category => {
        mockPredictions[category] = mockNominees.map((nominee, idx) => ({
          ...nominee,
          id: idx + 1,
          nomineeName: `${nominee.nomineeName} (${category})`,
          likelihood: Math.random() * 100
        }));
      });
      
      setPredictions(mockPredictions);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Oscar Predictions {CURRENT_OSCAR_YEAR}</h1>
      <p className="text-gray-600 mb-8">
        Our advanced model analyzes awards data to predict this year's Oscar winners.
      </p>
      
      {Object.entries(NOMINATION_TYPES).map(([type, categories]) => (
        <div key={type} className="mb-8">
          <div className="nomination-type-header">
            <span>{type}</span>
            <span className="text-sm ml-2 font-normal">
              {NOMINATION_TYPE_DESCRIPTIONS[type]}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  );
};

export default PredictionsSection;