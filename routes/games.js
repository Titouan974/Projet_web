// routes/games.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Page d'accueil : jeux mis en avant (tri alphabétique)
router.get("/", async (req, res) => {
  const featured = await prisma.game.findMany({
    where: { featured: true },
    include: { genre: true, publisher: true },
    orderBy: { title: "asc" }
  });
  res.render("index", { featured });
});

// Liste de tous les jeux
router.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: { genre: true, publisher: true },
    orderBy: { title: "asc" }
  });
  res.render("games/index", { games });
});

// Formulaire création
router.get("/games/new", async (req, res) => {
  const genres = await prisma.genre.findMany({ orderBy: { name: "asc" } });
  const publishers = await prisma.publisher.findMany({ orderBy: { name: "asc" } });
  res.render("games/new", { genres, publishers });
});

// Création (POST)
router.post("/games", async (req, res) => {
  const { title, description, releaseDate, genreId, publisherId, featured } = req.body;
  try {
    await prisma.game.create({
      data: {
        title,
        description,
        releaseDate: new Date(releaseDate),
        genreId: parseInt(genreId),
        publisherId: parseInt(publisherId),
        featured: featured === "on"
      }
    });
    res.redirect("/games");
  } catch (err) {
    console.error(err);
    res.status(400).send("Erreur lors de la création du jeu");
  }
});

// Détail d'un jeu
router.get("/games/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const game = await prisma.game.findUnique({
    where: { id },
    include: { genre: true, publisher: true }
  });
  if (!game) return res.status(404).send("Jeu introuvable");
  res.render("games/details", { game });
});

// Formulaire édition
router.get("/games/:id/edit", async (req, res) => {
  const id = parseInt(req.params.id);
  const game = await prisma.game.findUnique({ where: { id } });
  if (!game) return res.status(404).send("Jeu introuvable");
  const genres = await prisma.genre.findMany({ orderBy: { name: "asc" } });
  const publishers = await prisma.publisher.findMany({ orderBy: { name: "asc" } });
  res.render("games/edit", { game, genres, publishers });
});

// Mise à jour (POST)
router.post("/games/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, releaseDate, genreId, publisherId, featured } = req.body;
  try {
    await prisma.game.update({
      where: { id },
      data: {
        title,
        description,
        releaseDate: new Date(releaseDate),
        genreId: parseInt(genreId),
        publisherId: parseInt(publisherId),
        featured: featured === "on"
      }
    });
    res.redirect(`/games/${id}`);
  } catch (err) {
    console.error(err);
    res.status(400).send("Erreur lors de la mise à jour");
  }
});

// Suppression (POST)
router.post("/games/:id/delete", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.game.delete({ where: { id } });
    res.redirect("/games");
  } catch (err) {
    console.error(err);
    res.status(400).send("Erreur lors de la suppression");
  }
});

module.exports = router;
