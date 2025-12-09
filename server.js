const express = require('express');
const { seedGenres } = require('./prisma/seed');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World !');
});

// Démarrage du serveur avec initialisation des genres
async function demarrerServeur() {
  await seedGenres();
  
  app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
  });
}

demarrerServeur();
