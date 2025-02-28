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
  
  let colorClass = 'text-[#555555]';
  if (value > 80) colorClass = 'text-[#2E7D32] font-bold';
  else if (value > 60) colorClass = 'text-[#388E3C]';
  else if (value > 40) colorClass = 'text-[#FFA000]';
  else if (value > 20) colorClass = 'text-[#F57C00]';
  else colorClass = 'text-[#D32F2F]';
  
  return <span className={colorClass}>{value.toFixed(1)}%</span>;
};

const NomineeCard: React.FC<NomineeCardProps> = ({ nominee, isWinner = false }) => {
  const cardClass = isWinner 
    ? "border-l-4 border-[#2E7D32] bg-[#E8F5E9] p-3 mt-2 rounded"
    : "border-l-4 border-[#9C27B0] bg-[#F3E5F5] p-3 mt-2 rounded";

  return (
    <div className={cardClass}>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div>
          <div className="font-semibold">{nominee.nomineeName}</div>
          {nominee.filmTitle && (
            <div className="text-sm text-[#616161] italic">{nominee.filmTitle}</div>
          )}
        </div>
        
        <div className="mt-2 md:mt-0 flex flex-col md:items-end">
          {nominee.likelihood !== undefined && (
            <div className="text-sm">
              <span className="text-[#616161] mr-1">Model:</span> 
              {formatLikelihood(nominee.likelihood)}
            </div>
          )}
          
          {nominee.bettingOdds && (
            <div className="text-sm">
              <span className="text-[#616161] mr-1">Betting:</span> 
              <span>{nominee.bettingOdds}</span>
            </div>
          )}
          
          {nominee.marketProbability !== undefined && (
            <div className="text-sm">
              <span className="text-[#616161] mr-1">Markets:</span> 
              <span>{nominee.marketProbability.toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
      
      {nominee.awardSupport && (
        <div className="mt-2 text-xs text-[#616161]">
          <span className="font-medium">Awards support:</span> {nominee.awardSupport}
        </div>
      )}
    </div>
  );
};

export default NomineeCard;