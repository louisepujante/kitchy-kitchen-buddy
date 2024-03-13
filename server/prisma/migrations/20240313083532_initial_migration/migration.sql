-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Novice', 'Beginner', 'Intermediate', 'Experienced');

-- CreateEnum
CREATE TYPE "QuantityUnit" AS ENUM ('Gram', 'Milligram', 'Kilogram', 'Pound', 'Tablespoon', 'Teaspoon', 'Cup', 'Pinch', 'Piece', 'Ounce');

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "difficulty" "Difficulty" NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" "QuantityUnit" NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Steps" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "duration" DOUBLE PRECISION,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "Steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Steps" ADD CONSTRAINT "Steps_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
