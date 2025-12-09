const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedGenres() {
  console.log('Début du seeding...');

  // Création des genres de jeux
  const genres = ['Action', 'Aventure', 'RPG', 'Simulation', 'Sport', 'MMORPG'];
  
  for (const nomGenre of genres) {
    await prisma.genreDeJeu.upsert({
      where: { nom: nomGenre },
      update: {},
      create: { nom: nomGenre },
    });
    console.log(`Genre créé/vérifié: ${nomGenre}`);
  }

  console.log('Seeding terminé avec succès !');
}

// Si le fichier est exécuté directement (pas importé)
if (require.main === module) {
  seedGenres()
    .catch((e) => {
      console.error('Erreur lors du seeding:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { seedGenres };
