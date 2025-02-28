import { NomineeData } from '../components/NomineeCard';
import { CURRENT_OSCAR_YEAR } from './constants';

/**
 * Fetches nominees data for the given year
 */
export async function getNominees(year: number = CURRENT_OSCAR_YEAR): Promise<Record<string, NomineeData[]>> {
  try {
    const response = await fetch(`/api/nominees?year=${year}`);
    if (!response.ok) {
      throw new Error('Failed to fetch nominees');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching nominees:', error);
    return {};
  }
}

/**
 * Fetches model weights data for prediction strength visualization
 */
export async function getModelWeights(year: number = CURRENT_OSCAR_YEAR): Promise<any> {
  try {
    const response = await fetch(`/api/model-weights?year=${year}`);
    if (!response.ok) {
      throw new Error('Failed to fetch model weights');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching model weights:', error);
    return [];
  }
}

/**
 * Fetches historical predictions accuracy data
 */
export async function getHistoricalAccuracy(): Promise<any> {
  try {
    const response = await fetch('/api/historical-accuracy');
    if (!response.ok) {
      throw new Error('Failed to fetch historical accuracy');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching historical accuracy:', error);
    return [];
  }
}

/**
 * Triggers a predictions calculation for the current year
 */
export async function runPredictions(): Promise<any> {
  try {
    const response = await fetch('/api/run-predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ year: CURRENT_OSCAR_YEAR })
    });
    
    if (!response.ok) {
      throw new Error('Failed to run predictions');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error running predictions:', error);
    throw error;
  }
}