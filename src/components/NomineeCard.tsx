import React from 'react';

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

const formatLikelihood = (value?: number): JSX.Element | null => {
  if (value === undefined) return null;
  
  let colorClass = 'text-gray-700';
  if (value > 80) colorClass = 'text-green-600 font-bold';
  else if (value > 60) colorClass = 'text-green-500';
  else if (value > 40) colorClass = 'text-yellow-600';
  else if (value > 20) colorClass = 'text-orange-500';
  else colorClass = 'text-red-500';
  
  return <span className={colorClass}>{value.toFixed(1)}%</span>;
};

const NomineeCard: React.FC<NomineeCardProps> = ({ nominee, isWinner = false }) => {
  return (
    <div className={`nominee-card ${isWinner ? 'winner-card' : ''}`}>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div>
          <div className="font-semibold">{nominee.nomineeName}</div>
          {nominee.filmTitle && (
            <div className="text-sm text-gray-600 italic">{nominee.filmTitle}</div>
          )}
        </div>
        
        <div className="mt-2 md:mt-0 flex flex-col md:items-end">
          {nominee.likelihood !== undefined && (
            <div className="text-sm">
              <span className="text-gray-600 mr-1">Model:</span> 
              {formatLikelihood(nominee.likelihood)}
            </div>
          )}
          
          {nominee.bettingOdds && (
            <div className="text-sm">
              <span className="text-gray-600 mr-1">Betting:</span> 
              <span>{nominee.bettingOdds}</span>
            </div>
          )}
          
          {nominee.marketProbability !== undefined && (
            <div className="text-sm">
              <span className="text-gray-600 mr-1">Markets:</span> 
              <span>{nominee.marketProbability.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
      
      {nominee.awardSupport && (
        <div className="mt-2 text-xs text-gray-600">
          <span className="font-medium">Awards support:</span> {nominee.awardSupport}
        </div>
      )}
    </div>
  );
};

export default NomineeCard;