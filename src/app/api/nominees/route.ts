import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';

// API Server URL
const API_URL = process.env.API_URL || 'http://localhost:5001';

/**
 * Proxy route handler for nominees data
 * This forwards requests to the FastAPI backend
 */
export async function GET(request: NextRequest) {
  try {
    // Get year from query params, default to current year
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || String(CURRENT_OSCAR_YEAR));
    
    // Forward request to the FastAPI server
    const apiUrl = `${API_URL}/api/nominees?year=${year}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch nominees data');
    }

    // Return the data
    const data = await response.json();
    
    // Transform the data to match the expected format in the frontend
    const transformedData: Record<string, any[]> = {};
    
    for (const [category, nominees] of Object.entries(data)) {
      transformedData[category] = (nominees as any[]).map(nominee => ({
        id: nominee.id,
        nomineeName: nominee.nominee_name,
        filmTitle: nominee.film_title,
        wonOscar: nominee.won_oscar,
        likelihood: nominee.likelihood,
        bettingOdds: nominee.betting_odds,
        marketProbability: nominee.market_probability,
        awardSupport: nominee.award_support
      }));
    }
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching nominees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nominees data' },
      { status: 500 }
    );
  }
}