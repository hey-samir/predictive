const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Load the real data 2025 content as a string
const realDataPath = path.join(__dirname, '../src/lib/real-data-2025.ts');
const realDataContent = fs.readFileSync(realDataPath, 'utf-8');

// Extract the nominees array from the file content
function extractNomineesArray() {
  const nomineesMatch = realDataContent.match(/export const REAL_NOMINEES_2025: Nomination\[\] = \[([\s\S]*?)\];/);
  if (!nomineesMatch) {
    throw new Error('Could not extract nominees data from real-data-2025.ts');
  }
  
  const nomineesContent = nomineesMatch[1];
  let nominees = [];
  
  // Regular expression to match each nominee object
  const nomineeRegex = /{\s*id:\s*(\d+),\s*year:\s*(\d+),\s*category:\s*"([^"]+)",\s*nominationType:\s*"([^"]+)",\s*nomineeName:\s*"([^"]+)",\s*filmTitle(?::\s*"([^"]+)")?,\s*wonOscar:\s*(true|false),\s*createdAt:\s*new Date\(\)\.toISOString\(\)\s*}/g;
  
  let match;
  while ((match = nomineeRegex.exec(nomineesContent)) !== null) {
    nominees.push({
      id: parseInt(match[1]),
      year: parseInt(match[2]),
      category: match[3],
      nominationType: match[4],
      nomineeName: match[5],
      filmTitle: match[6] || null,
      wonOscar: match[7] === 'true',
      createdAt: new Date().toISOString()
    });
  }
  
  return nominees;
}

// Extract the award wins array
function extractAwardWinsArray() {
  const winsMatch = realDataContent.match(/export const REAL_AWARD_WINS_2025: AwardWin\[\] = \[([\s\S]*?)\];/);
  if (!winsMatch) {
    throw new Error('Could not extract award wins data from real-data-2025.ts');
  }
  
  const winsContent = winsMatch[1];
  let wins = [];
  
  // Regular expression to match each award win object
  const winRegex = /{\s*id:\s*(\d+),\s*nominationId:\s*(\d+),\s*awardVenue:\s*"([^"]+)",\s*awardCategory(?::\s*"([^"]+)")?,\s*won:\s*(true|false)\s*}/g;
  
  let match;
  while ((match = winRegex.exec(winsContent)) !== null) {
    wins.push({
      id: parseInt(match[1]),
      nominationId: parseInt(match[2]),
      awardVenue: match[3],
      awardCategory: match[4] || null,
      won: match[5] === 'true'
    });
  }
  
  return wins;
}

// Extract betting odds references
function extractBettingOddsArray() {
  const oddsMatch = realDataContent.match(/export const REAL_BETTING_ODDS_2025: Reference\[\] = \[([\s\S]*?)\];/);
  if (!oddsMatch) {
    throw new Error('Could not extract betting odds data from real-data-2025.ts');
  }
  
  const oddsContent = oddsMatch[1];
  let odds = [];
  
  // Regular expression to match each betting odds object
  const oddsRegex = /{\s*id:\s*(\d+),\s*nominationId:\s*(\d+),\s*referenceType:\s*"([^"]+)",\s*value:\s*(\d+(?:\.\d+)?),\s*source(?::\s*"([^"]+)")?\s*}/g;
  
  let match;
  while ((match = oddsRegex.exec(oddsContent)) !== null) {
    odds.push({
      id: parseInt(match[1]),
      nominationId: parseInt(match[2]),
      referenceType: match[3],
      value: parseFloat(match[4]),
      source: match[5] || null
    });
  }
  
  return odds;
}

// Extract predictive markets references
function extractPredictiveMarketsArray() {
  const marketsMatch = realDataContent.match(/export const REAL_PREDICTIVE_MARKETS_2025: Reference\[\] = \[([\s\S]*?)\];/);
  if (!marketsMatch) {
    throw new Error('Could not extract predictive markets data from real-data-2025.ts');
  }
  
  const marketsContent = marketsMatch[1];
  let markets = [];
  
  // Regular expression to match each predictive market object
  const marketRegex = /{\s*id:\s*(\d+),\s*nominationId:\s*(\d+),\s*referenceType:\s*"([^"]+)",\s*value:\s*(\d+(?:\.\d+)?),\s*source(?::\s*"([^"]+)")?\s*}/g;
  
  let match;
  while ((match = marketRegex.exec(marketsContent)) !== null) {
    markets.push({
      id: parseInt(match[1]),
      nominationId: parseInt(match[2]),
      referenceType: match[3],
      value: parseFloat(match[4]),
      source: match[5] || null
    });
  }
  
  return markets;
}

// Extract model weights
function extractModelWeightsArray() {
  const weightsMatch = realDataContent.match(/export const REAL_MODEL_WEIGHTS_2025: ModelWeight\[\] = \[([\s\S]*?)\];/);
  if (!weightsMatch) {
    return []; // Model weights might not be present
  }
  
  const weightsContent = weightsMatch[1];
  let weights = [];
  
  // Regular expression to match each model weight object
  const weightRegex = /{\s*id:\s*(\d+),\s*year:\s*(\d+),\s*category:\s*"([^"]+)",\s*awardVenue:\s*"([^"]+)",\s*weight:\s*(\d+(?:\.\d+)?),\s*accuracy(?::\s*(\d+(?:\.\d+)?))?\s*}/g;
  
  let match;
  while ((match = weightRegex.exec(weightsContent)) !== null) {
    weights.push({
      id: parseInt(match[1]),
      year: parseInt(match[2]),
      category: match[3],
      awardVenue: match[4],
      weight: parseFloat(match[5]),
      accuracy: match[6] ? parseFloat(match[6]) : null
    });
  }
  
  return weights;
}

async function main() {
  console.log('Starting database seed...');

  try {
    // Extract data from the real-data-2025.ts file
    const nominees = extractNomineesArray();
    const awardWins = extractAwardWinsArray();
    const bettingOdds = extractBettingOddsArray();
    const predictiveMarkets = extractPredictiveMarketsArray();
    const modelWeights = extractModelWeightsArray();

    console.log(`Extracted ${nominees.length} nominees`);
    console.log(`Extracted ${awardWins.length} award wins`);
    console.log(`Extracted ${bettingOdds.length} betting odds`);
    console.log(`Extracted ${predictiveMarkets.length} predictive markets`);
    console.log(`Extracted ${modelWeights.length} model weights`);

    // Clean existing data
    console.log('Cleaning existing data...');
    await prisma.reference.deleteMany();
    await prisma.awardWin.deleteMany();
    await prisma.nomination.deleteMany();
    await prisma.modelWeight.deleteMany();

    // Add nominations
    console.log('Adding nominations...');
    for (const nominee of nominees) {
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
    for (const award of awardWins) {
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
    for (const bet of bettingOdds) {
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
    for (const market of predictiveMarkets) {
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
    if (modelWeights.length > 0) {
      console.log('Adding model weights...');
      for (const weight of modelWeights) {
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
    }

    console.log('Database seed complete!');
  } catch (error) {
    console.error('Error during database seed:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });