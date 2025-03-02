import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';

// API Server URL
const API_URL = process.env.API_URL || 'http://localhost:5001';

/**
 * Proxy route handler for model weights data
 * This forwards requests to the FastAPI backend
 */
export async function GET(request: NextRequest) {
  try {
    // Get year from query params, default to current year
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || String(CURRENT_OSCAR_YEAR));
    
    // Forward request to the FastAPI server
    const apiUrl = `${API_URL}/api/model-weights?year=${year}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch model weights data');
    }

    // Return the data
    const data = await response.json();
    
    // Transform the data to match the expected format in the frontend
    const transformedData: Record<string, any[]> = {};
    
    for (const [category, weights] of Object.entries(data)) {
      transformedData[category] = (weights as any[]).map(weight => ({
        venue: weight.venue,
        weight: weight.weight,
        accuracy: weight.accuracy
      }));
    }
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching model weights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model weights data' },
      { status: 500 }
    );
  }
}