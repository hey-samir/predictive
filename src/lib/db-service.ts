/**
 * Database service for Oscar Predictor
 * Provides functions to interact with the database
 * 
 * NOTE: We're using static data instead of database access due to environment issues
 * This is a temporary solution until the environment is properly configured
 */

// Import static data instead of using database
import { 
  REAL_NOMINEES_2025, 
  REAL_AWARD_WINS_2025, 
  REAL_BETTING_ODDS_2025, 
  REAL_PREDICTIVE_MARKETS_2025,
  REAL_MODEL_WEIGHTS_2025,
  getFormattedNominees 
} from './real-data-2025';
import { OscarPredictor } from './predictor';
import { Nomination, AwardWin, Reference, NomineeData } from './types';

// Comment out prisma import to avoid errors
// import { prisma } from './db';

/**
 * Reset and seed the database with the initial data
 * NOTE: Currently only returning static data due to environment configuration issues
 */
export async function resetAndSeedDatabase() {
  try {
    console.log('Starting database seed...');
    console.log('Using static data instead of database due to environment configuration issues');
    
    // Return the success message with static data
    return {
      success: true,
      counts: {
        nominations: REAL_NOMINEES_2025.length,
        awardWins: REAL_AWARD_WINS_2025.length,
        bettingOdds: REAL_BETTING_ODDS_2025.length,
        predictiveMarkets: REAL_PREDICTIVE_MARKETS_2025.length,
        modelWeights: REAL_MODEL_WEIGHTS_2025.length
      },
      note: "Using static data due to environment configuration issues"
    };
  } catch (error) {
    console.error('Error in data processing:', error);
    return {
      success: false,
      error: String(error)
    };
  }
}

/**
 * Calculate predictions for all nominees
 * NOTE: Currently using pre-calculated static data
 */
export async function calculatePredictions() {
  try {
    console.log('Starting prediction calculations...');
    console.log('Using static prediction data due to environment configuration issues');
    
    // Create predictor instance
    const predictor = new OscarPredictor();
    
    // Train on historical data (using static data)
    predictor.train(REAL_NOMINEES_2025, REAL_AWARD_WINS_2025);
    
    // Make predictions (using static data)
    const predictions = predictor.predict(
      REAL_NOMINEES_2025,
      REAL_AWARD_WINS_2025,
      REAL_BETTING_ODDS_2025,
      REAL_PREDICTIVE_MARKETS_2025
    );
    
    return { 
      success: true,
      predictions: predictions,
      note: "Using static prediction data due to environment configuration issues"
    };
  } catch (error) {
    console.error('Error calculating predictions:', error);
    return {
      success: false,
      error: String(error)
    };
  }
}

/**
 * Get nominees with predictions for a specific year
 */
export async function getNomineesWithPredictions(year: number) {
  try {
    // For now, given the issues with Prisma, let's return the static data
    // We'll come back and properly implement this with direct database access
    return getFormattedNominees(year);
  } catch (error) {
    console.error('Error fetching nominees with predictions:', error);
    throw error;
  }
}

/**
 * Convert probability to betting odds format
 */
function convertToBettingOdds(probability: number): string {
  if (probability <= 0 || probability >= 1) {
    return probability < 0.5 ? '100/1' : '1/100';
  }
  
  // Calculate fractional odds
  if (probability < 0.5) {
    // Underdog: higher first number
    const decimal = (1 / probability) - 1;
    const numerator = Math.round(decimal);
    return `${numerator}/1`;
  } else {
    // Favorite: higher second number
    const decimal = probability / (1 - probability);
    const denominator = Math.round(decimal);
    return `1/${denominator}`;
  }
}