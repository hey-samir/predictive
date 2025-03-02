import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';
import {
  generateMockNomineesData,
  generateMockAwardsData,
  generateMockBettingData,
  generateMockPredictiveMarketsData,
  formatNomineesForDisplay
} from '../../../lib/mock-data';

/**
 * Native Next.js API route handler for nominees data
 * This replaces the Python backend with a TypeScript implementation
 */
export async function GET(request: NextRequest) {
  try {
    // Get year from query params, default to current year
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || String(CURRENT_OSCAR_YEAR));
    
    // Generate mock data
    const nominations = generateMockNomineesData(year);
    const awardWins = generateMockAwardsData(nominations);
    const bettingOdds = generateMockBettingData(nominations);
    const predictiveMarkets = generateMockPredictiveMarketsData(nominations);
    
    // Format data for display
    const formattedData = formatNomineesForDisplay(
      nominations,
      awardWins,
      bettingOdds,
      predictiveMarkets
    );
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error generating nominees data:', error);
    return NextResponse.json(
      { error: 'Failed to generate nominees data' },
      { status: 500 }
    );
  }
}