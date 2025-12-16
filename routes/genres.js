// routes/genres.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Liste des genres
router.get("/", async (req, res) => {
  const genres = await prisma.genre.findMany({ orderBy: { name: "asc" } });
  res.render("genres/index", { genres });
});

// Liste des jeux d'un genre
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const genre = await prisma.genre.findUnique({
    where: { id },
    include: { games: { include: { publisher: true }, orderBy: { title: "asc" } } }
  });
  if (!genre) return res.status(404).send("Genre introuvable");
  res.render("genres/show", { genre });
});

module.exports = router;
