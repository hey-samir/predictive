import React from 'react';
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

  // Define styles from About page table styling
  const purpleColor = '#8A3FFC';
  
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    border: `2px solid ${purpleColor}30`,
    overflow: 'hidden'
  };
  
  const tableHeaderStyle = {
    backgroundColor: purpleColor,
    color: 'white',
    textTransform: 'uppercase' as const,
    fontSize: '0.813rem',
    fontWeight: 'bold',
    padding: '0.75rem 1rem',
    textAlign: 'left' as const
  };
  
  const tableHeaderCenterStyle = {
    ...tableHeaderStyle,
    textAlign: 'center' as const
  };

  return (
    <div className="bg-app-card shadow rounded-xl p-6 mb-8 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-app-purple border-b border-gray-700 pb-2">Model Weights by Category</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Category</th>
            {AWARD_VENUES.map(venue => (
              <th key={venue} style={tableHeaderCenterStyle}>{venue}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(nomineesByCategory).map(([category, categoryNominees], categoryIndex) => {
            // Get model weights for this category
            const categoryWeights = modelWeights.filter(w => w.category === category);
            
            // Only show unique categories
            if (categoryIndex > 0 && Object.keys(nomineesByCategory)[categoryIndex - 1] === category) {
              return null;
            }
            
            const rowStyle = {
              backgroundColor: categoryIndex % 2 === 0 ? `${purpleColor}15` : 'transparent',
              borderBottom: `1px solid ${purpleColor}30`
            };
            
            const cellStyle = {
              padding: '0.75rem 1rem',
              fontSize: '0.813rem',
              color: 'white'
            };
            
            const nameStyle = {
              ...cellStyle,
              fontWeight: 'bold',
              color: purpleColor
            };
            
            const centerStyle = {
              ...cellStyle,
              textAlign: 'center' as const
            };
            
            return (
              <tr key={category} style={rowStyle}>
                <td style={nameStyle}>{category}</td>
                {AWARD_VENUES.map(venue => {
                  // Find the weight for this venue and category
                  const weight = categoryWeights.find(w => w.awardVenue === venue);
                  const weightValue = weight ? weight.weight : 0;
                  const weightPercent = (weightValue * 100).toFixed(0);
                  
                  return (
                    <td 
                      key={`${category}-${venue}`} 
                      style={centerStyle}
                    >
                      {weightPercent}%
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ModelWeightTable;