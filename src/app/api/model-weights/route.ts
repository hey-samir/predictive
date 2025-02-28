import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';

export async function GET(request: NextRequest) {
  try {
    // Get year from query params, default to current year
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || String(CURRENT_OSCAR_YEAR));
    
    // Fetch model weights from the database
    const modelWeights = await prisma.modelWeight.findMany({
      where: {
        year
      },
      orderBy: [
        { category: 'asc' },
        { weight: 'desc' }
      ]
    });
    
    // Format model weights by category and venue
    const weightsByCategory: Record<string, any[]> = {};
    
    modelWeights.forEach(weight => {
      if (!weightsByCategory[weight.category]) {
        weightsByCategory[weight.category] = [];
      }
      
      weightsByCategory[weight.category].push({
        venue: weight.awardVenue,
        weight: weight.weight,
        accuracy: weight.accuracy
      });
    });
    
    return NextResponse.json(weightsByCategory);
  } catch (error) {
    console.error('Error fetching model weights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model weights data' },
      { status: 500 }
    );
  }
}