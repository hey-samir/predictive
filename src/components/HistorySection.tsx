import React, { useState, useEffect } from 'react';
import { AWARD_VENUES, OSCAR_CATEGORIES } from '../lib/constants';

type VenueAccuracy = {
  venue: string;
  accuracy: number;
  categories: {
    category: string;
    accuracy: number;
  }[];
};

// Mock historical data for initial development
const mockVenueAccuracy: VenueAccuracy[] = AWARD_VENUES.map(venue => ({
  venue,
  accuracy: Math.round(Math.random() * 50 + 50), // Random accuracy between 50-100%
  categories: OSCAR_CATEGORIES.slice(0, 5).map(category => ({
    category,
    accuracy: Math.round(Math.random() * 60 + 40), // Random accuracy between 40-100%
  }))
}));

const HistorySection: React.FC = () => {
  const [venueData, setVenueData] = useState<VenueAccuracy[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      setLoading(true);
      // This would be replaced with actual API calls
      setVenueData(mockVenueAccuracy);
      setSelectedVenue(mockVenueAccuracy[0].venue);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  // Get data for the selected venue
  const selectedVenueData = venueData.find(v => v.venue === selectedVenue);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Historical Accuracy</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Award Venue Predictive Strength</h2>
        <p className="mb-6">
          This chart shows how accurately each award venue has predicted Oscar winners over time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Overall Accuracy by Venue</h3>
            <div className="space-y-3">
              {venueData.map(venue => (
                <div key={venue.venue} 
                  className={`cursor-pointer p-2 rounded ${selectedVenue === venue.venue ? 'bg-primary-50 border border-primary' : ''}`}
                  onClick={() => setSelectedVenue(venue.venue)}
                >
                  <div className="flex justify-between items-center">
                    <span>{venue.venue}</span>
                    <span className="font-medium">{venue.accuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${venue.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedVenueData && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-3">
                {selectedVenueData.venue} Accuracy by Category
              </h3>
              <div className="space-y-3">
                {selectedVenueData.categories.map(cat => (
                  <div key={cat.category} className="p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{cat.category}</span>
                      <span className="font-medium">{cat.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div 
                        className="bg-secondary h-2.5 rounded-full" 
                        style={{ width: `${cat.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Historical Model Performance</h2>
        <p className="mb-4">
          Our prediction model is continuously improving as we refine our algorithms and methodology.
        </p>
        <div className="flex justify-center">
          <div className="bg-gray-100 text-center p-6 rounded-lg w-full md:w-2/3">
            <p className="italic text-gray-600">
              Historical model performance visualization will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySection;