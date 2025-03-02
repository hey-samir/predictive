import React, { useState, useEffect } from 'react';
import ModelWeightTable from './visualizations/ModelWeightTable';
import AccuracyBarCharts from './visualizations/AccuracyBarCharts';
import NomineeDonutChart from './visualizations/NomineeDonutChart';
import LoadingCard from '@/components/ui/loading-card';
import { 
  AWARD_VENUES, 
  NOMINATION_TYPES, 
  OSCAR_CATEGORIES, 
  NOMINATION_CATEGORIES
} from '../lib/constants';
import { NomineeData, ModelWeight, HistoricalAccuracy } from '../lib/types';

// Generate mock model weights
const generateMockModelWeights = (): ModelWeight[] => {
  const weights: ModelWeight[] = [];
  let id = 1;
  
  OSCAR_CATEGORIES.forEach(category => {
    AWARD_VENUES.forEach(venue => {
      // Generate a random weight between 0.1 and 0.9
      const weight = Math.random() * 0.8 + 0.1;
      const accuracy = Math.round(weight * 100);
      
      weights.push({
        id: id++,
        year: 2025,
        category,
        awardVenue: venue,
        weight,
        accuracy
      });
    });
  });
  
  return weights;
};

// Generate mock nominees data
const generateMockNominees = (): NomineeData[] => {
  const nominees: NomineeData[] = [];
  let id = 1;
  
  // Mock film titles
  const filmTitles = [
    "The Last Journey", "Eternal Echoes", "Midnight Whispers",
    "Beyond the Horizon", "Shadowed Dreams", "Forgotten Memories",
    "The Silent Echo", "Crimson Tide Rising", "Shattered Glass",
    "The Invisible Thread", "Lost in Translation", "A Beautiful Mind",
    "The Departed", "Inception", "The Dark Knight"
  ];
  
  // Generate nominees for each category
  OSCAR_CATEGORIES.forEach(category => {
    // Determine nomination type
    let nominationType = "Makers"; // Default
    Object.entries(NOMINATION_TYPES).forEach(([type, categories]) => {
      if (categories.includes(category)) {
        nominationType = type;
      }
    });
    
    // Generate 5 nominees per category
    for (let i = 0; i < 5; i++) {
      const filmTitle = filmTitles[Math.floor(Math.random() * filmTitles.length)];
      const likelihood = Math.random() * 100;
      const bettingOdds = `${Math.floor(Math.random() * 10) + 1}/${Math.floor(Math.random() * 10) + 1}`;
      const marketProbability = Math.random() * 100;
      
      // Generate award support string
      const supportVenues = AWARD_VENUES
        .filter(() => Math.random() > 0.5)
        .join(", ");
      
      nominees.push({
        id: id++,
        nomineeName: `Nominee ${i + 1}`,
        filmTitle,
        category,
        nominationType,
        likelihood,
        bettingOdds,
        marketProbability,
        awardSupport: supportVenues,
        year: 2025
      });
    }
  });
  
  return nominees;
};

// Generate mock historical accuracy data
const generateMockHistoricalAccuracy = (): HistoricalAccuracy[] => {
  const accuracyData: HistoricalAccuracy[] = [];
  
  AWARD_VENUES.forEach(venue => {
    OSCAR_CATEGORIES.forEach(category => {
      accuracyData.push({
        venue,
        category,
        accuracy: Math.floor(Math.random() * 30) + 70, // Random accuracy between 70-100%
        year: 2025
      });
    });
  });
  
  return accuracyData;
};

const VisualizationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(NOMINATION_CATEGORIES[0]);
  const [nominees, setNominees] = useState<NomineeData[]>([]);
  const [modelWeights, setModelWeights] = useState<ModelWeight[]>([]);
  const [accuracyData, setAccuracyData] = useState<HistoricalAccuracy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock data
      setNominees(generateMockNominees());
      setModelWeights(generateMockModelWeights());
      setAccuracyData(generateMockHistoricalAccuracy());
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // Group nominees by category for donut charts
  const nomineesByCategory: Record<string, NomineeData[]> = {};
  
  nominees.forEach(nominee => {
    if (!nomineesByCategory[nominee.category]) {
      nomineesByCategory[nominee.category] = [];
    }
    nomineesByCategory[nominee.category].push(nominee);
  });
  
  // Get categories based on selected nomination type
  const categoriesForDonutCharts = selectedCategory === 'All'
    ? OSCAR_CATEGORIES
    : NOMINATION_TYPES[selectedCategory] || [];
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-3 text-app-purple">Oscar Visualizations</h1>
        <p className="text-lg text-gray-400 mb-8">
          Explore the data behind Oscar predictions with interactive visualizations
        </p>
        
        <LoadingCard 
          title="Visualization Data" 
          message="Loading analytics visualizations..." 
          spinnerSize="large"
          className="max-w-md mx-auto mb-8"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-3 text-app-purple">Oscar Visualizations</h1>
      <p className="text-lg text-gray-400 mb-6">
        Explore the data behind Oscar predictions with interactive visualizations
      </p>
      
      {/* Nomination Type Filter */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-app-purple">Filter by Nomination Type</h2>
        <div className="flex flex-wrap gap-2">
          {NOMINATION_CATEGORIES.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                ${selectedCategory === category 
                  ? 'bg-app-purple text-white shadow-md' 
                  : 'bg-app-card text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Precision: Model Weight Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-app-purple">Precision</h2>
        <p className="text-gray-400 mb-6">
          Model weighting for each venue across nominations
        </p>
        <ModelWeightTable 
          nominees={nominees} 
          modelWeights={modelWeights} 
          nominationType={selectedCategory}
        />
      </section>
      
      {/* Accuracy: Venue Accuracy Bar Charts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-app-purple">Accuracy</h2>
        <p className="text-gray-400 mb-6">
          Historical accuracy by venue and category
        </p>
        <AccuracyBarCharts accuracyData={accuracyData} />
      </section>
      
      {/* Depth: Nominee Donut Charts */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-app-purple">Depth</h2>
        <p className="text-gray-400 mb-6">
          Top 5 nominees by likelihood to win
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesForDonutCharts.slice(0, 6).map(category => {
            const categoryNominees = nomineesByCategory[category] || [];
            return (
              <NomineeDonutChart 
                key={category}
                nominees={categoryNominees}
                category={category}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default VisualizationsSection;