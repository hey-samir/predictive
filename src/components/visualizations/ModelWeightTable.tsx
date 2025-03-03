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
    overflow: 'hidden',
    fontSize: '0.75rem' // Reduced font size
  };
  
  const tableHeaderStyle = {
    backgroundColor: purpleColor,
    color: 'white',
    textTransform: 'uppercase' as const,
    fontSize: '0.75rem', // Reduced font size
    fontWeight: 'bold',
    padding: '0.5rem 0.5rem', // Reduced padding
    textAlign: 'left' as const
  };
  
  const tableHeaderCenterStyle = {
    ...tableHeaderStyle,
    textAlign: 'center' as const
  };

  const rotatedCellStyle = {
    width: '15px', // Slightly wider for better text visibility
    position: 'relative' as const,
    verticalAlign: 'middle' as const,
    padding: '0',
    backgroundColor: `${purpleColor}25`,
    height: '70px' // Shorter height for text
  };

  const rotatedTextStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%', 
    transformOrigin: 'center',
    transform: 'translate(-50%, -50%) rotate(-90deg)',
    whiteSpace: 'nowrap' as const,
    fontSize: '0.7rem', // Even smaller font size
    fontWeight: 'bold',
    color: purpleColor,
    letterSpacing: '-0.02em',
    textAlign: 'center' as const
  };

  return (
    <div className="bg-app-card shadow rounded-xl px-3 py-4 md:px-4 mb-8 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-app-purple border-b border-gray-700 pb-2 px-1">Precision</h2>
      <table style={tableStyle} className="min-w-full">
        <thead>
          <tr>
            <th style={{...tableHeaderStyle, width: '40px'}}></th>
            <th style={tableHeaderStyle}>Category</th>
            <th style={tableHeaderStyle}>Nomination</th>
            <th style={{...tableHeaderCenterStyle, backgroundColor: '#3B82F6'}}>Overall Likelihood</th>
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
              
              // Sort nominees by likelihood
              const sortedNominees = [...categoryNominees].sort((a, b) => (b.likelihood || 0) - (a.likelihood || 0));
              const topNominee = sortedNominees.length > 0 ? sortedNominees[0] : null;
              
              const rowStyle = {
                backgroundColor: (typeIndex + categoryIndex) % 2 === 0 ? `${purpleColor}15` : 'transparent',
                borderBottom: `1px solid ${purpleColor}30`
              };
              
              const cellStyle = {
                padding: '0.4rem 0.5rem',
                fontSize: '0.75rem',
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
              
              const likelihoodStyle = {
                ...centerStyle,
                color: '#3B82F6',
                fontWeight: 'bold'
              };

              // Generate a sample nominee for this category
              const exampleNominee = topNominee ? 
                `${topNominee.nomineeName}${topNominee.filmTitle ? ` (${topNominee.filmTitle})` : ''}` : 
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
                  <td style={likelihoodStyle}>{Math.round(topNominee?.likelihood || 0)}%</td>
                  {AWARD_VENUES.filter(venue => venue !== 'Critics Choice').map(venue => {
                    // Find the weight for this venue and category
                    const weight = categoryWeights.find(w => w.awardVenue === venue);
                    const weightValue = weight ? weight.weight : 0;
                    // Format as "0.xx" or "0.0x" depending on value
                    const formattedWeight = weightValue.toFixed(2);
                    
                    return (
                      <td 
                        key={`${category}-${venue}`} 
                        style={centerStyle}
                      >
                        {formattedWeight}
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