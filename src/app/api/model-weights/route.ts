import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR, OSCAR_CATEGORIES } from '../../../lib/constants';
import { generateMockModelWeights } from '../../../lib/mock-data';

/**
 * Native Next.js API route handler for model weights data
 * This replaces the Python backend with a TypeScript implementation
 */
export async function GET(request: NextRequest) {
  try {
    // Get year from query params, default to current year
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || String(CURRENT_OSCAR_YEAR));
    
    // Generate mock model weights
    const modelWeights = generateMockModelWeights(year);
    
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