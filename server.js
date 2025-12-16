// server.js
// Point d'entrée de l'application Express
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const { ensureGenres, prisma } = require("./prisma/seed");

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration des vues et du moteur Handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Middleware pour servir les fichiers statiques (public/)
app.use(express.static(path.join(__dirname, "public")));

// Parser pour les formulaires (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Helpers HBS
hbs.registerHelper("formatDate", (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString();
});

hbs.registerHelper("ifCond", function (v1, v2, options) {
  return (v1 === v2) ? options.fn(this) : options.inverse(this);
});


// Routes
const gamesRouter = require("./routes/games");
const genresRouter = require("./routes/genres");
const publishersRouter = require("./routes/publishers");

app.use("/", gamesRouter);
app.use("/genres", genresRouter);
app.use("/publishers", publishersRouter);

// Avant d'écouter, s'assurer que les genres existent
async function start() {
  try {
    await ensureGenres(); // crée les genres si nécessaire
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Erreur au démarrage :", err);
    process.exit(1);
  }
}

start();

// Gestion propre de la fermeture
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
