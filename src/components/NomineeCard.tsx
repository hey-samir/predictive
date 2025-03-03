import React, { ReactElement } from 'react';

export type NomineeData = {
  id: number;
  nomineeName: string;
  filmTitle?: string;
  category: string;
  nominationType: string;
  year: number;
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
  
  return <span className={colorClass}>{Math.round(value)}%</span>;
};

const NomineeCard: React.FC<NomineeCardProps> = ({ nominee, isWinner = false }) => {
  const cardClass = isWinner 
    ? "bg-gray-800 p-3 rounded-md shadow-md transition-all duration-200 relative overflow-hidden border border-app-purple"
    : "bg-gray-800/60 p-3 rounded-md shadow-sm hover:bg-gray-800/80 transition-all duration-200 relative overflow-hidden";

  const likelihoodValue = nominee.likelihood !== undefined ? `${nominee.likelihood.toFixed(0)}%` : '';

  return (
    <div className={cardClass}>
      {/* Winner Badge */}
      {isWinner && (
        <div className="absolute top-0 right-0">
          <div className="bg-app-purple text-white text-xs py-1 px-2 rounded-bl-md">
            <span className="font-medium">LIKELY</span>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center">
            <h4 className="font-semibold text-white text-sm">{nominee.nomineeName}</h4>
            {likelihoodValue && (
              <span className="ml-2 text-xs font-bold text-app-purple">{likelihoodValue}</span>
            )}
          </div>
          
          {nominee.filmTitle && (
            <div className="text-xs text-gray-400 mt-0.5">{nominee.filmTitle}</div>
          )}
          
          {/* Betting and Market data in badges */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {nominee.bettingOdds && (
              <span className="px-1.5 py-0.5 text-xs bg-gray-700/60 rounded-sm text-gray-300">
                Odds: {nominee.bettingOdds}
              </span>
            )}
            
            {nominee.marketProbability !== undefined && (
              <span className="px-1.5 py-0.5 text-xs bg-gray-700/60 rounded-sm text-gray-300">
                Market: {nominee.marketProbability.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>
      
      {nominee.awardSupport && (
        <div className="mt-2 text-xs text-gray-400 border-t border-gray-700/50 pt-1.5">
          <span className="font-medium text-gray-300 text-opacity-80">Awards:</span> {nominee.awardSupport}
        </div>
      )}
    </div>
  );
};

export default NomineeCard;