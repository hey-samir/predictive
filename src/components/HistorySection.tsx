import React, { useState, useEffect } from 'react';
import { 
  AWARD_VENUES, 
  OSCAR_CATEGORIES, 
  NOMINATION_CATEGORIES, 
  NOMINATION_TYPES 
} from '../lib/constants';
import { ModelWeight, NomineeData, HistoricalAccuracy } from '../lib/types';
import ModelWeightTable from './visualizations/ModelWeightTable';
import AccuracyBarCharts from './visualizations/AccuracyBarCharts';
import NomineeDonutChart from './visualizations/NomineeDonutChart';

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

// Mock historical data for the general venue accuracy section
const mockVenueAccuracy = AWARD_VENUES.map(venue => ({
  venue,
  accuracy: Math.round(Math.random() * 25 + 70), // Random accuracy between 70-95%
  categories: OSCAR_CATEGORIES.slice(0, 5).map(category => ({
    category,
    accuracy: Math.round(Math.random() * 30 + 65), // Random accuracy between 65-95%
  })),
  years: [2020, 2021, 2022, 2023, 2024].map(year => ({
    year,
    accuracy: Math.round(Math.random() * 25 + 65) // Random accuracy between 65-90%
  }))
}));

const HistorySection: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<string>(AWARD_VENUES[0]);
  const [viewMode, setViewMode] = useState<'categories' | 'years'>('categories');
  const [activeTab, setActiveTab] = useState<'overview' | 'precision' | 'accuracy' | 'depth'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>(NOMINATION_CATEGORIES[0]);
  const [nominees, setNominees] = useState<NomineeData[]>([]);
  const [modelWeights, setModelWeights] = useState<ModelWeight[]>([]);
  const [accuracyData, setAccuracyData] = useState<HistoricalAccuracy[]>([]);
  
  // Get data for the selected venue
  const selectedVenueData = mockVenueAccuracy.find(v => v.venue === selectedVenue);

  useEffect(() => {
    // Generate mock data
    setNominees(generateMockNominees());
    setModelWeights(generateMockModelWeights());
    setAccuracyData(generateMockHistoricalAccuracy());
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

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      {/* Header removed as requested */}
      
      {/* Precision Section - Model Weights Table */}
      <div className="mb-8">
        <ModelWeightTable 
          nominees={nominees} 
          modelWeights={modelWeights} 
          nominationType="All"
        />
      </div>
      
      {/* Accuracy Section - Bar Charts */}
      <div className="mb-8">
        <AccuracyBarCharts accuracyData={accuracyData} />
      </div>
      
      {/* Depth Section - Donut Charts */}
      <div className="mb-8">
        <div className="bg-app-card shadow rounded-xl px-3 py-4 md:px-4">
          <h2 className="text-xl font-semibold mb-4 text-app-purple border-b border-gray-700 pb-2 px-1">Depth</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default HistorySection;