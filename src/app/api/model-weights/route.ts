import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR, OSCAR_CATEGORIES } from '../../../lib/constants';
import { REAL_MODEL_WEIGHTS_2025 } from '../../../lib/real-data-2025';

/**
 * Native Next.js API route handler for model weights data
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
    
    // Use real model weights
    const modelWeights = REAL_MODEL_WEIGHTS_2025.filter(w => w.year === year);
    
    // Transform the data to match the expected format in the frontend
    const transformedData: Record<string, any[]> = {};
    
    // Group by category
    for (const category of OSCAR_CATEGORIES) {
      const categoryWeights = modelWeights.filter(w => w.category === category);
      
      if (categoryWeights.length > 0) {
        transformedData[category] = categoryWeights.map(weight => ({
          venue: weight.awardVenue,
          weight: weight.weight,
          accuracy: weight.accuracy
        }));
      }
    }
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error generating model weights:', error);
    return NextResponse.json(
      { error: 'Failed to generate model weights data' },
      { status: 500 }
    );
  }
}