// prisma/seed.js
// Script de seed minimal pour créer les genres si ils n'existent pas.
// Ce script est appelé depuis server.js au démarrage.

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GENRES = ["Action", "Aventure", "RPG", "Simulation", "Sport", "MMORPG"];

async function ensureGenres() {
  for (const name of GENRES) {
    const existing = await prisma.genre.findUnique({ where: { name } });
    if (!existing) {
      await prisma.genre.create({ data: { name } });
      console.log(`Genre créé: ${name}`);
    }
  }
}

module.exports = { ensureGenres, prisma };
