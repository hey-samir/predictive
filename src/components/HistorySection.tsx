import React, { useState, useEffect } from 'react';
import { AWARD_VENUES, OSCAR_CATEGORIES } from '../lib/constants';

// Mock historical data
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
  // Defining bright purple from samir.xyz
  const brightPurple = '#8A3FFC';
  const lightPurple = '#F6F2FF';
  
  const [selectedVenue, setSelectedVenue] = useState<string>(AWARD_VENUES[0]);
  const [viewMode, setViewMode] = useState<'categories' | 'years'>('categories');

  // Get data for the selected venue
  const selectedVenueData = mockVenueAccuracy.find(v => v.venue === selectedVenue);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-3" style={{ color: brightPurple }}>Historical Accuracy</h1>
      <p className="text-lg text-gray-600 mb-6">
        How each award ceremony predicts Oscar winners
      </p>
      
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4" style={{ color: brightPurple }}>Award Venue Predictive Strength</h2>

        <div className="space-y-4">
          {mockVenueAccuracy.map(venue => (
            <div key={venue.venue} 
              className={`cursor-pointer p-3 rounded-lg transition
                ${selectedVenue === venue.venue 
                  ? '' 
                  : 'hover:bg-gray-50'}`}
              style={{ 
                backgroundColor: selectedVenue === venue.venue ? lightPurple : '',
                boxShadow: selectedVenue === venue.venue ? '0 1px 2px rgba(0,0,0,0.05)' : ''
              }}
              onClick={() => setSelectedVenue(venue.venue)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{venue.venue}</span>
                <span className="font-bold" style={{ color: brightPurple }}>{venue.accuracy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ width: `${venue.accuracy}%`, backgroundColor: brightPurple }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedVenueData && (
        <div className="bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold" style={{ color: brightPurple }}>
              {selectedVenueData.venue} Analysis
            </h2>
            
            <div className="flex rounded-md overflow-hidden border">
              <button
                className={`px-4 py-1 text-sm font-medium ${viewMode === 'categories' ? 'text-white' : 'text-gray-700'}`}
                style={{ backgroundColor: viewMode === 'categories' ? brightPurple : 'white' }}
                onClick={() => setViewMode('categories')}
              >
                By Category
              </button>
              <button
                className={`px-4 py-1 text-sm font-medium ${viewMode === 'years' ? 'text-white' : 'text-gray-700'}`}
                style={{ backgroundColor: viewMode === 'years' ? brightPurple : 'white' }}
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
                    <span>{cat.category}</span>
                    <span className="font-medium">{cat.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full opacity-80" 
                      style={{ width: `${cat.accuracy}%`, backgroundColor: brightPurple }}
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
                    <span>{yearData.year}</span>
                    <span className="font-medium">{yearData.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full opacity-80" 
                      style={{ width: `${yearData.accuracy}%`, backgroundColor: brightPurple }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistorySection;