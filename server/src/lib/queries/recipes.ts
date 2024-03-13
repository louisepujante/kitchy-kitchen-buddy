import { Prisma } from "@prisma/client";
import { selectIngredient } from "./ingredients";
import { selectSteps } from "./steps";

export const selectRecipe = Prisma.validator<Prisma.RecipeSelect>()({
    id: true,
    title: true,
    description: true,
    image: true,
    duration: true,
    difficulty: true,
    ingredients: {
        select: selectIngredient
    },
    steps: {
        select: selectSteps,
        orderBy: {
            order: Prisma.SortOrder.asc
        }
    }
})