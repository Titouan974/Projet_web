-- Migration: init
CREATE TABLE "Genre" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "Publisher" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "Game" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "releaseDate" DATETIME NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT 0,
    "genreId" INTEGER NOT NULL,
    "publisherId" INTEGER NOT NULL,
    FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE,
    FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE CASCADE
);

CREATE INDEX "Game_title_idx" ON "Game"("title");
