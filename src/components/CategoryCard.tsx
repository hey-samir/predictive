import React from 'react';
import NomineeCard, { NomineeData } from './NomineeCard';

type CategoryCardProps = {
  category: string;
  nominees: NomineeData[];
  nominationType?: string; // Makers, Performers, Creators, or Crafters
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, nominees, nominationType }) => {
  // Sort nominees by likelihood in descending order
  const sortedNominees = [...nominees].sort((a, b) => {
    if (a.likelihood === undefined && b.likelihood === undefined) return 0;
    if (a.likelihood === undefined) return 1;
    if (b.likelihood === undefined) return -1;
    return b.likelihood - a.likelihood;
  });

  // The nominee with highest likelihood or the one with wonOscar=true
  const predictedWinner = sortedNominees.find(n => n.wonOscar) || sortedNominees[0];

  let badgeColor = 'bg-app-purple';
  if (nominationType === 'Makers') badgeColor = 'bg-blue-500';
  if (nominationType === 'Performers') badgeColor = 'bg-pink-500';
  if (nominationType === 'Creators') badgeColor = 'bg-green-500';
  if (nominationType === 'Crafters') badgeColor = 'bg-amber-500';

  return (
    <div className="bg-app-card rounded-xl p-5 mb-8 shadow-lg border border-gray-800">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold text-white">{category}</h3>
      </div>
      
      <div className="space-y-3">
        {sortedNominees.map((nominee) => (
          <NomineeCard 
            key={nominee.id} 
            nominee={nominee} 
            isWinner={nominee.id === predictedWinner.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;