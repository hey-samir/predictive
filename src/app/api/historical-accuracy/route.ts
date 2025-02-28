import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { AWARD_VENUES, OSCAR_CATEGORIES } from '../../../lib/constants';

export async function GET() {
  try {
    // Fetch all model weights from the database
    const modelWeights = await prisma.modelWeight.findMany({
      orderBy: [
        { awardVenue: 'asc' },
        { category: 'asc' },
        { year: 'desc' }
      ]
    });
    
    // Calculate average accuracy by venue
    const venueAccuracy: Record<string, {
      totalAccuracy: number,
      count: number,
      categoryAccuracy: Record<string, { totalAccuracy: number, count: number }>
    }> = {};
    
    // Initialize venue data structure with all venues and categories
    AWARD_VENUES.forEach(venue => {
      venueAccuracy[venue] = {
        totalAccuracy: 0,
        count: 0,
        categoryAccuracy: {}
      };
      
      OSCAR_CATEGORIES.forEach(category => {
        venueAccuracy[venue].categoryAccuracy[category] = {
          totalAccuracy: 0,
          count: 0
        };
      });
    });
    
    // Sum up weights and counts for averaging
    modelWeights.forEach(weight => {
      if (weight.accuracy && venueAccuracy[weight.awardVenue]) {
        venueAccuracy[weight.awardVenue].totalAccuracy += weight.accuracy;
        venueAccuracy[weight.awardVenue].count += 1;
        
        if (venueAccuracy[weight.awardVenue].categoryAccuracy[weight.category]) {
          venueAccuracy[weight.awardVenue].categoryAccuracy[weight.category].totalAccuracy += weight.accuracy;
          venueAccuracy[weight.awardVenue].categoryAccuracy[weight.category].count += 1;
        }
      }
    });
    
    // Format result for easy consumption by frontend
    const result = AWARD_VENUES.map(venue => {
      const venueTotalAccuracy = venueAccuracy[venue].count > 0 
        ? venueAccuracy[venue].totalAccuracy / venueAccuracy[venue].count 
        : 0;
        
      return {
        venue,
        accuracy: Math.round(venueTotalAccuracy), // Round to whole number
        categories: Object.entries(venueAccuracy[venue].categoryAccuracy)
          .map(([category, data]) => ({
            category,
            accuracy: data.count > 0 
              ? Math.round(data.totalAccuracy / data.count) 
              : 0 // Round to whole number
          }))
          .filter(cat => cat.accuracy > 0) // Remove categories with no data
          .sort((a, b) => b.accuracy - a.accuracy) // Sort by descending accuracy
      };
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching historical accuracy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical accuracy data' },
      { status: 500 }
    );
  }
}