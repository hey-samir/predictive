import React, { useMemo } from 'react';
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

  // Group categories by nomination type
  const categoriesByType = useMemo(() => {
    const result: Record<string, string[]> = {};
    
    Object.entries(NOMINATION_TYPES).forEach(([type, categories]) => {
      result[type] = categories.filter(category => nomineesByCategory[category]);
    });
    
    return result;
  }, [nomineesByCategory]);

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

  const rotatedCellStyle = {
    width: '40px',
    position: 'relative' as const,
    verticalAlign: 'middle' as const,
    padding: 0,
    backgroundColor: `${purpleColor}25`
  };

  const rotatedTextStyle = {
    position: 'absolute' as const,
    bottom: '0',
    left: '50%',
    height: '100%',
    transformOrigin: 'left bottom 0',
    transform: 'rotate(-90deg) translate(-100%, 0)',
    whiteSpace: 'nowrap' as const,
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: purpleColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0.75rem'
  };

  return (
    <div className="bg-app-card shadow rounded-xl p-6 mb-8 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-app-purple border-b border-gray-700 pb-2">Precision</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{...tableHeaderStyle, width: '40px'}}></th>
            <th style={tableHeaderStyle}>Category</th>
            <th style={tableHeaderStyle}>Nomination</th>
            {AWARD_VENUES.filter(venue => venue !== 'Critics Choice').map(venue => (
              <th key={venue} style={tableHeaderCenterStyle}>{venue}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(categoriesByType).map(([type, categories], typeIndex) => {
            if (categories.length === 0) return null;
            
            return categories.map((category, categoryIndex) => {
              const categoryNominees = nomineesByCategory[category] || [];
              // Get model weights for this category
              const categoryWeights = modelWeights.filter(w => w.category === category);
              
              const rowStyle = {
                backgroundColor: (typeIndex + categoryIndex) % 2 === 0 ? `${purpleColor}15` : 'transparent',
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

              // Generate a sample nominee for this category
              const exampleNominee = categoryNominees.length > 0 ? 
                `${categoryNominees[0].nomineeName}${categoryNominees[0].filmTitle ? ` (${categoryNominees[0].filmTitle})` : ''}` : 
                'Example Nominee';

              return (
                <tr key={category} style={rowStyle}>
                  {categoryIndex === 0 && (
                    <td 
                      style={rotatedCellStyle} 
                      rowSpan={categories.length}
                    >
                      <div style={rotatedTextStyle}>{type}</div>
                    </td>
                  )}
                  <td style={nameStyle}>{category}</td>
                  <td style={cellStyle}>{exampleNominee}</td>
                  {AWARD_VENUES.filter(venue => venue !== 'Critics Choice').map(venue => {
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
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ModelWeightTable;