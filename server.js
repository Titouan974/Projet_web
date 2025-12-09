const express = require('express');
const { PrismaClient } = require("@prisma/client");
const { seedGenres } = require('./prisma/seed');
const hbs = require("hbs");
const path = require("path");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;





// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)





app.get('/', (req, res) => {
  res.send('Hello World !');
});




app.get("/games", async (req, res) => {
  const jeux = await prisma.jeu.findMany({
    include: { genre: true, editeur: true }
  });

  res.render("partials/game", {
    title: "Liste des Jeux",
    jeux
  });
});


// Démarrage du serveur avec initialisation des genres
async function demarrerServeur() {
  await seedGenres();
  
  app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:{PORT}');
  });
}

demarrerServeur();

