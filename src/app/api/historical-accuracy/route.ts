import { NextResponse } from 'next/server';
import { AWARD_VENUES } from '../../../lib/constants';

// API Server URL
const API_URL = process.env.API_URL || 'http://localhost:5001';

/**
 * Proxy route handler for historical accuracy data
 * This forwards requests to the FastAPI backend
 */
export async function GET() {
  try {
    // Forward request to the FastAPI server
    const apiUrl = `${API_URL}/api/historical-accuracy`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch historical accuracy data');
    }

    // Get the data from the API
    const data = await response.json();
    
    // Transform the data to match the expected format in the frontend
    const result = AWARD_VENUES.map(venue => {
      // Get data for this venue
      const venueData = data[venue] || [];
      
      // Calculate average accuracy across categories
      const accuracies = venueData.map((item: any) => item.accuracy).filter(Boolean);
      const venueTotalAccuracy = accuracies.length > 0
        ? accuracies.reduce((sum: number, acc: number) => sum + acc, 0) / accuracies.length
        : 0;
        
      return {
        venue,
        accuracy: Math.round(venueTotalAccuracy),
        categories: venueData.map((item: any) => ({
          category: item.category,
          accuracy: Math.round(item.accuracy)
        }))
        .filter((cat: any) => cat.accuracy > 0) // Remove categories with no data
        .sort((a: any, b: any) => b.accuracy - a.accuracy) // Sort by descending accuracy
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