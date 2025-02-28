import React from 'react';
import NomineeCard, { NomineeData } from './NomineeCard';

type CategoryCardProps = {
  category: string;
  nominees: NomineeData[];
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, nominees }) => {
  // Sort nominees by likelihood in descending order
  const sortedNominees = [...nominees].sort((a, b) => {
    if (a.likelihood === undefined && b.likelihood === undefined) return 0;
    if (a.likelihood === undefined) return 1;
    if (b.likelihood === undefined) return -1;
    return b.likelihood - a.likelihood;
  });

  // The nominee with highest likelihood or the one with wonOscar=true
  const predictedWinner = sortedNominees.find(n => n.wonOscar) || sortedNominees[0];

  return (
    <div className="category-card">
      <h3 className="prediction-header">{category}</h3>
      
      {sortedNominees.map((nominee) => (
        <NomineeCard 
          key={nominee.id} 
          nominee={nominee} 
          isWinner={nominee.id === predictedWinner.id}
        />
      ))}
    </div>
  );
};

export default CategoryCard;