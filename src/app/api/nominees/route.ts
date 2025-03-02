import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';
import { getFormattedNominees } from '../../../lib/real-data-2025';

/**
 * Native Next.js API route handler for nominees data
 * Using real 2025 Oscar data (movies from 2024)
 */
export async function GET(request: NextRequest) {
  try {
    // Get year from query params, default to current year
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || String(CURRENT_OSCAR_YEAR));
    
    // Get real nominees data
    const formattedData = getFormattedNominees(year);
    
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error generating nominees data:', error);
    return NextResponse.json(
      { error: 'Failed to generate nominees data' },
      { status: 500 }
    );
  }
}