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
  if (value > 80) colorClass = 'text-app-purple font-bold';
  else if (value > 60) colorClass = 'text-app-purple text-opacity-90';
  else if (value > 40) colorClass = 'text-app-purple text-opacity-75';
  else if (value > 20) colorClass = 'text-gray-300';
  else colorClass = 'text-gray-400';
  
  return <span className={colorClass}>{value.toFixed(1)}%</span>;
};

const NomineeCard: React.FC<NomineeCardProps> = ({ nominee, isWinner = false }) => {
  const cardClass = isWinner 
    ? "border-l-4 border-app-purple bg-app-card p-5 rounded-md shadow-md transition-all duration-200"
    : "border-l-4 border-app-purple/40 bg-app-card p-5 rounded-md shadow-md hover:border-app-purple/60 transition-all duration-200";

  return (
    <div className={cardClass}>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div>
          <h3 className="font-semibold text-white text-base">{nominee.nomineeName}</h3>
          {nominee.filmTitle && (
            <div className="text-sm text-gray-400 italic mt-1">{nominee.filmTitle}</div>
          )}
        </div>
        
        <div className="mt-3 md:mt-0 flex flex-col md:items-end">
          {nominee.likelihood !== undefined && (
            <div className="text-sm font-medium">
              <span className="text-gray-400 mr-1">Prediction:</span> 
              {formatLikelihood(nominee.likelihood)}
            </div>
          )}
          
          {nominee.bettingOdds && (
            <div className="text-sm font-medium mt-1">
              <span className="text-gray-400 mr-1">Odds:</span> 
              <span className="text-gray-300">{nominee.bettingOdds}</span>
            </div>
          )}
          
          {nominee.marketProbability !== undefined && (
            <div className="text-sm font-medium mt-1">
              <span className="text-gray-400 mr-1">Markets:</span> 
              <span className="text-gray-300">{nominee.marketProbability.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
      
      {nominee.awardSupport && (
        <div className="mt-4 text-xs text-gray-400 border-t border-gray-700 pt-3">
          <span className="font-medium text-gray-300">Awards:</span> {nominee.awardSupport}
        </div>
      )}
    </div>
  );
};

export default NomineeCard;