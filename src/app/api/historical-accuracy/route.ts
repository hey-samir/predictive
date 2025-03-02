import { NextRequest, NextResponse } from 'next/server';
import { generateMockHistoricalData, generateMockAwardsData } from '../../../lib/mock-data';
import { AWARD_VENUES, OSCAR_CATEGORIES } from '../../../lib/constants';
import { HistoricalAccuracy } from '../../../lib/types';

/**
 * Native Next.js API route handler for historical accuracy data
 * This replaces the Python backend with a TypeScript implementation
 */
export async function GET(request: NextRequest) {
  try {
    // Get recent years from query params, default to 10
    const searchParams = request.nextUrl.searchParams;
    const recentYears = parseInt(searchParams.get('recentYears') || '10');
    
    // Generate mock historical data
    const historicalData = generateMockHistoricalData(recentYears);
    const historicalAwardWins = generateMockAwardsData(historicalData);
    
    // Calculate historical accuracy for each venue and category
    const accuracyData: HistoricalAccuracy[] = [];
    
    // Group nominations by year
    const nominationsByYear: Record<number, typeof historicalData> = {};
    for (const nomination of historicalData) {
      if (!nominationsByYear[nomination.year]) {
        nominationsByYear[nomination.year] = [];
      }
      nominationsByYear[nomination.year].push(nomination);
    }
    
    // Calculate accuracy for each venue and category
    for (const venue of AWARD_VENUES) {
      for (const category of OSCAR_CATEGORIES) {
        // Loop through each year and check accuracy
        let correctPredictions = 0;
        let totalYears = 0;
        
        for (const [year, yearNominations] of Object.entries(nominationsByYear)) {
          // Find the Oscar winner for this category and year
          const categoryNominations = yearNominations.filter(
            n => n.category === category
          );
          
          if (categoryNominations.length === 0) continue;
          
          const oscarWinner = categoryNominations.find(n => n.wonOscar);
          if (!oscarWinner) continue;
          
          // Check if this venue correctly predicted the winner
          const relevantAwardWins = historicalAwardWins.filter(
            win => win.nominationId === oscarWinner.id && 
                   win.awardVenue === venue
          );
          
          if (relevantAwardWins.some(win => win.won)) {
            correctPredictions++;
          }
          
          totalYears++;
        }
        
        // Calculate accuracy percentage
        const accuracyValue = totalYears > 0 
          ? (correctPredictions / totalYears) * 100 
          : 0;
        
        accuracyData.push({
          venue,
          category,
          accuracy: Math.round(accuracyValue * 10) / 10, // Round to 1 decimal place
          year: new Date().getFullYear() - 1 // Previous year
        });
      }
    }
    
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