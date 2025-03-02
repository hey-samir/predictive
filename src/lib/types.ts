/**
 * Types and interfaces for the Oscar prediction application
 */

/**
 * Nomination data structure
 */
export interface Nomination {
  id: number;
  year: number;
  category: string;
  nominationType: string; // Maker, Performer, Creator, Crafter
  nomineeName: string;
  filmTitle?: string;
  wonOscar: boolean;
  createdAt: string;
}

/**
 * Award win from other venues
 */
export interface AwardWin {
  id: number;
  nominationId: number;
  awardVenue: string; // BAFTA, Golden Globe, etc.
  awardCategory: string;
  won: boolean;
}

/**
 * External reference (betting odds, scores, etc)
 */
export interface Reference {
  id: number;
  nominationId: number;
  referenceType: string; // betting_odds, predictive_market, critics_score, audience_score
  value: number;
  source?: string; // Source of the data (e.g., Rotten Tomatoes, IMDB, specific betting site)
}

/**
 * Model weight for predictive strength of each award venue
 */
export interface ModelWeight {
  id: number;
  year: number;
  category: string;
  awardVenue: string; // BAFTA, Golden Globe, etc.
  weight: number; // The predictive weight/strength
  accuracy?: number; // Historical accuracy percentage
}

/**
 * Processed nominee data for frontend display
 */
export interface NomineeData {
  id: number;
  nomineeName: string;
  filmTitle?: string;
  category: string;
  nominationType: string;
  likelihood?: number;
  bettingOdds?: string;
  marketProbability?: number;
  wonOscar?: boolean;
  awardSupport?: string;
  year: number;
}

/**
 * Historical accuracy data
 */
export interface HistoricalAccuracy {
  venue: string;
  category: string;
  accuracy: number;
  year: number;
}

/**
 * Venue strength data for visualization
 */
export interface VenueStrength {
  venue: string;
  category: string;
  strength: number;
  accuracy: number;
}

/**
 * Prediction response structure
 */
export interface PredictionResponse {
  nominees: Record<string, NomineeData[]>;
  venueStrength?: VenueStrength[];
  updatedAt: string;
}

/**
 * Feature data for prediction algorithm
 */
export interface PredictionFeatures {
  [key: string]: any;
}