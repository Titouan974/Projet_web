// routes/publishers.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Liste des éditeurs
router.get("/", async (req, res) => {
  const publishers = await prisma.publisher.findMany({ orderBy: { name: "asc" } });
  res.render("publishers/index", { publishers });
});

// Formulaire création éditeur
router.get("/new", (req, res) => {
  res.render("publishers/new");
});

// Création éditeur (POST)
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    await prisma.publisher.create({ data: { name } });
    res.redirect("/publishers");
  } catch (err) {
    console.error(err);
    res.status(400).send("Erreur lors de la création de l'éditeur");
  }
});

// Détail éditeur + jeux
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const publisher = await prisma.publisher.findUnique({
    where: { id },
    include: { games: { include: { genre: true }, orderBy: { title: "asc" } } }
  });
  if (!publisher) return res.status(404).send("Éditeur introuvable");
  res.render("publishers/show", { publisher });
});

// Formulaire édition
router.get("/:id/edit", async (req, res) => {
  const id = parseInt(req.params.id);
  const publisher = await prisma.publisher.findUnique({ where: { id } });
  if (!publisher) return res.status(404).send("Éditeur introuvable");
  res.render("publishers/edit", { publisher });
});

// Mise à jour (POST)
router.post("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  try {
    await prisma.publisher.update({ where: { id }, data: { name } });
    res.redirect(`/publishers/${id}`);
  } catch (err) {
    console.error(err);
    res.status(400).send("Erreur lors de la mise à jour");
  }
});

// Suppression (POST)
router.post("/:id/delete", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.publisher.delete({ where: { id } });
    res.redirect("/publishers");
  } catch (err) {
    console.error(err);
    res.status(400).send("Erreur lors de la suppression");
  }
});

module.exports = router;
