
# Vapeur

Vapeur est une application web simple pour gérer une collection de jeux vidéo (Express + Handlebars + Prisma + SQLite).

## Fonctionnalités
- Liste des jeux mis en avant (page d'accueil)
- Liste de tous les jeux
- Création / modification / suppression d'un jeu
- Gestion des genres (liste, jeux par genre)
- Gestion des éditeurs (création, liste, modification, suppression, jeux par éditeur)
- Toutes les listes sont triées par ordre alphabétique
- Navigation principale et vues Handlebars

## Prérequis
- Node.js (>= 18 recommandé)
- npm

## Installation (sur la machine du correcteur)
```bash
git clone <url-du-repo>
cd vapeur
npm install
# Générer le client Prisma (optionnel mais recommandé)
npx prisma generate
# Appliquer les migrations (le correcteur exécutera cette commande)
npx prisma migrate deploy
# Lancer l'application
npm run start









