const express = require('express');
const hbs = require("hbs");
const path = require("path");

const app = express();
const PORT = 3000;





// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)





app.get('/', (req, res) => {
  res.send('Hello World !');
});

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:{PORT}');
});
