const { PrismaClient } = require('@prisma/client');
const { REAL_NOMINEES_2025, REAL_AWARD_WINS_2025, REAL_BETTING_ODDS_2025, REAL_PREDICTIVE_MARKETS_2025, REAL_MODEL_WEIGHTS_2025 } = require('../src/lib/real-data-2025.ts');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clean existing data (optional, be careful with this in production)
  console.log('Cleaning existing data...');
  await prisma.reference.deleteMany();
  await prisma.awardWin.deleteMany();
  await prisma.nomination.deleteMany();
  await prisma.modelWeight.deleteMany();

  console.log('Adding nominations...');
  // Add nominations
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

  console.log('Adding award wins...');
  // Add award wins
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

  console.log('Adding betting odds...');
  // Add betting odds references
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

  console.log('Adding predictive markets...');
  // Add predictive markets references
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

  console.log('Adding model weights...');
  // Add model weights
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });