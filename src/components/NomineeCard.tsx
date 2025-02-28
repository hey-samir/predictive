import React, { ReactElement } from 'react';

export type NomineeData = {
  id: number;
  nomineeName: string;
  filmTitle?: string;
  likelihood?: number;
  bettingOdds?: string;
  marketProbability?: number;
  wonOscar?: boolean;
  awardSupport?: string;
};

type NomineeCardProps = {
  nominee: NomineeData;
  isWinner?: boolean;
};

const formatLikelihood = (value?: number): ReactElement | null => {
  if (value === undefined) return null;
  
  let colorClass = 'text-gray-400';
  if (value > 80) colorClass = 'text-primary-300 font-bold';
  else if (value > 60) colorClass = 'text-primary-400';
  else if (value > 40) colorClass = 'text-primary-500';
  else if (value > 20) colorClass = 'text-gray-300';
  else colorClass = 'text-gray-400';
  
  return <span className={colorClass}>{value.toFixed(1)}%</span>;
};

const NomineeCard: React.FC<NomineeCardProps> = ({ nominee, isWinner = false }) => {
  const cardClass = isWinner 
    ? "border-l-4 border-primary-300 bg-[#2a3548] p-4 mt-2 rounded-md"
    : "border-l-4 border-primary-600 bg-[#2a3548] p-4 mt-2 rounded-md";

  return (
    <div className={cardClass}>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div>
          <div className="font-semibold text-white">{nominee.nomineeName}</div>
          {nominee.filmTitle && (
            <div className="text-sm text-gray-400 italic">{nominee.filmTitle}</div>
          )}
        </div>
        
        <div className="mt-2 md:mt-0 flex flex-col md:items-end">
          {nominee.likelihood !== undefined && (
            <div className="text-sm">
              <span className="text-gray-400 mr-1">Prediction:</span> 
              {formatLikelihood(nominee.likelihood)}
            </div>
          )}
          
          {nominee.bettingOdds && (
            <div className="text-sm">
              <span className="text-gray-400 mr-1">Odds:</span> 
              <span className="text-gray-300">{nominee.bettingOdds}</span>
            </div>
          )}
          
          {nominee.marketProbability !== undefined && (
            <div className="text-sm">
              <span className="text-gray-400 mr-1">Markets:</span> 
              <span className="text-gray-300">{nominee.marketProbability.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
      
      {nominee.awardSupport && (
        <div className="mt-3 text-xs text-gray-400 border-t border-gray-700 pt-2">
          <span className="font-medium text-gray-300">Awards:</span> {nominee.awardSupport}
        </div>
      )}
    </div>
  );
};

export default NomineeCard;