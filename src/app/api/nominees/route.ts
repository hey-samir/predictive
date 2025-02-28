import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { CURRENT_OSCAR_YEAR } from '../../../lib/constants';

export async function GET(request: NextRequest) {
  try {
    // Get year from query params, default to current year
    const searchParams = request.nextUrl.searchParams;
    const year = parseInt(searchParams.get('year') || String(CURRENT_OSCAR_YEAR));
    
    // Get category from query params (optional)
    const category = searchParams.get('category') || undefined;
    
    // Fetch nominations from the database
    const nominations = await prisma.nomination.findMany({
      where: {
        year,
        ...(category ? { category } : {})
      },
      include: {
        awards: true,
        references: true
      },
      orderBy: {
        category: 'asc'
      }
    });
    
    // Format nominations by category
    const nominationsByCategory: Record<string, any[]> = {};
    
    nominations.forEach(nomination => {
      if (!nominationsByCategory[nomination.category]) {
        nominationsByCategory[nomination.category] = [];
      }
      
      // Get betting odds and predictive market values from references
      const bettingOdds = nomination.references.find(
        ref => ref.referenceType === 'betting_odds'
      );
      
      const marketProbability = nomination.references.find(
        ref => ref.referenceType === 'predictive_market'
      );
      
      // Get model likelihood (if available)
      const likelihood = nomination.references.find(
        ref => ref.referenceType === 'model_likelihood'
      );
      
      // Calculate award support string
      const awardSupport = nomination.awards
        .filter(award => award.won)
        .map(award => award.awardVenue)
        .join(', ');
      
      // Add formatted nominee to the category list
      nominationsByCategory[nomination.category].push({
        id: nomination.id,
        nomineeName: nomination.nomineeName,
        filmTitle: nomination.filmTitle,
        wonOscar: nomination.wonOscar,
        likelihood: likelihood?.value || undefined,
        bettingOdds: bettingOdds?.source || undefined,
        marketProbability: marketProbability?.value || undefined,
        awardSupport: awardSupport || undefined
      });
    });
    
    return NextResponse.json(nominationsByCategory);
  } catch (error) {
    console.error('Error fetching nominees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nominees data' },
      { status: 500 }
    );
  }
}