import React, { useState } from 'react';
import { AWARD_VENUES, NOMINATION_TYPES } from '../../lib/constants';
import { ModelWeight, NomineeData } from '../../lib/types';

// Define prop types for the component
interface ModelWeightTableProps {
  nominees: NomineeData[];
  modelWeights: ModelWeight[];
  nominationType?: string;
}

const ModelWeightTable: React.FC<ModelWeightTableProps> = ({ 
  nominees, 
  modelWeights,
  nominationType = 'All'
}) => {
  // Filter nominees based on nomination type if specified
  const filteredNominees = nominationType === 'All' 
    ? nominees
    : nominees.filter(nominee => nominee.nominationType === nominationType);

  // Group nominees by category
  const nomineesByCategory: Record<string, NomineeData[]> = {};
  filteredNominees.forEach(nominee => {
    if (!nomineesByCategory[nominee.category]) {
      nomineesByCategory[nominee.category] = [];
    }
    nomineesByCategory[nominee.category].push(nominee);
  });

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-app-card text-gray-200">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4 text-left text-sm font-semibold">Category</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Nominee</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Film</th>
            {AWARD_VENUES.map(venue => (
              <th key={venue} className="py-3 px-4 text-center text-sm font-semibold">{venue}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(nomineesByCategory).flatMap(([category, nominees]) => 
            nominees.map((nominee, index) => {
              // Get model weights for this category
              const categoryWeights = modelWeights.filter(w => w.category === category);
              
              return (
                <tr 
                  key={nominee.id} 
                  className={`
                    ${index < nominees.length - 1 ? 'border-b border-gray-800' : ''}
                    ${index === 0 && index !== nominees.length - 1 ? 'border-t border-gray-700' : ''}
                    hover:bg-gray-800/30 transition-colors
                  `}
                >
                  {/* Show category only for the first nominee in a category */}
                  {index === 0 ? (
                    <td 
                      className="py-3 px-4 text-left text-sm font-medium text-white"
                      rowSpan={nominees.length}
                    >
                      {category}
                    </td>
                  ) : null}
                  
                  <td className="py-3 px-4 text-left text-sm">
                    {nominee.nomineeName}
                  </td>
                  
                  <td className="py-3 px-4 text-left text-sm text-gray-400">
                    {nominee.filmTitle || ''}
                  </td>
                  
                  {AWARD_VENUES.map(venue => {
                    // Find the weight for this venue and category
                    const weight = categoryWeights.find(w => w.awardVenue === venue);
                    const weightValue = weight ? weight.weight : 0;
                    
                    // Generate a background color intensity based on weight
                    const colorIntensity = Math.round(weightValue * 100);
                    
                    return (
                      <td 
                        key={`${nominee.id}-${venue}`} 
                        className="py-2 px-4 text-center text-sm relative"
                      >
                        <div className="absolute inset-0 bg-app-purple opacity-20" 
                          style={{ opacity: weightValue * 0.4 }}
                        />
                        <span className="relative z-10 font-medium">
                          {weightValue.toFixed(2)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ModelWeightTable;