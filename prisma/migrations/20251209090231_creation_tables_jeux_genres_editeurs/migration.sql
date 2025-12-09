-- CreateTable
CREATE TABLE "Jeu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "dateSortie" DATETIME NOT NULL,
    "genreId" INTEGER NOT NULL,
    "editeurId" INTEGER NOT NULL,
    "misEnAvant" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Jeu_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "GenreDeJeu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jeu_editeurId_fkey" FOREIGN KEY ("editeurId") REFERENCES "EditeurDeJeu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GenreDeJeu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EditeurDeJeu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GenreDeJeu_nom_key" ON "GenreDeJeu"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "EditeurDeJeu_nom_key" ON "EditeurDeJeu"("nom");
