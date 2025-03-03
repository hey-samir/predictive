import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';
import { getNomineesWithPredictions, resetAndSeedDatabase } from '../../../lib/db-service';
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
    
    try {
      // Try to get data from the database with predictions
      const nomineeData = await getNomineesWithPredictions(year);
      return NextResponse.json(nomineeData);
    } catch (dbError) {
      console.error('Database error, falling back to static data:', dbError);
      
      // Fall back to static data if database is unavailable
      const formattedData = getFormattedNominees(year);
      return NextResponse.json(formattedData);
    }
  } catch (error) {
    console.error('Error generating nominees data:', error);
    return NextResponse.json(
      { error: 'Failed to generate nominees data' },
      { status: 500 }
    );
  }
}

/**
 * Seed database with initial data
 */
export async function POST(request: NextRequest) {
  try {
    const result = await resetAndSeedDatabase();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}