import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { HistoricalAccuracy } from '../../lib/types';
import { AWARD_VENUES, THEME_COLORS } from '../../lib/constants';

interface AccuracyBarChartsProps {
  accuracyData: HistoricalAccuracy[];
}

const AccuracyBarCharts: React.FC<AccuracyBarChartsProps> = ({ accuracyData }) => {
  // Group data by venue
  const dataByVenue: Record<string, HistoricalAccuracy[]> = {};
  
  // Filter out Critics Choice from venues
  AWARD_VENUES.filter(venue => venue !== 'Critics Choice').forEach(venue => {
    dataByVenue[venue] = accuracyData.filter(item => item.venue === venue);
  });

  // Create a color palette for the bars
  const getBarColor = (index: number) => {
    const colorPalette = [
      THEME_COLORS.primary,
      '#A66AFF', // lighter purple
      '#6A4CBB', // darker purple
      '#9B59B6', // another purple shade
      '#8E44AD', // yet another purple shade
      '#D6BCFA', // lightest purple
      '#553C9A'  // darkest purple
    ];
    
    return colorPalette[index % colorPalette.length];
  };

  // Customize tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-app-card p-3 rounded shadow border border-gray-700">
          <p className="font-medium text-gray-200">{`${label}`}</p>
          <p className="text-app-purple font-bold">{`Accuracy: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-app-card shadow rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-app-purple border-b border-gray-700 pb-2">Venue Accuracy By Category</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {Object.entries(dataByVenue).map(([venue, data], venueIndex) => {
          // Prepare data for the chart by summing up total correct predictions
          const chartData = data
            .sort((a, b) => b.accuracy - a.accuracy)
            .slice(0, 10) // Show top 10 categories
            .map((item, index) => ({
              name: item.category,
              accuracy: item.accuracy,
              color: getBarColor(index)
            }));

          return (
            <div 
              key={venue} 
              className="bg-app-card/50 rounded-lg shadow border border-gray-700 p-4"
            >
              <h3 className="text-lg font-semibold text-app-purple mb-3">{venue}</h3>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#404859" />
                    <XAxis 
                      type="number" 
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fill: '#B4B7BD' }}
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: '#B4B7BD' }}
                      width={100}
                      tickFormatter={(value) => value.length > 12 ? `${value.substring(0, 12)}...` : value}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccuracyBarCharts;