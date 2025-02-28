import React, { useState, useEffect } from 'react';
import { AWARD_VENUES, OSCAR_CATEGORIES } from '../lib/constants';

// Mock historical data
const mockVenueAccuracy = AWARD_VENUES.map(venue => ({
  venue,
  accuracy: Math.round(Math.random() * 25 + 70), // Random accuracy between 70-95%
  categories: OSCAR_CATEGORIES.slice(0, 5).map(category => ({
    category,
    accuracy: Math.round(Math.random() * 30 + 65), // Random accuracy between 65-95%
  }))
}));

const HistorySection: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<string>(AWARD_VENUES[0]);

  // Get data for the selected venue
  const selectedVenueData = mockVenueAccuracy.find(v => v.venue === selectedVenue);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-3 text-[#9C27B0]">Historical Accuracy</h1>
      <p className="text-lg text-gray-600 mb-6">
        How each award ceremony predicts Oscar winners
      </p>
      
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-[#9C27B0]">Award Venue Predictive Strength</h2>

        <div className="space-y-4">
          {mockVenueAccuracy.map(venue => (
            <div key={venue.venue} 
              className={`cursor-pointer p-3 rounded-lg transition
                ${selectedVenue === venue.venue 
                  ? 'bg-[#F3E5F5] shadow-sm' 
                  : 'hover:bg-gray-50'}`}
              onClick={() => setSelectedVenue(venue.venue)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{venue.venue}</span>
                <span className="font-bold text-[#9C27B0]">{venue.accuracy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-[#9C27B0] h-2.5 rounded-full" 
                  style={{ width: `${venue.accuracy}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedVenueData && (
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#9C27B0]">
            Category Breakdown: {selectedVenueData.venue}
          </h2>
          <div className="space-y-3">
            {selectedVenueData.categories.map(cat => (
              <div key={cat.category} className="p-2">
                <div className="flex justify-between items-center">
                  <span>{cat.category}</span>
                  <span className="font-medium">{cat.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-[#9C27B0] bg-opacity-60 h-2 rounded-full" 
                    style={{ width: `${cat.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorySection;