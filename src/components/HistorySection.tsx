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
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-3 text-app-purple">Data & Analysis</h1>
      <p className="text-lg text-gray-400 mb-6">
        Exploring the data behind Oscar predictions
      </p>
      
      {/* Analytics Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'precision', label: 'Precision' },
          { id: 'accuracy', label: 'Accuracy' },
          { id: 'depth', label: 'Depth' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap
              ${activeTab === tab.id 
                ? 'bg-app-purple text-white shadow-md' 
                : 'bg-app-card text-gray-300 hover:bg-gray-700'}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <div className="bg-app-card shadow rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-app-purple border-b border-gray-700 pb-2">Award Venue Predictive Strength</h2>

            <div className="space-y-4">
              {mockVenueAccuracy.map(venue => (
                <div key={venue.venue} 
                  className={`cursor-pointer p-3 rounded-lg transition
                    ${selectedVenue === venue.venue 
                      ? 'bg-app-purple/20 shadow-sm' 
                      : 'hover:bg-app-card/80'}`}
                  onClick={() => setSelectedVenue(venue.venue)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">{venue.venue}</span>
                    <span className="font-bold text-app-purple">{venue.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                    <div 
                      className="h-2.5 rounded-full bg-app-purple" 
                      style={{ width: `${venue.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedVenueData && (
            <div className="bg-app-card shadow rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-app-purple border-b border-gray-700 pb-2">
                  {selectedVenueData.venue} Analysis
                </h2>
                
                <div className="flex rounded-md overflow-hidden border border-gray-700">
                  <button
                    className={`px-4 py-1 text-sm font-medium ${viewMode === 'categories' ? 'text-white' : 'text-gray-300'}`}
                    style={{ backgroundColor: viewMode === 'categories' ? '#8A3FFC' : 'transparent' }}
                    onClick={() => setViewMode('categories')}
                  >
                    By Category
                  </button>
                  <button
                    className={`px-4 py-1 text-sm font-medium ${viewMode === 'years' ? 'text-white' : 'text-gray-300'}`}
                    style={{ backgroundColor: viewMode === 'years' ? '#8A3FFC' : 'transparent' }}
                    onClick={() => setViewMode('years')}
                  >
                    By Year
                  </button>
                </div>
              </div>
              
              {viewMode === 'categories' && (
                <div className="space-y-3">
                  {selectedVenueData.categories
                    .sort((a, b) => b.accuracy - a.accuracy)
                    .map(cat => (
                    <div key={cat.category} className="p-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200">{cat.category}</span>
                        <span className="font-medium text-gray-200">{cat.accuracy}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="h-2 rounded-full opacity-80 bg-app-purple" 
                          style={{ width: `${cat.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {viewMode === 'years' && (
                <div className="space-y-3">
                  {selectedVenueData.years
                    .sort((a, b) => b.year - a.year)
                    .map(yearData => (
                    <div key={yearData.year} className="p-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200">{yearData.year}</span>
                        <span className="font-medium text-gray-200">{yearData.accuracy}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div 
                          className="h-2 rounded-full opacity-80 bg-app-purple" 
                          style={{ width: `${yearData.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Precision Tab - Model Weights */}
      {activeTab === 'precision' && (
        <>
          {/* Nomination Type Filter */}
          <div className="mb-6">
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
          
          {/* Model Weight Table */}
          <ModelWeightTable 
            nominees={nominees} 
            modelWeights={modelWeights} 
            nominationType={selectedCategory}
          />
        </>
      )}
      
      {/* Accuracy Tab - Bar Charts */}
      {activeTab === 'accuracy' && (
        <AccuracyBarCharts accuracyData={accuracyData} />
      )}
      
      {/* Depth Tab - Donut Charts */}
      {activeTab === 'depth' && (
        <div className="bg-app-card shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-app-purple border-b border-gray-700 pb-2">Top Nominees by Likelihood</h2>
          
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
      )}
    </div>
  );
};

export default HistorySection;