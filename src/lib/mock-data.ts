/**
 * Mock data generation for the Oscar Predictor app
 * This replaces the Python scrapers with TypeScript implementations
 */

import { 
  Nomination, 
  AwardWin, 
  Reference, 
  ModelWeight,
  NomineeData
} from './types';
import { 
  OSCAR_CATEGORIES, 
  AWARD_VENUES, 
  NOMINATION_TYPES,
  CURRENT_OSCAR_YEAR
} from './constants';

/**
 * Generate mock historical Oscar data
 * @param recentYears If provided, only generate data for the last N years
 */
export function generateMockHistoricalData(recentYears?: number): Nomination[] {
  const nominations: Nomination[] = [];
  const currentYear = CURRENT_OSCAR_YEAR;
  const startYear = recentYears ? currentYear - recentYears : currentYear - 10;
  
  let id = 1;
  
  for (let year = startYear; year < currentYear; year++) {
    for (const [nominationType, categories] of Object.entries(NOMINATION_TYPES)) {
      for (const category of categories) {
        // Generate 3-5 nominees per category
        const numNominees = Math.floor(Math.random() * 3) + 3;
        
        for (let i = 0; i < numNominees; i++) {
          const wonOscar = i === 0; // First nominee is the winner
          
          nominations.push({
            id: id++,
            year,
            category,
            nominationType,
            nomineeName: `Nominee ${i+1} for ${category} (${year})`,
            filmTitle: `Film Title ${i+1} (${year})`,
            wonOscar,
            createdAt: new Date().toISOString()
          });
        }
      }
    }
  }
  
  return nominations;
}

/**
 * Generate mock current year's Oscar nominees
 * @param year The Oscar year to generate nominees for
 */
export function generateMockNomineesData(year: number): Nomination[] {
  const nominations: Nomination[] = [];
  let id = 1000; // Start with higher ID to avoid conflicts
  
  for (const [nominationType, categories] of Object.entries(NOMINATION_TYPES)) {
    for (const category of categories) {
      // Generate 3-5 nominees per category
      const numNominees = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < numNominees; i++) {
        nominations.push({
          id: id++,
          year,
          category,
          nominationType,
          nomineeName: `Nominee ${i+1} for ${category}`,
          filmTitle: `Film Title ${i+1} (${year})`,
          wonOscar: false, // Not determined yet
          createdAt: new Date().toISOString()
        });
      }
    }
  }
  
  return nominations;
}

/**
 * Generate mock awards data from other venues
 * @param nominations The Oscar nominations to generate award wins for
 */
export function generateMockAwardsData(nominations: Nomination[]): AwardWin[] {
  const awardWins: AwardWin[] = [];
  let id = 1;
  
  // Map categories to their best matching award venue categories
  const categoryVenueMap: Record<string, Record<string, string>> = {
    "Best Picture": {
      "BAFTA": "Best Film",
      "Golden Globes": "Best Motion Picture - Drama",
      "Critics Choice": "Best Picture",
      "PGA": "Outstanding Producer of Theatrical Motion Pictures"
    },
    "Best Director": {
      "BAFTA": "Best Director",
      "Golden Globes": "Best Director",
      "Critics Choice": "Best Director",
      "DGA": "Outstanding Directorial Achievement in Feature Film"
    },
    // Add more mappings as needed
  };
  
  for (const nomination of nominations) {
    for (const venue of AWARD_VENUES) {
      // Determine if this nomination won at this venue
      // Make it somewhat correlated with Oscar winning
      const randomFactor = Math.random();
      const won = nomination.wonOscar 
        ? randomFactor < 0.7 // 70% chance if Oscar winner
        : randomFactor < 0.2; // 20% chance otherwise
      
      // Find the matching category for this venue
      let awardCategory = categoryVenueMap[nomination.category]?.[venue] || nomination.category;
      
      awardWins.push({
        id: id++,
        nominationId: nomination.id,
        awardVenue: venue,
        awardCategory,
        won
      });
    }
  }
  
  return awardWins;
}

/**
 * Generate mock betting odds data
 * @param nominations The Oscar nominations to generate betting odds for
 */
export function generateMockBettingData(nominations: Nomination[]): Reference[] {
  const references: Reference[] = [];
  let id = 1;
  
  for (const nomination of nominations) {
    // Generate a random betting odds value between 1 and 100
    // Make it somewhat correlated with Oscar winning
    let value = nomination.wonOscar
      ? Math.random() * 30 + 60 // 60-90% if Oscar winner
      : Math.random() * 60; // 0-60% otherwise
      
    // Add some randomness based on ID to vary the values
    value = Math.min(100, Math.max(1, value + (nomination.id % 10) - 5));
    
    references.push({
      id: id++,
      nominationId: nomination.id,
      referenceType: 'betting_odds',
      value,
      source: 'Mock Betting Service'
    });
  }
  
  return references;
}

/**
 * Generate mock predictive markets data
 * @param nominations The Oscar nominations to generate predictive markets data for
 */
export function generateMockPredictiveMarketsData(nominations: Nomination[]): Reference[] {
  const references: Reference[] = [];
  let id = 1000; // Start with higher ID to avoid conflicts with betting data
  
  for (const nomination of nominations) {
    // Generate a random predictive market value between 1 and 100
    // Make it somewhat correlated with Oscar winning but different from betting odds
    let value = nomination.wonOscar
      ? Math.random() * 25 + 65 // 65-90% if Oscar winner
      : Math.random() * 65; // 0-65% otherwise
      
    // Add some randomness based on ID to vary the values
    value = Math.min(100, Math.max(1, value + (nomination.id % 8) - 4));
    
    references.push({
      id: id++,
      nominationId: nomination.id,
      referenceType: 'predictive_market',
      value,
      source: 'Mock Predictive Market'
    });
  }
  
  return references;
}

/**
 * Generate mock model weights
 * @param year The year to generate model weights for
 */
export function generateMockModelWeights(year: number): ModelWeight[] {
  const modelWeights: ModelWeight[] = [];
  let id = 1;
  
  for (const category of Object.values(NOMINATION_TYPES).flat()) {
    for (const venue of AWARD_VENUES) {
      // Generate a random weight between 0.1 and 1.0
      const weight = Math.random() * 0.9 + 0.1;
      
      // Generate a random accuracy between 50% and 90%
      const accuracy = Math.random() * 40 + 50;
      
      modelWeights.push({
        id: id++,
        year,
        category,
        awardVenue: venue,
        weight,
        accuracy
      });
    }
  }
  
  return modelWeights;
}

/**
 * Convert probability percentage to fractional betting odds
 * @param probability Probability as percentage (0-100)
 */
export function convertProbabilityToOdds(probability: number): string {
  if (probability <= 0 || probability >= 100) {
    return "N/A";
  }
  
  // Convert percentage to decimal odds
  const decimal = 100 / probability;
  
  // Convert decimal to fractional
  if (decimal < 2) {
    // For high probabilities, show "odds on" fractions (e.g., 1/2, 1/3)
    const denominator = Math.round(1 / (decimal - 1));
    return `1/${denominator}`;
  } else {
    // For low probabilities, show "odds against" fractions (e.g., 2/1, 3/1)
    const numerator = Math.round(decimal - 1);
    return `${numerator}/1`;
  }
}

/**
 * Convert fractional betting odds to probability percentage
 * @param fractionalOdds String in format like "5/2" or "1/3"
 */
export function convertBettingOddsToProbability(fractionalOdds: string): number {
  if (fractionalOdds === "N/A") {
    return 0;
  }
  
  const [numerator, denominator] = fractionalOdds.split('/').map(Number);
  
  if (!numerator || !denominator) {
    return 0;
  }
  
  // Convert fractional to decimal
  const decimal = (numerator / denominator) + 1;
  
  // Convert decimal to probability
  return 100 / decimal;
}

/**
 * Format all data into the format expected by the frontend
 */
export function formatNomineesForDisplay(
  nominations: Nomination[],
  awardWins: AwardWin[],
  bettingOdds: Reference[],
  predictiveMarkets: Reference[]
): Record<string, NomineeData[]> {
  const result: Record<string, NomineeData[]> = {};
  
  // Create a map of nomination IDs to award wins
  const awardWinMap: Record<number, AwardWin[]> = {};
  for (const win of awardWins) {
    if (!awardWinMap[win.nominationId]) {
      awardWinMap[win.nominationId] = [];
    }
    awardWinMap[win.nominationId].push(win);
  }
  
  // Create maps for reference data
  const bettingMap: Record<number, number> = {};
  for (const odds of bettingOdds) {
    bettingMap[odds.nominationId] = odds.value;
  }
  
  const marketMap: Record<number, number> = {};
  for (const market of predictiveMarkets) {
    marketMap[market.nominationId] = market.value;
  }
  
  // Group nominations by category
  for (const nomination of nominations) {
    if (!result[nomination.category]) {
      result[nomination.category] = [];
    }
    
    // Get awards that this nominee won
    const wonAwards = awardWinMap[nomination.id]?.filter(win => win.won) || [];
    const awardSupport = wonAwards.length > 0
      ? wonAwards.map(win => win.awardVenue).join(', ')
      : undefined;
    
    // Get betting odds and format as fractional
    const bettingValue = bettingMap[nomination.id];
    const bettingOdds = bettingValue 
      ? convertProbabilityToOdds(bettingValue)
      : undefined;
    
    // Get predictive market value
    const marketProbability = marketMap[nomination.id];
    
    result[nomination.category].push({
      id: nomination.id,
      nomineeName: nomination.nomineeName,
      filmTitle: nomination.filmTitle,
      category: nomination.category,
      nominationType: nomination.nominationType,
      bettingOdds,
      marketProbability,
      wonOscar: nomination.wonOscar,
      awardSupport,
      year: nomination.year,
      // We'll calculate likelihood later in the prediction model
    });
  }
  
  return result;
}