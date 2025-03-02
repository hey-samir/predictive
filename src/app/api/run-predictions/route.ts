import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';
import {
  generateMockHistoricalData,
  generateMockNomineesData,
  generateMockAwardsData,
  generateMockBettingData,
  generateMockPredictiveMarketsData
} from '../../../lib/mock-data';
import { OscarPredictor } from '../../../lib/predictor';
import { PredictionResponse } from '../../../lib/types';

/**
 * Native Next.js API route handler for running predictions
 * This replaces the Python backend with a TypeScript implementation
 */
export async function POST(request: NextRequest) {
  try {
    // Get year from request body
    const body = await request.json();
    const year = body.year || CURRENT_OSCAR_YEAR;
    
    // Generate mock historical data for training
    const historicalData = generateMockHistoricalData(10); // Last 10 years
    
    // Generate current year data
    const nominations = generateMockNomineesData(year);
    const awardWins = generateMockAwardsData(nominations);
    const bettingOdds = generateMockBettingData(nominations);
    const predictiveMarkets = generateMockPredictiveMarketsData(nominations);
    
    // Generate historical award wins for training
    const historicalAwardWins = generateMockAwardsData(historicalData);
    
    // Train and run prediction model
    const predictor = new OscarPredictor();
    predictor.train(historicalData, historicalAwardWins);
    
    const predictions = predictor.predict(
      nominations,
      awardWins,
      bettingOdds,
      predictiveMarkets
    );
    
    const venueStrength = predictor.analyzeVenueStrength();
    
    // Format response
    const response: PredictionResponse = {
      nominees: predictions,
      venueStrength,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      message: 'Predictions calculated successfully',
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