import { NextRequest, NextResponse } from 'next/server';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';

// API Server URL
const API_URL = process.env.API_URL || 'http://localhost:5001';

/**
 * Proxy route handler for running predictions
 * This forwards requests to the FastAPI backend
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const year = body.year || CURRENT_OSCAR_YEAR;
    
    // Forward request to the FastAPI server
    const apiUrl = `${API_URL}/api/run-predictions?year=${year}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ year }),
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to run predictions');
    }

    // Return the data
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Predictions calculated successfully',
      data: data
    });
  } catch (error) {
    console.error('Error running predictions:', error);
    return NextResponse.json(
      { 
        error: 'Failed to run predictions',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}