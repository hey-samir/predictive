import { NextRequest, NextResponse } from 'next/server';
import { 
  REAL_NOMINEES_2025, 
  REAL_AWARD_WINS_2025, 
  REAL_BETTING_ODDS_2025, 
  REAL_PREDICTIVE_MARKETS_2025,
  REAL_MODEL_WEIGHTS_2025
} from '../../../lib/real-data-2025';
import { prisma } from '../../../lib/db';

/**
 * Native Next.js API route handler for seeding the database
 * Using real 2025 Oscar data (movies from 2024)
 */
export async function POST(request: NextRequest) {
  try {
    console.log('Starting database seed via API...');
    
    // Clean existing data
    console.log('Cleaning existing data...');
    await prisma.reference.deleteMany();
    await prisma.awardWin.deleteMany();
    await prisma.nomination.deleteMany();
    await prisma.modelWeight.deleteMany();
    
    // Add nominations
    console.log('Adding nominations...');
    for (const nominee of REAL_NOMINEES_2025) {
      await prisma.nomination.create({
        data: {
          id: nominee.id,
          year: nominee.year,
          category: nominee.category,
          nominationType: nominee.nominationType,
          nomineeName: nominee.nomineeName,
          filmTitle: nominee.filmTitle,
          wonOscar: nominee.wonOscar,
          createdAt: new Date(nominee.createdAt),
        },
      });
    }
    
    // Add award wins
    console.log('Adding award wins...');
    for (const award of REAL_AWARD_WINS_2025) {
      await prisma.awardWin.create({
        data: {
          id: award.id,
          nominationId: award.nominationId,
          awardVenue: award.awardVenue,
          awardCategory: award.awardCategory,
          won: award.won,
        },
      });
    }
    
    // Add betting odds references
    console.log('Adding betting odds...');
    for (const bet of REAL_BETTING_ODDS_2025) {
      await prisma.reference.create({
        data: {
          id: bet.id,
          nominationId: bet.nominationId,
          referenceType: bet.referenceType,
          value: bet.value,
          source: bet.source,
        },
      });
    }
    
    // Add predictive markets references
    console.log('Adding predictive markets...');
    for (const market of REAL_PREDICTIVE_MARKETS_2025) {
      await prisma.reference.create({
        data: {
          id: market.id,
          nominationId: market.nominationId,
          referenceType: market.referenceType,
          value: market.value,
          source: market.source,
        },
      });
    }
    
    // Add model weights
    console.log('Adding model weights...');
    for (const weight of REAL_MODEL_WEIGHTS_2025) {
      await prisma.modelWeight.create({
        data: {
          id: weight.id,
          year: weight.year,
          category: weight.category,
          awardVenue: weight.awardVenue,
          weight: weight.weight,
          accuracy: weight.accuracy,
        },
      });
    }
    
    console.log('Database seed complete!');
    
    return NextResponse.json({ 
      success: true,
      message: 'Database seeded successfully',
      counts: {
        nominations: REAL_NOMINEES_2025.length,
        awardWins: REAL_AWARD_WINS_2025.length,
        bettingOdds: REAL_BETTING_ODDS_2025.length,
        predictiveMarkets: REAL_PREDICTIVE_MARKETS_2025.length,
        modelWeights: REAL_MODEL_WEIGHTS_2025.length
      }
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to seed database',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}