-- CreateTable
CREATE TABLE "IngredientBag" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "ingredient" TEXT NOT NULL,

    CONSTRAINT "IngredientBag_pkey" PRIMARY KEY ("id")
);
