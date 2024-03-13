import { Prisma } from "@prisma/client";

export const selectIngredient = Prisma.validator<Prisma.IngredientsSelect>()({
    id: true,
    name: true,
    description: true,
    quantity: true,
    unit: true,      
})