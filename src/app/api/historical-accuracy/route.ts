import { NextRequest, NextResponse } from 'next/server';
import { AWARD_VENUES, OSCAR_CATEGORIES } from '../../../lib/constants';
import { getHistoricalAccuracyData } from '../../../lib/real-data-2025';
import { HistoricalAccuracy } from '../../../lib/types';

/**
 * Native Next.js API route handler for historical accuracy data
 * Using real 2025 Oscar data (movies from 2024)
 */
export async function GET(request: NextRequest) {
  try {
    // Get recent years from query params, default to 10
    const searchParams = request.nextUrl.searchParams;
    const recentYears = parseInt(searchParams.get('recentYears') || '10');
    
    // Get real historical accuracy data
    const accuracyData = getHistoricalAccuracyData();
    
    // Group by venue for the frontend format
    const result = AWARD_VENUES.map(venue => {
      // Get data for this venue
      const venueData = accuracyData.filter(item => item.venue === venue);
      
      // Calculate average accuracy across categories
      const accuracies = venueData.map(item => item.accuracy).filter(Boolean);
      const venueTotalAccuracy = accuracies.length > 0
        ? accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length
        : 0;
        
      return {
        venue,
        accuracy: Math.round(venueTotalAccuracy),
        categories: venueData.map(item => ({
          category: item.category,
          accuracy: Math.round(item.accuracy)
        }))
        .filter(cat => cat.accuracy > 0) // Remove categories with no data
        .sort((a, b) => b.accuracy - a.accuracy) // Sort by descending accuracy
      };
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating historical accuracy data:', error);
    return NextResponse.json(
      { error: 'Failed to generate historical accuracy data' },
      { status: 500 }
    );
  }
}