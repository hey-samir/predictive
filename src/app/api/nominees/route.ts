import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';
import { getFormattedNominees } from '../../../lib/real-data-2025';

/**
 * Native Next.js API route handler for nominees data
 * Using real 2025 Oscar data (movies from 2024)
 * 
 * Note: This directly uses the data from real-data-2025.ts instead of the database
 * due to compatibility issues with the Prisma client in this environment
 */
export async function GET(request: NextRequest) {
  try {
    // Get year from query params, default to current year
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || String(CURRENT_OSCAR_YEAR));
    
    // Get real nominees data from the static file
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