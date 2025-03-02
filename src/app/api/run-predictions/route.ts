import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';
import { OscarPredictor } from '../../../lib/predictor';
import { PredictionResponse } from '../../../lib/types';
import { 
  REAL_NOMINEES_2025, 
  REAL_AWARD_WINS_2025, 
  REAL_BETTING_ODDS_2025, 
  REAL_PREDICTIVE_MARKETS_2025,
  getFormattedNominees
} from '../../../lib/real-data-2025';

/**
 * Native Next.js API route handler for running predictions
 * Using real 2025 Oscar data (movies from 2024)
 */
export async function POST(request: NextRequest) {
  try {
    // Get year from request body
    const body = await request.json();
    const year = body.year || CURRENT_OSCAR_YEAR;
    
    // For the real 2025 data, we'll use the actual nominees
    const formattedNominees = getFormattedNominees(year);
    
    // For 2025, we'll return the pre-computed results directly since we already 
    // know the winners (the Oscars already happened)
    const response: PredictionResponse = {
      nominees: formattedNominees,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      message: 'Predictions retrieved successfully',
      data: response
    });
  } catch (error) {
    console.error('Error running predictions:', error);
    return NextResponse.json(
      { 
        error: 'Failed to run predictions',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}