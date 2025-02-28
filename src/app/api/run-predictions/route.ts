import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';

// This is a placeholder for the actual predictions logic
// In reality, this would call the Python prediction model or implement similar logic in TypeScript
async function calculatePredictions(year: number) {
  try {
    // 1. Get all nominations for the specified year
    const nominations = await prisma.nomination.findMany({
      where: { year },
      include: {
        awards: true,
      },
      orderBy: { category: 'asc' }
    });

    // 2. Get model weights for prediction calculations
    const modelWeights = await prisma.modelWeight.findMany({
      where: { year },
      orderBy: [
        { category: 'asc' },
        { weight: 'desc' }
      ]
    });

    // Group nominations by category
    const nominationsByCategory: Record<string, any[]> = {};
    nominations.forEach(nom => {
      if (!nominationsByCategory[nom.category]) {
        nominationsByCategory[nom.category] = [];
      }
      nominationsByCategory[nom.category].push(nom);
    });

    // Group weights by category
    const weightsByCategory: Record<string, Record<string, number>> = {};
    modelWeights.forEach(weight => {
      if (!weightsByCategory[weight.category]) {
        weightsByCategory[weight.category] = {};
      }
      weightsByCategory[weight.category][weight.awardVenue] = weight.weight;
    });

    // 3. Calculate prediction for each nomination
    const predictions: Array<{
      nominationId: number;
      likelihood: number;
      awardSupport: string;
    }> = [];

    for (const category in nominationsByCategory) {
      const categoryNominations = nominationsByCategory[category];
      const categoryWeights = weightsByCategory[category] || {};

      for (const nomination of categoryNominations) {
        // Calculate which awards this nominee won
        const wonAwards = nomination.awards
          .filter(award => award.won)
          .map(award => award.awardVenue);

        // Calculate likelihood based on award wins and weights
        let likelihood = 0;
        let totalWeight = 0;

        // Sum up the weights for each award venue where this nominee won
        for (const venue in categoryWeights) {
          const weight = categoryWeights[venue];
          totalWeight += weight;
          
          if (wonAwards.includes(venue)) {
            likelihood += weight;
          }
        }

        // Calculate final likelihood as a percentage
        const finalLikelihood = totalWeight > 0 
          ? (likelihood / totalWeight) * 100
          : 0;

        predictions.push({
          nominationId: nomination.id,
          likelihood: Math.round(finalLikelihood * 10) / 10, // Round to 1 decimal place
          awardSupport: wonAwards.join(', ')
        });
      }
    }

    // 4. Store predictions in the database as references
    for (const prediction of predictions) {
      // First, check if a model_likelihood reference already exists
      const existingReference = await prisma.reference.findFirst({
        where: {
          nominationId: prediction.nominationId,
          referenceType: 'model_likelihood'
        }
      });

      if (existingReference) {
        // Update existing reference
        await prisma.reference.update({
          where: { id: existingReference.id },
          data: { value: prediction.likelihood }
        });
      } else {
        // Create new reference
        await prisma.reference.create({
          data: {
            nominationId: prediction.nominationId,
            referenceType: 'model_likelihood',
            value: prediction.likelihood,
            source: 'internal-model'
          }
        });
      }
    }

    return predictions;
  } catch (error) {
    console.error('Error calculating predictions:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const year = body.year || CURRENT_OSCAR_YEAR;
    
    // Run predictions calculation
    await calculatePredictions(year);
    
    return NextResponse.json({ 
      success: true,
      message: 'Predictions calculated successfully'
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